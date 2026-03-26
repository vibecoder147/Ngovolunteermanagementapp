import { useState } from 'react';
import { CheckCircle, XCircle, FileText, Award, Hospital, Clock, Filter } from 'lucide-react';
import { generalRequests as initialRequests, mouRequests as initialMou, GeneralRequest, MouRequest } from '../../data/mockData';
import { Modal, Badge, Avatar, Card, SectionHeader } from '../shared/UIComponents';

interface Props { isSuperAdmin: boolean; }

type TabType = 'all' | 'joining-letter' | 'certificate' | 'medical-mou';

const requestTypeConfig: Record<string, { label: string; icon: JSX.Element; color: string }> = {
  'joining-letter': { label: 'Joining Letter', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'certificate': { label: 'Certificate', icon: <Award className="w-3.5 h-3.5" />, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  'medical-mou': { label: 'Medical MOU', icon: <Hospital className="w-3.5 h-3.5" />, color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' },
};

export default function RequestsTab({ isSuperAdmin }: Props) {
  const [requests, setRequests] = useState<GeneralRequest[]>(initialRequests);
  const [mouRequests, setMouRequests] = useState<MouRequest[]>(initialMou);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedMou, setSelectedMou] = useState<MouRequest | null>(null);

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };
  const handleReject = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };
  const handleMouApprove = (id: number) => {
    setMouRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setSelectedMou(null);
  };
  const handleMouReject = (id: number) => {
    setMouRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    setSelectedMou(null);
  };

  const filteredRequests = activeTab === 'all'
    ? requests
    : activeTab === 'medical-mou'
      ? []
      : requests.filter(r => r.requestType === activeTab);

  const showMouInTab = activeTab === 'all' || activeTab === 'medical-mou';

  const pendingCount = requests.filter(r => r.status === 'pending').length + mouRequests.filter(r => r.status === 'pending').length;

  const tabs: { id: TabType; label: string; icon: JSX.Element; count: number }[] = [
    { id: 'all', label: 'All', icon: <Filter className="w-3.5 h-3.5" />, count: requests.length + mouRequests.length },
    { id: 'joining-letter', label: 'Joining Letter', icon: <FileText className="w-3.5 h-3.5" />, count: requests.filter(r => r.requestType === 'joining-letter').length },
    { id: 'certificate', label: 'Certificates', icon: <Award className="w-3.5 h-3.5" />, count: requests.filter(r => r.requestType === 'certificate').length },
    { id: 'medical-mou', label: 'Medical MOU', icon: <Hospital className="w-3.5 h-3.5" />, count: mouRequests.length },
  ];

  return (
    <div>
      <SectionHeader
        title="All Requests"
        subtitle={`${pendingCount} pending approval`}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'}`}
          >
            {tab.icon}
            {tab.label}
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* General Requests */}
      {filteredRequests.length > 0 && (
        <div className="space-y-3 mb-5">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {activeTab === 'joining-letter' ? 'Joining Letter Requests' : activeTab === 'certificate' ? 'Certificate Requests' : 'General Requests'}
          </h3>
          {filteredRequests.map(req => {
            const typeConf = requestTypeConfig[req.requestType];
            return (
              <Card key={req.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar initials={req.requesterName.split(' ').map(n => n[0]).join('')} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{req.requesterName}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge status={req.status} />
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${typeConf.color}`}>
                            {typeConf.icon} {typeConf.label}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 capitalize">
                            {req.requesterType}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">{req.requestDate}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{req.details}</p>

                    {req.status === 'pending' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-600 dark:text-red-400 text-xs font-medium transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                    {req.status === 'approved' && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" /> Approved
                      </div>
                    )}
                    {req.status === 'rejected' && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500">
                        <XCircle className="w-3.5 h-3.5" /> Rejected
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Medical MOU Requests */}
      {showMouInTab && mouRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Medical MOU Requests
          </h3>
          {mouRequests.map(mou => (
            <Card key={mou.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                  <Hospital className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">{mou.patientName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Age {mou.patientAge} · {mou.disease}
                      </p>
                    </div>
                    <Badge status={mou.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2.5 text-xs text-slate-500 dark:text-slate-400">
                    <span>🏥 {mou.hospital}</span>
                    <span>🩸 {mou.bloodGroup}</span>
                    <span>👤 Requested by: {mou.requesterName}</span>
                    <span>📅 {mou.requestDate}</span>
                  </div>

                  {mou.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setSelectedMou(mou)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-medium transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleMouApprove(mou.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Approve MOU
                      </button>
                      <button
                        onClick={() => handleMouReject(mou.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {mou.status === 'approved' && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" /> MOU Approved
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredRequests.length === 0 && !showMouInTab && (
        <div className="flex flex-col items-center justify-center py-16">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-slate-500 dark:text-slate-400">No requests in this category</p>
        </div>
      )}

      {/* MOU Detail Modal */}
      {selectedMou && (
        <Modal title="Medical MOU Request Details" onClose={() => setSelectedMou(null)} size="md">
          <div className="space-y-4">
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/40 rounded-xl flex items-center justify-center">
                  <Hospital className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedMou.patientName}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Patient Details</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { label: 'Age', value: `${selectedMou.patientAge} years` },
                  { label: 'Blood Group', value: selectedMou.bloodGroup },
                  { label: 'Disease/Condition', value: selectedMou.disease },
                  { label: 'Hospital', value: selectedMou.hospital },
                  { label: 'Phone', value: selectedMou.phone },
                  { label: 'Address', value: selectedMou.address },
                ].map(f => (
                  <div key={f.label} className="bg-white dark:bg-slate-800 rounded-lg p-2.5">
                    <p className="text-xs text-slate-400">{f.label}</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 text-sm">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
              <p className="text-xs text-slate-500 mb-1">Requested by</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedMou.requesterName}</p>
              <p className="text-xs text-slate-400 mt-1">Submitted on {selectedMou.requestDate}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleMouApprove(selectedMou.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
              >
                <CheckCircle className="w-4 h-4" /> Approve MOU
              </button>
              <button
                onClick={() => handleMouReject(selectedMou.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
