import { Users, UserCheck, DollarSign, ClipboardList, TrendingUp, CheckCircle, Clock, XCircle, Bell, Activity } from 'lucide-react';
import { volunteers, members, donations, generalRequests, joiningLetterRequests, tasks, monthlyDonations } from '../../data/mockData';
import { Card, StatCard } from '../shared/UIComponents';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

interface Props { isSuperAdmin: boolean; }

const formatAmount = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function AdminOverviewTab({ isSuperAdmin }: Props) {
  const totalDonations = donations.reduce((s, d) => s + d.amount, 0);
  const pendingRequests = generalRequests.filter(r => r.status === 'pending').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'submitted').length;
  const activeVolunteers = volunteers.filter(v => v.status === 'active').length;
  const activeMembers = members.filter(m => m.status === 'active').length;

  const taskStatusData = [
    { name: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: '#f59e0b' },
    { name: 'Submitted', value: tasks.filter(t => t.status === 'submitted').length, color: '#3b82f6' },
    { name: 'Approved', value: tasks.filter(t => t.status === 'approved').length, color: '#10b981' },
    { name: 'Rejected', value: tasks.filter(t => t.status === 'rejected').length, color: '#ef4444' },
  ];

  const recentActivity = [
    { text: 'Rahul Sharma submitted Food Drive task', time: '2h ago', type: 'task', color: 'text-blue-500' },
    { text: 'Neha Joshi applied for new membership', time: '3h ago', type: 'member', color: 'text-emerald-500' },
    { text: 'TechCorp donation of ₹5,00,000 received', time: '5h ago', type: 'donation', color: 'text-purple-500' },
    { text: 'Priya Patel requested joining letter', time: '1d ago', type: 'request', color: 'text-amber-500' },
    { text: 'Medical MOU request by Dr. Anjali Mehta', time: '1d ago', type: 'mou', color: 'text-rose-500' },
    { text: 'Health Camp task approved', time: '2d ago', type: 'task', color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 rounded-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-blue-200" />
            <span className="text-blue-200 text-sm">{isSuperAdmin ? 'Super Admin' : 'Admin'} Dashboard</span>
          </div>
          <h1 className="text-white mb-1">HopeConnect NGO</h1>
          <p className="text-blue-100 text-sm">Overview of all activities, people and finances.</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <div className="px-3 py-1.5 bg-white/20 rounded-lg text-sm text-white backdrop-blur-sm">
              {activeVolunteers} Active Volunteers
            </div>
            <div className="px-3 py-1.5 bg-white/20 rounded-lg text-sm text-white backdrop-blur-sm">
              {activeMembers} Active Members
            </div>
            {pendingRequests > 0 && (
              <div className="px-3 py-1.5 bg-amber-400/30 border border-amber-300/50 rounded-lg text-sm text-white backdrop-blur-sm flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" /> {pendingRequests} Pending Requests
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Volunteers"
          value={activeVolunteers}
          subtitle={`${volunteers.length} total registered`}
          icon={<UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          color="bg-blue-100 dark:bg-blue-900/20"
          trend="12%"
          trendUp
        />
        <StatCard
          title="Active Members"
          value={activeMembers}
          subtitle={`${members.filter(m => m.membershipType === '80G').length} with 80G`}
          icon={<Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          color="bg-emerald-100 dark:bg-emerald-900/20"
          trend="8%"
          trendUp
        />
        <StatCard
          title="Total Donations"
          value={formatAmount(totalDonations)}
          subtitle={`${donations.filter(d => !d.receiptGenerated).length} receipts pending`}
          icon={<DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          color="bg-purple-100 dark:bg-purple-900/20"
          trend="23%"
          trendUp
        />
        <StatCard
          title="Pending Requests"
          value={pendingRequests + joiningLetterRequests.filter(r => r.status === 'pending').length}
          subtitle={`${pendingTasks} tasks need review`}
          icon={<ClipboardList className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          color="bg-amber-100 dark:bg-amber-900/20"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Donation Chart */}
        <Card className="p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-slate-800 dark:text-slate-200 text-sm font-semibold">Donation Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Last 6 months</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" /> +23% vs last period
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyDonations} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Amount']}
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', fontSize: '12px' }}
              />
              <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Task Status Donut */}
        <Card className="p-4">
          <h3 className="text-slate-800 dark:text-slate-200 text-sm font-semibold mb-1">Task Status</h3>
          <p className="text-xs text-slate-400 mb-3">{tasks.length} total tasks</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={taskStatusData} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value">
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {taskStatusData.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-slate-600 dark:text-slate-400">{s.name}</span>
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <Card className="p-4">
          <h3 className="text-slate-800 dark:text-slate-200 text-sm font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.color.replace('text', 'bg')}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{item.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-4">
          <h3 className="text-slate-800 dark:text-slate-200 text-sm font-semibold mb-4">Quick Overview</h3>
          <div className="space-y-3">
            {[
              { label: 'Tasks Approved This Month', value: tasks.filter(t => t.status === 'approved').length, icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
              { label: 'Tasks Pending Review', value: tasks.filter(t => t.status === 'submitted').length, icon: <Clock className="w-4 h-4 text-amber-500" /> },
              { label: 'Tasks Rejected', value: tasks.filter(t => t.status === 'rejected').length, icon: <XCircle className="w-4 h-4 text-red-500" /> },
              { label: 'Receipts Pending Generation', value: donations.filter(d => !d.receiptGenerated).length, icon: <DollarSign className="w-4 h-4 text-blue-500" /> },
              { label: 'Joining Letter Requests', value: joiningLetterRequests.filter(r => r.status === 'pending').length, icon: <ClipboardList className="w-4 h-4 text-purple-500" /> },
              { label: 'Members with Due Payments', value: members.filter(m => !m.isPaid).length, icon: <Users className="w-4 h-4 text-rose-500" /> },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
