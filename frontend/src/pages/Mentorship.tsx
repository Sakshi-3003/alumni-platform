import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { UserPlus, X, Check, XCircle, Clock, Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Mentorship {
  _id: string;
  mentor: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  mentee: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  title: string;
  description: string;
  areas: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  duration?: string;
  notes?: string;
  createdAt: string;
}

interface Alumni {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  currentRole?: string;
  currentCompany?: string;
  isAvailableForMentorship: boolean;
}

export default function Mentorship() {
  const { user } = useAuthStore();
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [mentorshipsToMe, setMentorshipsToMe] = useState<Mentorship[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'my-requests' | 'received'>('my-requests');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    areas: [''],
    duration: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [myRequestsRes, toMeRes, alumniRes] = await Promise.all([
        axios.get(`${API_URL}/mentorship/my-requests`),
        axios.get(`${API_URL}/mentorship/requests-to-me`),
        axios.get(`${API_URL}/alumni?isAvailableForMentorship=true`),
      ]);

      setMentorships(myRequestsRes.data.data);
      setMentorshipsToMe(toMeRes.data.data);
      setAlumni(alumniRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestData = {
        mentor: selectedMentor,
        ...formData,
        areas: formData.areas.filter((a) => a.trim() !== ''),
      };

      await axios.post(`${API_URL}/mentorship`, requestData);
      setShowRequestModal(false);
      fetchData();
      setFormData({ title: '', description: '', areas: [''], duration: '' });
      setSelectedMentor('');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create mentorship request');
    }
  };

  const handleUpdateStatus = async (id: string, status: 'accepted' | 'rejected', notes?: string) => {
    try {
      await axios.put(`${API_URL}/mentorship/${id}`, { status, notes });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const addArea = () => {
    setFormData({ ...formData, areas: [...formData.areas, ''] });
  };

  const removeArea = (index: number) => {
    setFormData({
      ...formData,
      areas: formData.areas.filter((_, i) => i !== index),
    });
  };

  const updateArea = (index: number, value: string) => {
    const newAreas = [...formData.areas];
    newAreas[index] = value;
    setFormData({ ...formData, areas: newAreas });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return (
      <span className={`px-2 py-1 text-xs rounded ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentorship</h1>
          <p className="text-gray-600">Connect with alumni mentors for guidance</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Request Mentorship
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('my-requests')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'my-requests'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Requests
          </button>
          {user?.role === 'alumni' && (
            <button
              onClick={() => setActiveTab('received')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'received'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Received Requests
              {mentorshipsToMe.filter((m) => m.status === 'pending').length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {mentorshipsToMe.filter((m) => m.status === 'pending').length}
                </span>
              )}
            </button>
          )}
        </nav>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : activeTab === 'my-requests' ? (
        mentorships.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentorship requests yet</h3>
            <p className="text-gray-600 mb-4">Start by requesting mentorship from an alumnus</p>
            <button onClick={() => setShowRequestModal(true)} className="btn-primary">
              Request Mentorship
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {mentorships.map((mentorship) => (
              <div key={mentorship._id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{mentorship.title}</h3>
                    <p className="text-sm text-gray-600">
                      Mentor: {mentorship.mentor.firstName} {mentorship.mentor.lastName}
                    </p>
                  </div>
                  {getStatusBadge(mentorship.status)}
                </div>

                <p className="text-gray-700 mb-3">{mentorship.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {mentorship.areas.map((area, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded">
                      {area}
                    </span>
                  ))}
                </div>

                {mentorship.duration && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    Duration: {mentorship.duration}
                  </div>
                )}

                {mentorship.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-700 mb-1">Mentor's Response:</p>
                    <p className="text-sm text-gray-600">{mentorship.notes}</p>
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-3">
                  Requested on {new Date(mentorship.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        mentorshipsToMe.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentorship requests</h3>
            <p className="text-gray-600">You haven't received any mentorship requests yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mentorshipsToMe.map((mentorship) => (
              <div key={mentorship._id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{mentorship.title}</h3>
                    <p className="text-sm text-gray-600">
                      From: {mentorship.mentee.firstName} {mentorship.mentee.lastName}
                    </p>
                  </div>
                  {getStatusBadge(mentorship.status)}
                </div>

                <p className="text-gray-700 mb-3">{mentorship.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {mentorship.areas.map((area, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded">
                      {area}
                    </span>
                  ))}
                </div>

                {mentorship.duration && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <Clock className="w-4 h-4" />
                    Duration: {mentorship.duration}
                  </div>
                )}

                {mentorship.status === 'pending' && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        handleUpdateStatus(mentorship._id, 'accepted', 'I would be happy to mentor you!')
                      }
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(mentorship._id, 'rejected')}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Decline
                    </button>
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-3">
                  Requested on {new Date(mentorship.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Request Mentorship Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Request Mentorship</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Mentor*</label>
                <select
                  required
                  className="input"
                  value={selectedMentor}
                  onChange={(e) => setSelectedMentor(e.target.value)}
                >
                  <option value="">Choose an alumnus...</option>
                  {alumni.map((alum) => (
                    <option key={alum._id} value={alum.user._id}>
                      {alum.user.firstName} {alum.user.lastName}
                      {alum.currentRole && ` - ${alum.currentRole}`}
                      {alum.currentCompany && ` at ${alum.currentCompany}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title*</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Career Guidance in Machine Learning"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  required
                  rows={4}
                  className="input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain what you're looking for help with..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mentorship Areas*
                </label>
                {formData.areas.map((area, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      required
                      className="input flex-1"
                      value={area}
                      onChange={(e) => updateArea(index, e.target.value)}
                      placeholder="e.g., Career Planning, Technical Skills"
                    />
                    {formData.areas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArea(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addArea} className="text-sm text-primary-600">
                  + Add Area
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Duration</label>
                <input
                  type="text"
                  className="input"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months, 6 sessions"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
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
