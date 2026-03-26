import { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, Plus, FileText, Lock } from 'lucide-react';
import { meetings as initialMeetings, Meeting } from '../../data/mockData';
import { Modal, Badge, Card, SectionHeader } from '../shared/UIComponents';
import { useApp } from '../../context/AppContext';

export default function MemberMeetingsTab() {
  const { currentUser } = useApp();
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showAddSummary, setShowAddSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [addingFor, setAddingFor] = useState<Meeting | null>(null);

  const upcoming = meetings.filter(m => m.status === 'upcoming');
  const completed = meetings.filter(m => m.status === 'completed');

  const handleAddSummary = () => {
    if (!addingFor || !summary.trim()) return;
    setMeetings(prev => prev.map(m => m.id === addingFor.id
      ? { ...m, summary: summary.trim(), status: 'completed', addedBy: currentUser?.name || 'Member' }
      : m
    ));
    setSummary('');
    setAddingFor(null);
    setShowAddSummary(false);
  };

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
    const hasSummary = !!meeting.summary;
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-slate-800 dark:text-slate-200">{meeting.title}</h4>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{meeting.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{meeting.time}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{meeting.attendees.length} attendees</span>
            </div>
          </div>
          <Badge status={meeting.status} />
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {meeting.attendees.slice(0, 3).map((a, i) => (
            <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">{a}</span>
          ))}
          {meeting.attendees.length > 3 && (
            <span className="text-xs text-slate-400">+{meeting.attendees.length - 3} more</span>
          )}
        </div>

        {hasSummary ? (
          <div className="mt-2">
            <div className="flex items-center gap-1.5 mb-2">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">MOM Submitted by {meeting.addedBy}</span>
            </div>
            <button
              onClick={() => { setSelectedMeeting(meeting); }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Summary →
            </button>
          </div>
        ) : (
          meeting.status === 'completed' && (
            <button
              onClick={() => { setAddingFor(meeting); setShowAddSummary(true); }}
              className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              <Plus className="w-3 h-3" /> Add Meeting Summary
            </button>
          )
        )}

        {meeting.status === 'upcoming' && (
          <div className="mt-2 p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300">
            📅 Scheduled – you are invited to attend
          </div>
        )}
      </Card>
    );
  };

  return (
    <div>
      <SectionHeader
        title="Minutes of Meeting"
        subtitle={`${upcoming.length} upcoming · ${completed.length} completed`}
      />

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Upcoming Meetings
          </h3>
          <div className="space-y-3">
            {upcoming.map(m => <MeetingCard key={m.id} meeting={m} />)}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Past Meetings
          </h3>
          <div className="space-y-3">
            {completed.map(m => <MeetingCard key={m.id} meeting={m} />)}
          </div>
        </div>
      )}

      {/* Meeting Summary Modal */}
      {selectedMeeting && !showAddSummary && (
        <Modal title={selectedMeeting.title} onClose={() => setSelectedMeeting(null)} size="md">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Date</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">{selectedMeeting.date}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Time</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">{selectedMeeting.time}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Attendees</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedMeeting.attendees.map((a, i) => (
                  <span key={i} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full">{a}</span>
                ))}
              </div>
            </div>
            {selectedMeeting.summary && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Meeting Summary (MOM)</p>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 ml-auto">By {selectedMeeting.addedBy}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 leading-relaxed">
                  {selectedMeeting.summary}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Add Summary Modal */}
      {showAddSummary && addingFor && (
        <Modal title={`Add MOM: ${addingFor.title}`} onClose={() => { setShowAddSummary(false); setAddingFor(null); }}>
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-xs text-amber-700 dark:text-amber-400">
              ⚠️ Once you submit the meeting summary, it will be locked and no other member can add another summary.
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Meeting Summary *
              </label>
              <textarea
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="Write the minutes of meeting summary..."
                rows={5}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddSummary}
                disabled={!summary.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium transition-colors"
              >
                <CheckCircle className="w-4 h-4" /> Submit Summary
              </button>
              <button
                onClick={() => { setShowAddSummary(false); setAddingFor(null); }}
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
