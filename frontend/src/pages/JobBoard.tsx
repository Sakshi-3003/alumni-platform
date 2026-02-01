import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Briefcase, MapPin, DollarSign, Clock, Plus, X, Building2, Filter } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  workMode: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedBy: {
    firstName: string;
    lastName: string;
  };
  applicants: string[];
  createdAt: string;
}

export default function JobBoard() {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    jobType: '',
    workMode: '',
    location: '',
  });
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'full-time',
    workMode: 'onsite',
    description: '',
    requirements: [''],
    skills: [''],
    salaryMin: '',
    salaryMax: '',
    applicationUrl: '',
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.workMode) params.append('workMode', filters.workMode);
      if (filters.location) params.append('location', filters.location);

      const response = await axios.get(`${API_URL}/jobs?${params.toString()}`);
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.filter((r) => r.trim() !== ''),
        skills: formData.skills.filter((s) => s.trim() !== ''),
        salary: formData.salaryMin
          ? {
              min: Number(formData.salaryMin),
              max: Number(formData.salaryMax),
              currency: 'USD',
            }
          : undefined,
      };

      await axios.post(`${API_URL}/jobs`, jobData);
      setShowCreateModal(false);
      fetchJobs();
      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        jobType: 'full-time',
        workMode: 'onsite',
        description: '',
        requirements: [''],
        skills: [''],
        salaryMin: '',
        salaryMax: '',
        applicationUrl: '',
      });
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create job');
    }
  };

  const handleApply = async (jobId: string) => {
    try {
      await axios.post(`${API_URL}/jobs/${jobId}/apply`);
      alert('Application submitted successfully!');
      fetchJobs();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to apply');
    }
  };

  const addArrayField = (field: 'requirements' | 'skills') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const removeArrayField = (field: 'requirements' | 'skills', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const updateArrayField = (field: 'requirements' | 'skills', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Board</h1>
          <p className="text-gray-600">Discover opportunities shared by alumni</p>
        </div>
        {(user?.role === 'alumni' || user?.role === 'admin') && (
          <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post Job
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-600" />
          <h3 className="font-medium text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="input"
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>

          <select
            className="input"
            value={filters.workMode}
            onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}
          >
            <option value="">All Work Modes</option>
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <input
            type="text"
            placeholder="Location..."
            className="input"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="card text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Check back later for new opportunities</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.jobType} • {job.workMode}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>

                  {job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-sm text-gray-500">
                    Posted by {job.postedBy.firstName} {job.postedBy.lastName} •{' '}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="ml-4">
                  {job.applicants.includes(user?.id || '') ? (
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                      Applied
                    </span>
                  ) : (
                    <button onClick={() => handleApply(job._id)} className="btn-primary text-sm whitespace-nowrap">
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Post a Job</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
                  <select
                    className="input"
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode*</label>
                  <select
                    className="input"
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  >
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  required
                  rows={4}
                  className="input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application URL</label>
                <input
                  type="url"
                  className="input"
                  value={formData.applicationUrl}
                  onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="input flex-1"
                      value={skill}
                      onChange={(e) => updateArrayField('skills', index, e.target.value)}
                    />
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('skills', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayField('skills')} className="text-sm text-primary-600">
                  + Add Skill
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="input flex-1"
                      value={req}
                      onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('requirements', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('requirements')}
                  className="text-sm text-primary-600"
                >
                  + Add Requirement
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Post Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
