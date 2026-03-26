import { useState } from 'react';
import { Award, Plus, CheckCircle, Clock, XCircle, Download, Send } from 'lucide-react';
import { Modal, Badge, Card, SectionHeader, FormField } from '../shared/UIComponents';

interface CertRequest {
  id: number;
  certType: string;
  details: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approvalNote?: string;
}

const initialRequests: CertRequest[] = [
  {
    id: 1,
    certType: 'completion',
    details: 'Certificate of Completion – Health Camp Assistance (Mar 2025)',
    requestDate: '2025-03-05',
    status: 'approved',
  },
];

const certTypes = [
  { value: 'completion', label: 'Certificate of Completion' },
  { value: 'participation', label: 'Certificate of Participation' },
  { value: 'appreciation', label: 'Certificate of Appreciation' },
  { value: 'service', label: 'Certificate of Service' },
];

export default function VolunteerCertificateTab() {
  const [requests, setRequests] = useState<CertRequest[]>(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ certType: 'completion', details: '', projectName: '' });

  const handleSubmit = () => {
    if (!form.certType) return;
    const certLabel = certTypes.find(c => c.value === form.certType)?.label;
    const newReq: CertRequest = {
      id: Date.now(),
      certType: form.certType,
      details: `${certLabel}${form.projectName ? ' – ' + form.projectName : ''}${form.details ? '. ' + form.details : ''}`,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setRequests(prev => [...prev, newReq]);
    setForm({ certType: 'completion', details: '', projectName: '' });
    setShowForm(false);
  };

  return (
    <div>
      <SectionHeader
        title="Certificate of Completion"
        subtitle="Request certificates for your volunteer work"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-orange-500/20"
          >
            <Plus className="w-4 h-4" /> Request Certificate
          </button>
        }
      />

      {/* Info Banner */}
      <div className="mb-5 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Certificate Request Process</p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 leading-relaxed">
              Your certificate request goes to the Admin you are assigned to and to the Super Admin for approval.
              Once approved, you can download your certificate from here.
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
                'bg-orange-100 dark:bg-orange-900/30'
              }`}>
                {req.status === 'approved'
                  ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                  : req.status === 'rejected'
                    ? <XCircle className="w-5 h-5 text-red-500" />
                    : <Clock className="w-5 h-5 text-orange-500" />
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
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600 dark:text-amber-400">
                    <Clock className="w-3 h-3" />
                    Awaiting approval from assigned Admin & Super Admin
                  </div>
                )}
                {req.status === 'rejected' && (
                  <p className="text-xs text-red-500 mt-2">Request was not approved. Please contact your admin for details.</p>
                )}
              </div>
            </div>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500 dark:text-slate-400">No certificate requests yet</p>
            <button onClick={() => setShowForm(true)} className="mt-3 text-sm text-orange-500 hover:underline">
              Request your first certificate
            </button>
          </div>
        )}
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <Modal title="Request Certificate" onClose={() => setShowForm(false)}>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-xs text-blue-700 dark:text-blue-300">
              <Send className="w-3.5 h-3.5 inline mr-1.5" />
              This request will be sent to your assigned Admin and Super Admin for approval.
            </div>
            <FormField label="Certificate Type">
              <select
                value={form.certType}
                onChange={e => setForm(p => ({ ...p, certType: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {certTypes.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </FormField>
            <FormField label="Project / Activity Name">
              <input
                value={form.projectName}
                onChange={e => setForm(p => ({ ...p, projectName: e.target.value }))}
                placeholder="e.g. Food Drive March 2025, Health Camp"
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </FormField>
            <FormField label="Additional Details (Optional)">
              <textarea
                value={form.details}
                onChange={e => setForm(p => ({ ...p, details: e.target.value }))}
                placeholder="Any specific information about your contribution..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </FormField>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
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
