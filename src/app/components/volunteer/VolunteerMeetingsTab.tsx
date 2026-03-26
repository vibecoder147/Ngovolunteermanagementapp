import { useState } from 'react';
import { Calendar, Clock, Users, Eye, FileText } from 'lucide-react';
import { meetings } from '../../data/mockData';
import { Modal, Badge, Card, SectionHeader } from '../shared/UIComponents';

export default function VolunteerMeetingsTab() {
  const [selectedMeeting, setSelectedMeeting] = useState<typeof meetings[0] | null>(null);

  const upcoming = meetings.filter(m => m.status === 'upcoming');
  const completed = meetings.filter(m => m.status === 'completed');

  const MeetingCard = ({ meeting }: { meeting: typeof meetings[0] }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1">{meeting.title}</h4>
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

      {meeting.summary ? (
        <div className="mt-2">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="w-3 h-3 text-emerald-500" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">MOM added by {meeting.addedBy}</span>
          </div>
          <button
            onClick={() => setSelectedMeeting(meeting)}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Eye className="w-3 h-3" /> View Summary →
          </button>
        </div>
      ) : (
        meeting.status === 'completed' && (
          <p className="text-xs text-slate-400 mt-2 italic">No meeting summary added yet</p>
        )
      )}

      {meeting.status === 'upcoming' && (
        <div className="mt-2 p-2.5 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-xs text-orange-700 dark:text-orange-300">
          📅 You are invited to this meeting
        </div>
      )}
    </Card>
  );

  return (
    <div>
      <SectionHeader
        title="Minutes of Meeting"
        subtitle={`${upcoming.length} upcoming · ${completed.length} completed (view only)`}
      />

      {/* View-only notice */}
      <div className="mb-5 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2">
        <Eye className="w-3.5 h-3.5 shrink-0" />
        Meetings are visible to you in view-only mode. Meeting summaries can be added by Members.
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Upcoming Meetings</h3>
          <div className="space-y-3">
            {upcoming.map(m => <MeetingCard key={m.id} meeting={m} />)}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Past Meetings</h3>
          <div className="space-y-3">
            {completed.map(m => <MeetingCard key={m.id} meeting={m} />)}
          </div>
        </div>
      )}

      {/* Meeting Summary Modal (view only) */}
      {selectedMeeting && (
        <Modal title={selectedMeeting.title} onClose={() => setSelectedMeeting(null)} size="md">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
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
                  <span key={i} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-2.5 py-1 rounded-full">{a}</span>
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
    </div>
  );
}
