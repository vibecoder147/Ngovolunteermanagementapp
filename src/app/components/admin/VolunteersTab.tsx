import { useState } from 'react';
import { Plus, Search, Eye, ImageIcon, CheckCircle, XCircle, Mail, Phone, MapPin, Calendar, User } from 'lucide-react';
import { volunteers as initialVolunteers, tasks as initialTasks, Volunteer, Task } from '../../data/mockData';
import { Modal, Badge, Avatar, PrimaryButton, SecondaryButton, Card, SectionHeader, EmptyState, FormField, Input, Select } from '../shared/UIComponents';

interface Props { isSuperAdmin: boolean; }

export default function VolunteersTab({ isSuperAdmin }: Props) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [taskList, setTaskList] = useState<Task[]>(initialTasks.filter(t => t.assignedToType === 'volunteer'));
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Volunteer | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Add Volunteer Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', skills: '', assignedAdmin: 'Priya Sharma' });

  // Add Task Form State
  const [taskForm, setTaskForm] = useState({ title: '', description: '', deadline: '', requiresUpload: false });

  const filtered = volunteers.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getVolunteerTasks = (v: Volunteer) => taskList.filter(t => t.assignedToId === v.id);

  const handleApprove = (taskId: number) => {
    setTaskList(prev => prev.map(t => t.id === taskId ? { ...t, status: 'approved' } : t));
    setSelectedTask(prev => prev ? { ...prev, status: 'approved' } : null);
  };

  const handleReject = (taskId: number) => {
    setTaskList(prev => prev.map(t => t.id === taskId ? { ...t, status: 'rejected' } : t));
    setSelectedTask(prev => prev ? { ...prev, status: 'rejected' } : null);
  };

  const handleAddVolunteer = () => {
    if (!form.name || !form.email) return;
    const newV: Volunteer = {
      id: Date.now(), name: form.name, email: form.email, phone: form.phone,
      address: form.address, joinDate: new Date().toISOString().split('T')[0],
      status: 'active', assignedAdmin: form.assignedAdmin,
      tasks: [], tenure: 'Pending', skills: form.skills.split(',').map(s => s.trim()),
      avatar: form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    setVolunteers(prev => [...prev, newV]);
    setForm({ name: '', email: '', phone: '', address: '', skills: '', assignedAdmin: 'Priya Sharma' });
    setShowAdd(false);
  };

  const handleAddTask = () => {
    if (!selected || !taskForm.title) return;
    const newT: Task = {
      id: Date.now(), title: taskForm.title, description: taskForm.description,
      deadline: taskForm.deadline, assignedToId: selected.id, assignedToName: selected.name,
      assignedToType: 'volunteer', status: 'pending', requiresUpload: taskForm.requiresUpload,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTaskList(prev => [...prev, newT]);
    setVolunteers(prev => prev.map(v => v.id === selected.id ? { ...v, tasks: [...v.tasks, newT.id] } : v));
    setTaskForm({ title: '', description: '', deadline: '', requiresUpload: false });
    setShowAddTask(false);
  };

  return (
    <div>
      <SectionHeader
        title="Volunteers"
        subtitle={`${volunteers.filter(v => v.status === 'active').length} active of ${volunteers.length} total`}
        actions={
          <PrimaryButton onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4" /> Add Volunteer
          </PrimaryButton>
        }
      />

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
        <select
          value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Volunteer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v => {
          const vtasks = getVolunteerTasks(v);
          const pendingCount = vtasks.filter(t => t.status === 'pending').length;
          return (
            <Card key={v.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <Avatar initials={v.avatar} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 dark:text-white text-sm truncate">{v.name}</span>
                    <Badge status={v.status} />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{v.email}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{v.assignedAdmin}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 border-t border-slate-100 dark:border-slate-700 pt-2.5">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{v.joinDate}</span>
                <span>{vtasks.length} tasks {pendingCount > 0 && <span className="text-amber-500">({pendingCount} pending)</span>}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(v)}
                  className="flex-1 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3 h-3" /> View Profile
                </button>
                <button
                  onClick={() => { setSelected(v); setShowAddTask(true); }}
                  className="flex-1 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Task
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && <EmptyState icon={<User className="w-6 h-6" />} title="No volunteers found" subtitle="Try adjusting your search filters" />}

      {/* Volunteer Profile Modal */}
      {selected && !showAddTask && (
        <Modal title="Volunteer Profile" onClose={() => setSelected(null)} size="lg">
          <div className="flex items-start gap-4 mb-5 pb-4 border-b border-slate-200 dark:border-slate-700">
            <Avatar initials={selected.avatar} size="lg" />
            <div>
              <h3 className="text-slate-900 dark:text-white">{selected.name}</h3>
              <Badge status={selected.status} />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Assigned to: {selected.assignedAdmin}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { icon: <Mail className="w-4 h-4" />, text: selected.email },
              { icon: <Phone className="w-4 h-4" />, text: selected.phone },
              { icon: <MapPin className="w-4 h-4" />, text: selected.address },
              { icon: <Calendar className="w-4 h-4" />, text: `Tenure: ${selected.tenure}` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                <span className="text-slate-400 dark:text-slate-500 shrink-0">{item.icon}</span>
                <span className="truncate text-xs">{item.text}</span>
              </div>
            ))}
          </div>

          {selected.skills.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map(s => (
                  <span key={s} className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Assigned Tasks</p>
              <button
                onClick={() => setShowAddTask(true)}
                className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" /> Add Task
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {getVolunteerTasks(selected).length === 0 ? (
                <p className="text-sm text-slate-400 py-3 text-center">No tasks assigned</p>
              ) : (
                getVolunteerTasks(selected).map(task => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                  >
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
            <div>
              <h3 className="text-slate-900 dark:text-white mb-1">{selectedTask.title}</h3>
              <Badge status={selectedTask.status} />
            </div>
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
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  {selectedTask.uploadedImage ? 'Photo uploaded by volunteer' : 'Photo upload required'}
                </span>
                {selectedTask.uploadedImage && (
                  <button
                    onClick={() => setShowImage(true)}
                    className="ml-auto text-xs bg-blue-600 text-white px-2.5 py-1 rounded-md hover:bg-blue-700"
                  >
                    View Photo
                  </button>
                )}
              </div>
            )}

            {selectedTask.submittedAt && (
              <p className="text-xs text-slate-400">Submitted on: {selectedTask.submittedAt}</p>
            )}

            {selectedTask.status === 'submitted' && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleApprove(selectedTask.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => handleReject(selectedTask.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Image View Modal */}
      {showImage && (
        <Modal title="Uploaded Photo" onClose={() => setShowImage(false)}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-600 rounded-xl flex flex-col items-center justify-center gap-3">
              <ImageIcon className="w-12 h-12 text-blue-400 dark:text-blue-500" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Volunteer Photo Upload</p>
              <p className="text-xs text-slate-400">IMG_2025_03_10.jpg</p>
            </div>
            <p className="text-xs text-slate-400">Submitted on {selectedTask?.submittedAt}</p>
          </div>
        </Modal>
      )}

      {/* Add Volunteer Modal */}
      {showAdd && (
        <Modal title="Add New Volunteer" onClose={() => setShowAdd(false)}>
          <div className="space-y-3">
            <FormField label="Full Name *">
              <Input value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="Enter full name" />
            </FormField>
            <FormField label="Email *">
              <Input value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} placeholder="email@example.com" type="email" />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Phone">
                <Input value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} placeholder="10-digit number" />
              </FormField>
              <FormField label="Assigned Admin">
                <Select value={form.assignedAdmin} onChange={v => setForm(p => ({ ...p, assignedAdmin: v }))} options={[
                  { label: 'Priya Sharma', value: 'Priya Sharma' },
                  { label: 'Arjun Kapoor', value: 'Arjun Kapoor' },
                ]} />
              </FormField>
            </div>
            <FormField label="Address">
              <Input value={form.address} onChange={v => setForm(p => ({ ...p, address: v }))} placeholder="City, State" />
            </FormField>
            <FormField label="Skills (comma separated)">
              <Input value={form.skills} onChange={v => setForm(p => ({ ...p, skills: v }))} placeholder="e.g. Teaching, Healthcare" />
            </FormField>
            <div className="flex gap-2 pt-2">
              <PrimaryButton onClick={handleAddVolunteer} className="flex-1 justify-center">Add Volunteer</PrimaryButton>
              <SecondaryButton onClick={() => setShowAdd(false)} className="flex-1 justify-center">Cancel</SecondaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Task Modal */}
      {showAddTask && selected && (
        <Modal title={`Add Task for ${selected.name}`} onClose={() => { setShowAddTask(false); setSelected(null); }}>
          <div className="space-y-3">
            <FormField label="Task Title *">
              <Input value={taskForm.title} onChange={v => setTaskForm(p => ({ ...p, title: v }))} placeholder="Enter task title" />
            </FormField>
            <FormField label="Description">
              <textarea
                value={taskForm.description}
                onChange={e => setTaskForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Task details and instructions..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </FormField>
            <FormField label="Deadline">
              <Input value={taskForm.deadline} onChange={v => setTaskForm(p => ({ ...p, deadline: v }))} type="date" />
            </FormField>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={taskForm.requiresUpload}
                onChange={e => setTaskForm(p => ({ ...p, requiresUpload: e.target.checked }))}
                className="w-4 h-4 rounded accent-blue-600"
              />
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
