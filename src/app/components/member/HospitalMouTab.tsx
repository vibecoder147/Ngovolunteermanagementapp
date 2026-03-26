import { useState } from 'react';
import { Hospital, Plus, CheckCircle, Clock, XCircle, Phone, MapPin, User } from 'lucide-react';
import { mouRequests as initialMou, MouRequest } from '../../data/mockData';
import { Modal, Badge, Card, SectionHeader, FormField, Input } from '../shared/UIComponents';

const MEMBER_NAME = 'Dr. Anjali Mehta';

export default function HospitalMouTab() {
  const [mouList, setMouList] = useState<MouRequest[]>(initialMou.filter(m => m.requesterName === MEMBER_NAME));
  const [showForm, setShowForm] = useState(false);
  const [selectedMou, setSelectedMou] = useState<MouRequest | null>(null);
  const [form, setForm] = useState({
    patientName: '', patientAge: '', disease: '', hospital: '',
    phone: '', address: '', bloodGroup: ''
  });

  const handleSubmit = () => {
    if (!form.patientName || !form.disease || !form.hospital) return;
    const newMou: MouRequest = {
      id: Date.now(),
      patientName: form.patientName,
      patientAge: parseInt(form.patientAge) || 0,
      disease: form.disease,
      hospital: form.hospital,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      requesterName: MEMBER_NAME,
      phone: form.phone,
      address: form.address,
      bloodGroup: form.bloodGroup,
    };
    setMouList(prev => [...prev, newMou]);
    setForm({ patientName: '', patientAge: '', disease: '', hospital: '', phone: '', address: '', bloodGroup: '' });
    setShowForm(false);
  };

  const statusIcons: Record<string, JSX.Element> = {
    pending: <Clock className="w-5 h-5 text-amber-500" />,
    approved: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    rejected: <XCircle className="w-5 h-5 text-red-500" />,
  };

  return (
    <div>
      <SectionHeader
        title="Hospital MOU"
        subtitle="Request Medical MOU for patients in need"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-rose-600/20"
          >
            <Plus className="w-4 h-4" /> Request MOU
          </button>
        }
      />

      {/* Info Banner */}
      <div className="mb-5 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-start gap-3">
          <Hospital className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">About Hospital MOU</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 leading-relaxed">
              Submit a MOU request for patients who need financial assistance for medical treatment. 
              Approval is granted by Admin or Super Admin. You can track the status below.
            </p>
          </div>
        </div>
      </div>

      {/* MOU List */}
      <div className="space-y-3">
        {mouList.map(mou => (
          <Card key={mou.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                {statusIcons[mou.status]}
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><Hospital className="w-3 h-3" />{mou.hospital}</span>
                  <span>🩸 {mou.bloodGroup}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{mou.phone}</span>
                  <span>📅 {mou.requestDate}</span>
                </div>
                <button
                  onClick={() => setSelectedMou(mou)}
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View full details →
                </button>
              </div>
            </div>
          </Card>
        ))}
        {mouList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Hospital className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500 dark:text-slate-400">No MOU requests yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Submit your first request
            </button>
          </div>
        )}
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <Modal title="Request Hospital MOU" onClose={() => setShowForm(false)} size="lg">
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-xs text-amber-700 dark:text-amber-400">
              💬 Fill in the patient details below. For queries, WhatsApp: <strong>+91-9876543210</strong>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Patient Name *">
                <Input value={form.patientName} onChange={v => setForm(p => ({ ...p, patientName: v }))} placeholder="Full name" />
              </FormField>
              <FormField label="Patient Age *">
                <Input value={form.patientAge} onChange={v => setForm(p => ({ ...p, patientAge: v }))} placeholder="Age" type="number" />
              </FormField>
            </div>
            <FormField label="Disease / Condition *">
              <Input value={form.disease} onChange={v => setForm(p => ({ ...p, disease: v }))} placeholder="e.g. Cardiac Surgery, Dialysis" />
            </FormField>
            <FormField label="Hospital Name *">
              <Input value={form.hospital} onChange={v => setForm(p => ({ ...p, hospital: v }))} placeholder="e.g. City General Hospital" />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Blood Group">
                <select
                  value={form.bloodGroup}
                  onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Phone Number">
                <Input value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} placeholder="10-digit number" />
              </FormField>
            </div>
            <FormField label="Patient Address">
              <Input value={form.address} onChange={v => setForm(p => ({ ...p, address: v }))} placeholder="Area, City" />
            </FormField>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium transition-colors"
              >
                <Hospital className="w-4 h-4" /> Submit MOU Request
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

      {/* MOU Detail Modal */}
      {selectedMou && (
        <Modal title="MOU Request Details" onClose={() => setSelectedMou(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedMou.patientName}</p>
                <Badge status={selectedMou.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Age', value: `${selectedMou.patientAge} years` },
                { label: 'Blood Group', value: selectedMou.bloodGroup },
                { label: 'Disease', value: selectedMou.disease },
                { label: 'Hospital', value: selectedMou.hospital },
                { label: 'Phone', value: selectedMou.phone },
                { label: 'Submitted', value: selectedMou.requestDate },
              ].map(f => (
                <div key={f.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">{f.label}</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">{selectedMou.address}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
