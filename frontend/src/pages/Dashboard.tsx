import { useAuthStore } from '../store/authStore';
import { Users, Briefcase, UserPlus, MessageSquare, TrendingUp, Award } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Active Alumni', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { name: 'Job Postings', value: '89', icon: Briefcase, color: 'bg-green-500' },
    { name: 'Mentorships', value: '156', icon: UserPlus, color: 'bg-purple-500' },
    { name: 'Referrals', value: '67', icon: MessageSquare, color: 'bg-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your alumni network today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {[
              { action: 'New job posted', detail: 'Software Engineer at Google', time: '2 hours ago' },
              { action: 'Mentorship request', detail: 'From John Doe', time: '5 hours ago' },
              { action: 'Interview experience shared', detail: 'Microsoft SDE Interview', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-primary-600" />
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Alumni Meetup 2024', date: 'March 15, 2024', location: 'Main Campus' },
              { title: 'Career Workshop', date: 'March 20, 2024', location: 'Online' },
              { title: 'Networking Session', date: 'April 5, 2024', location: 'Conference Hall' },
            ].map((event, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
