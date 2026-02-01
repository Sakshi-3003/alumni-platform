import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Briefcase, GraduationCap, Users, Filter } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Alumni {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  graduationYear: number;
  department: string;
  degree: string;
  currentRole?: string;
  currentCompany?: string;
  industry?: string;
  location?: string;
  skills: string[];
  isAvailableForMentorship: boolean;
}

export default function AlumniDirectory() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    industry: '',
    isAvailableForMentorship: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAlumni();
  }, [filters]);

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.department) params.append('department', filters.department);
      if (filters.industry) params.append('industry', filters.industry);
      if (filters.isAvailableForMentorship)
        params.append('isAvailableForMentorship', filters.isAvailableForMentorship);

      const response = await axios.get(`${API_URL}/alumni?${params.toString()}`);
      setAlumni(response.data.data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      department: '',
      industry: '',
      isAvailableForMentorship: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Directory</h1>
        <p className="text-gray-600">Connect with verified alumni from your institution</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="search"
              placeholder="Search by name..."
              className="input pl-10"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select name="department" className="input" value={filters.department} onChange={handleFilterChange}>
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select name="industry" className="input" value={filters.industry} onChange={handleFilterChange}>
                <option value="">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Consulting">Consulting</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mentorship</label>
              <select
                name="isAvailableForMentorship"
                className="input"
                value={filters.isAvailableForMentorship}
                onChange={handleFilterChange}
              >
                <option value="">All Alumni</option>
                <option value="true">Available for Mentorship</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alumni Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading alumni...</p>
        </div>
      ) : alumni.length === 0 ? (
        <div className="card text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {alumni.length} alumni
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map((alum) => (
              <div key={alum._id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-600">
                        {alum.user.firstName[0]}
                        {alum.user.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {alum.user.firstName} {alum.user.lastName}
                      </h3>
                      {alum.isAvailableForMentorship && (
                        <span className="inline-block px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                          Available for Mentorship
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {alum.currentRole && alum.currentCompany && (
                  <div className="flex items-start gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      {alum.currentRole} at {alum.currentCompany}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    {alum.degree} in {alum.department} • {alum.graduationYear}
                  </span>
                </div>

                {alum.location && (
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{alum.location}</span>
                  </div>
                )}

                {alum.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {alum.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {alum.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{alum.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <button className="w-full btn-primary text-sm">View Profile</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
