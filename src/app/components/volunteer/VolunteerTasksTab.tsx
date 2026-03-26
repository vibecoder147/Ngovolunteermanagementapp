import { useState } from 'react';
import { CheckCircle, Clock, XCircle, Upload, ImageIcon, Calendar, AlertCircle } from 'lucide-react';
import { tasks as allTasks, Task } from '../../data/mockData';
import { Modal, Badge, Card, SectionHeader } from '../shared/UIComponents';

const VOLUNTEER_ID = 1; // Rahul Sharma

export default function VolunteerTasksTab() {
  const [tasks, setTasks] = useState<Task[]>(allTasks.filter(t => t.assignedToType === 'volunteer' && t.assignedToId === VOLUNTEER_ID));
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [note, setNote] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'submitted' | 'approved' | 'rejected'>('all');

  const filtered = activeFilter === 'all' ? tasks : tasks.filter(t => t.status === activeFilter);

  const handleSubmit = (taskId: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? {
      ...t,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      uploadedImage: t.requiresUpload ? 'uploaded' : undefined,
    } : t));
    setSelectedTask(null);
    setShowUpload(false);
    setNote('');
  };

  const getDaysLeft = (deadline: string) => {
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const filterTabs: { id: typeof activeFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: tasks.length },
    { id: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
    { id: 'submitted', label: 'Submitted', count: tasks.filter(t => t.status === 'submitted').length },
    { id: 'approved', label: 'Approved', count: tasks.filter(t => t.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', count: tasks.filter(t => t.status === 'rejected').length },
  ];

  return (
    <div>
      <SectionHeader
        title="My Tasks"
        subtitle={`${tasks.filter(t => t.status === 'pending').length} pending · ${tasks.filter(t => t.status === 'submitted').length} awaiting review`}
      />

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeFilter === tab.id ? 'bg-orange-500 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(task => {
          const daysLeft = getDaysLeft(task.deadline);
          const isOverdue = daysLeft < 0;
          const isUrgent = daysLeft >= 0 && daysLeft <= 3;
          return (
            <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 cursor-pointer" onClick={() => setSelectedTask(task)}>
                <div className="mt-0.5">
                  {task.status === 'approved' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> :
                    task.status === 'submitted' ? <CheckCircle className="w-4 h-4 text-blue-500" /> :
                    task.status === 'rejected' ? <XCircle className="w-4 h-4 text-red-500" /> :
                    <Clock className="w-4 h-4 text-amber-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">{task.title}</h4>
                    <Badge status={task.status} />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{task.description}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-500' : isUrgent ? 'text-amber-500' : 'text-slate-400'}`}>
                      <Calendar className="w-3 h-3" />
                      {isOverdue ? `Overdue ${Math.abs(daysLeft)}d` : `${daysLeft}d left · ${task.deadline}`}
                    </span>
                    {task.requiresUpload && (
                      <span className="flex items-center gap-1 text-xs text-blue-500">
                        <ImageIcon className="w-3 h-3" />
                        {task.uploadedImage ? 'Photo submitted' : 'Upload required'}
                      </span>
                    )}
                    {isUrgent && !isOverdue && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {task.status === 'pending' && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => { setSelectedTask(task); setShowUpload(true); }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-medium transition-colors ${task.requiresUpload ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                  >
                    {task.requiresUpload ? <><Upload className="w-3.5 h-3.5" /> Upload & Submit</> : <><CheckCircle className="w-3.5 h-3.5" /> Mark Complete</>}
                  </button>
                </div>
              )}
              {task.status === 'rejected' && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
                  <span className="text-xs text-red-500">Task rejected</span>
                  <button
                    onClick={() => { setSelectedTask(task); setShowUpload(true); }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" /> Re-submit
                  </button>
                </div>
              )}
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500 dark:text-slate-400">No tasks in this category</p>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && !showUpload && (
        <Modal title="Task Details" onClose={() => setSelectedTask(null)}>
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900 dark:text-white mb-2">{selectedTask.title}</h3>
              <Badge status={selectedTask.status} />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 leading-relaxed">
              {selectedTask.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Deadline</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">{selectedTask.deadline}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Assigned By</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">Admin</p>
              </div>
            </div>
            {selectedTask.requiresUpload && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  {selectedTask.uploadedImage ? 'Photo has been submitted' : 'Photo upload is required'}
                </span>
              </div>
            )}
            {selectedTask.status === 'pending' && (
              <button
                onClick={() => setShowUpload(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium"
              >
                <Upload className="w-4 h-4" /> Submit Task
              </button>
            )}
          </div>
        </Modal>
      )}

      {/* Upload Modal */}
      {selectedTask && showUpload && (
        <Modal title="Submit Task" onClose={() => { setShowUpload(false); setSelectedTask(null); }}>
          <div className="space-y-4">
            {selectedTask.requiresUpload && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-orange-400 transition-colors">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Click to upload or drag & drop</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Note (Optional)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add notes about your submission..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSubmit(selectedTask.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" /> Submit for Review
              </button>
              <button
                onClick={() => { setShowUpload(false); setSelectedTask(null); }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
