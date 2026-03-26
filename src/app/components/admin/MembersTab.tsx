import { useState } from 'react';
import { Plus, Search, Eye, ImageIcon, CheckCircle, XCircle, Mail, Phone, MapPin, Calendar, Users, RefreshCw } from 'lucide-react';
import { members as initialMembers, tasks as initialTasks, Member, Task } from '../../data/mockData';
import { Modal, Badge, Avatar, PrimaryButton, SecondaryButton, Card, SectionHeader, EmptyState, FormField, Input, Select } from '../shared/UIComponents';

interface Props { isSuperAdmin: boolean; }

export default function MembersTab({ isSuperAdmin }: Props) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [taskList, setTaskList] = useState<Task[]>(initialTasks.filter(t => t.assignedToType === 'member'));
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Member | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', membershipType: '80G' as '80G' | 'non-80G', renewalDate: '' });
  const [taskForm, setTaskForm] = useState({ title: '', description: '', deadline: '', requiresUpload: false });

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getMemberTasks = (m: Member) => taskList.filter(t => t.assignedToId === m.id);

  const handleApprove = (taskId: number) => {
    setTaskList(prev => prev.map(t => t.id === taskId ? { ...t, status: 'approved' } : t));
    setSelectedTask(prev => prev ? { ...prev, status: 'approved' } : null);
  };

  const handleReject = (taskId: number) => {
    setTaskList(prev => prev.map(t => t.id === taskId ? { ...t, status: 'rejected' } : t));
    setSelectedTask(prev => prev ? { ...prev, status: 'rejected' } : null);
  };

  const handleAddMember = () => {
    if (!form.name || !form.email) return;
    const newM: Member = {
      id: Date.now(), name: form.name, email: form.email, phone: form.phone,
      address: form.address, joinDate: new Date().toISOString().split('T')[0],
      renewalDate: form.renewalDate || '', status: 'active',
      membershipType: form.membershipType, tasks: [], isPaid: false,
      avatar: form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    setMembers(prev => [...prev, newM]);
    setForm({ name: '', email: '', phone: '', address: '', membershipType: '80G', renewalDate: '' });
    setShowAdd(false);
  };

  const handleAddTask = () => {
    if (!selected || !taskForm.title) return;
    const newT: Task = {
      id: Date.now(), title: taskForm.title, description: taskForm.description,
      deadline: taskForm.deadline, assignedToId: selected.id, assignedToName: selected.name,
      assignedToType: 'member', status: 'pending', requiresUpload: taskForm.requiresUpload,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTaskList(prev => [...prev, newT]);
    setMembers(prev => prev.map(m => m.id === selected.id ? { ...m, tasks: [...m.tasks, newT.id] } : m));
    setTaskForm({ title: '', description: '', deadline: '', requiresUpload: false });
    setShowAddTask(false);
  };

  const renewalDaysLeft = (date: string) => {
    const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div>
      <SectionHeader
        title="Members"
        subtitle={`${members.filter(m => m.status === 'active').length} active of ${members.length} total`}
        actions={<PrimaryButton onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Member</PrimaryButton>}
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: '80G Members', value: members.filter(m => m.membershipType === '80G').length, color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400' },
          { label: 'Non-80G', value: members.filter(m => m.membershipType === 'non-80G').length, color: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' },
          { label: 'Dues Pending', value: members.filter(m => !m.isPaid).length, color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(m => {
          const mtasks = getMemberTasks(m);
          const daysLeft = m.renewalDate ? renewalDaysLeft(m.renewalDate) : null;
          return (
            <Card key={m.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <Avatar initials={m.avatar} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium text-slate-900 dark:text-white text-sm truncate">{m.name}</span>
                    <Badge status={m.status} />
                    <Badge status={m.membershipType} />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{m.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" />Renewal: {m.renewalDate || 'N/A'}</span>
                {daysLeft !== null && daysLeft < 30 && daysLeft >= 0 && (
                  <span className="text-amber-500 font-medium">{daysLeft}d left</span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs mb-3 pb-2 border-t border-slate-100 dark:border-slate-700 pt-2">
                <span className={`px-2 py-0.5 rounded-full ${m.isPaid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                  {m.isPaid ? 'Paid' : 'Due'}
                </span>
                <span className="text-slate-400">{mtasks.length} tasks</span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setSelected(m)}
                  className="flex-1 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" /> View Profile
                </button>
                <button onClick={() => { setSelected(m); setShowAddTask(true); }}
                  className="flex-1 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1">
                  <Plus className="w-3 h-3" /> Add Task
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && <EmptyState icon={<Users className="w-6 h-6" />} title="No members found" subtitle="Try adjusting your search filters" />}

      {/* Member Profile Modal */}
      {selected && !showAddTask && (
        <Modal title="Member Profile" onClose={() => setSelected(null)} size="lg">
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <Avatar initials={selected.avatar} size="lg" />
            <div>
              <h3 className="text-slate-900 dark:text-white">{selected.name}</h3>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                <Badge status={selected.status} />
                <Badge status={selected.membershipType} />
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${selected.isPaid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {selected.isPaid ? 'Paid' : 'Payment Due'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { icon: <Mail className="w-4 h-4" />, text: selected.email },
              { icon: <Phone className="w-4 h-4" />, text: selected.phone },
              { icon: <MapPin className="w-4 h-4" />, text: selected.address },
              { icon: <Calendar className="w-4 h-4" />, text: `Renewal: ${selected.renewalDate}` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                <span className="text-slate-400 shrink-0">{item.icon}</span>
                <span className="truncate text-xs">{item.text}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Assigned Tasks</p>
              <button onClick={() => setShowAddTask(true)} className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add Task
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {getMemberTasks(selected).length === 0 ? (
                <p className="text-sm text-slate-400 py-3 text-center">No tasks assigned</p>
              ) : (
                getMemberTasks(selected).map(task => (
                  <button key={task.id} onClick={() => setSelectedTask(task)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{task.title}</p>
                      <p className="text-xs text-slate-400">Due: {task.deadline}</p>
                    </div>
                    <Badge status={task.status} />
                  </button>
                ))
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <Modal title="Task Details" onClose={() => setSelectedTask(null)}>
          <div className="space-y-3">
            <div><h3 className="text-slate-900 dark:text-white mb-1">{selectedTask.title}</h3><Badge status={selectedTask.status} /></div>
            <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">{selectedTask.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                <p className="text-xs text-slate-400 mb-0.5">Deadline</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">{selectedTask.deadline}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                <p className="text-xs text-slate-400 mb-0.5">Assigned To</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">{selectedTask.assignedToName}</p>
              </div>
            </div>
            {selectedTask.requiresUpload && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-700 dark:text-blue-300">{selectedTask.uploadedImage ? 'Photo uploaded' : 'Photo required'}</span>
                {selectedTask.uploadedImage && (
                  <button onClick={() => setShowImage(true)} className="ml-auto text-xs bg-blue-600 text-white px-2.5 py-1 rounded-md hover:bg-blue-700">View Photo</button>
                )}
              </div>
            )}
            {selectedTask.status === 'submitted' && (
              <div className="flex gap-3 pt-2">
                <button onClick={() => handleApprove(selectedTask.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium">
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button onClick={() => handleReject(selectedTask.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Image Modal */}
      {showImage && (
        <Modal title="Uploaded Photo" onClose={() => setShowImage(false)}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full h-64 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-slate-700 dark:to-slate-600 rounded-xl flex flex-col items-center justify-center gap-3">
              <ImageIcon className="w-12 h-12 text-emerald-400" />
              <p className="text-sm text-slate-500">Member Task Photo</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Member Modal */}
      {showAdd && (
        <Modal title="Add New Member" onClose={() => setShowAdd(false)}>
          <div className="space-y-3">
            <FormField label="Full Name *"><Input value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="Enter full name" /></FormField>
            <FormField label="Email *"><Input value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} placeholder="email@example.com" type="email" /></FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Phone"><Input value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} placeholder="10-digit number" /></FormField>
              <FormField label="Membership Type">
                <Select value={form.membershipType} onChange={v => setForm(p => ({ ...p, membershipType: v as '80G' | 'non-80G' }))} options={[{ label: '80G', value: '80G' }, { label: 'Non-80G', value: 'non-80G' }]} />
              </FormField>
            </div>
            <FormField label="Address"><Input value={form.address} onChange={v => setForm(p => ({ ...p, address: v }))} placeholder="City, State" /></FormField>
            <FormField label="Renewal Date"><Input value={form.renewalDate} onChange={v => setForm(p => ({ ...p, renewalDate: v }))} type="date" /></FormField>
            <div className="flex gap-2 pt-2">
              <PrimaryButton onClick={handleAddMember} className="flex-1 justify-center">Add Member</PrimaryButton>
              <SecondaryButton onClick={() => setShowAdd(false)} className="flex-1 justify-center">Cancel</SecondaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Task Modal */}
      {showAddTask && selected && (
        <Modal title={`Add Task for ${selected.name}`} onClose={() => { setShowAddTask(false); setSelected(null); }}>
          <div className="space-y-3">
            <FormField label="Task Title *"><Input value={taskForm.title} onChange={v => setTaskForm(p => ({ ...p, title: v }))} placeholder="Enter task title" /></FormField>
            <FormField label="Description">
              <textarea value={taskForm.description} onChange={e => setTaskForm(p => ({ ...p, description: e.target.value }))} placeholder="Task details..." rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </FormField>
            <FormField label="Deadline"><Input value={taskForm.deadline} onChange={v => setTaskForm(p => ({ ...p, deadline: v }))} type="date" /></FormField>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={taskForm.requiresUpload} onChange={e => setTaskForm(p => ({ ...p, requiresUpload: e.target.checked }))} className="w-4 h-4 rounded accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Requires photo upload</span>
            </label>
            <div className="flex gap-2 pt-2">
              <PrimaryButton onClick={handleAddTask} className="flex-1 justify-center">Assign Task</PrimaryButton>
              <SecondaryButton onClick={() => { setShowAddTask(false); setSelected(null); }} className="flex-1 justify-center">Cancel</SecondaryButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
