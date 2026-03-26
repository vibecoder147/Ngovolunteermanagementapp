import { useState } from 'react';
import { Award, Plus, CheckCircle, Clock, XCircle, Download } from 'lucide-react';
import { generalRequests, GeneralRequest } from '../../data/mockData';
import { Modal, Badge, Card, SectionHeader, FormField } from '../shared/UIComponents';

const MEMBER_NAME = 'Dr. Anjali Mehta';

const myCertRequests = generalRequests.filter(r => r.requesterName === MEMBER_NAME && r.requestType === 'certificate');

export default function MemberCertificateTab() {
  const [requests, setRequests] = useState<GeneralRequest[]>(myCertRequests);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ certType: 'participation', details: '' });

  const certTypes = [
    { value: 'participation', label: 'Certificate of Participation' },
    { value: 'appreciation', label: 'Certificate of Appreciation' },
    { value: 'membership', label: 'Membership Certificate' },
    { value: 'donation', label: 'Donation Acknowledgement' },
  ];

  const handleSubmit = () => {
    if (!form.certType) return;
    const newReq: GeneralRequest = {
      id: Date.now(),
      requestType: 'certificate',
      requesterName: MEMBER_NAME,
      requesterType: 'member',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      details: `${certTypes.find(c => c.value === form.certType)?.label}${form.details ? ' – ' + form.details : ''}`,
    };
    setRequests(prev => [...prev, newReq]);
    setForm({ certType: 'participation', details: '' });
    setShowForm(false);
  };

  return (
    <div>
      <SectionHeader
        title="Certificate"
        subtitle="Request certificates for your contributions"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-purple-600/20"
          >
            <Plus className="w-4 h-4" /> Request Certificate
          </button>
        }
      />

      {/* Info */}
      <div className="mb-5 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Certificate Requests</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              Your certificate request will be reviewed by the Admin. 
              Once approved, you will be notified and can download your certificate.
            </p>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {requests.map(req => (
          <Card key={req.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                req.status === 'approved' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                req.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30' :
                'bg-purple-100 dark:bg-purple-900/30'
              }`}>
                {req.status === 'approved'
                  ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                  : req.status === 'rejected'
                    ? <XCircle className="w-5 h-5 text-red-500" />
                    : <Clock className="w-5 h-5 text-purple-500" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{req.details}</p>
                    <p className="text-xs text-slate-400 mt-1">Requested on {req.requestDate}</p>
                  </div>
                  <Badge status={req.status} />
                </div>
                {req.status === 'approved' && (
                  <button className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                    <Download className="w-3 h-3" /> Download Certificate
                  </button>
                )}
                {req.status === 'pending' && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Awaiting admin approval
                  </p>
                )}
                {req.status === 'rejected' && (
                  <p className="text-xs text-red-500 mt-2">Request was not approved. Contact admin for details.</p>
                )}
              </div>
            </div>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500 dark:text-slate-400">No certificate requests yet</p>
          </div>
        )}
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <Modal title="Request Certificate" onClose={() => setShowForm(false)}>
          <div className="space-y-4">
            <FormField label="Certificate Type">
              <select
                value={form.certType}
                onChange={e => setForm(p => ({ ...p, certType: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {certTypes.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </FormField>
            <FormField label="Additional Details (Optional)">
              <textarea
                value={form.details}
                onChange={e => setForm(p => ({ ...p, details: e.target.value }))}
                placeholder="Any specific details about the certificate..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </FormField>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
              >
                <Award className="w-4 h-4" /> Submit Request
              </button>
              <button
                onClick={() => setShowForm(false)}
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
