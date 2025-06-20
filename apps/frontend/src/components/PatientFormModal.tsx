import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import type { Patient } from '@kinetix/shared-types';

interface PatientFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (patient: Partial<Patient>) => void;
  initial?: Partial<Patient>;
}

function validate(form: Partial<Patient>) {
  const errors: Record<string, string> = {};
  if (!form.firstName?.trim()) errors.firstName = 'First name is required';
  if (!form.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!form.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
  if (!form.email?.trim()) errors.email = 'Email is required';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = 'Invalid email';
  return errors;
}

export function PatientFormModal({ open, onClose, onSave, initial }: PatientFormProps) {
  const [form, setForm] = useState<Partial<Patient>>(initial || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => { setForm(initial || {}); setErrors({}); setSubmitError(''); }, [initial, open]);

  const handleChange = (field: keyof Patient) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleSave = () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      onSave(form);
    } catch (e) {
      setSubmitError('Failed to save patient');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial?.id ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
        {submitError && <Alert severity="error">{submitError}</Alert>}
        <TextField label="First Name" value={form.firstName || ''} onChange={handleChange('firstName')} error={!!errors.firstName} helperText={errors.firstName} autoFocus required />
        <TextField label="Last Name" value={form.lastName || ''} onChange={handleChange('lastName')} error={!!errors.lastName} helperText={errors.lastName} required />
        <TextField label="Date of Birth" type="date" value={form.dateOfBirth || ''} onChange={handleChange('dateOfBirth')} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} InputLabelProps={{ shrink: true }} required />
        <TextField label="Email" value={form.email || ''} onChange={handleChange('email')} error={!!errors.email} helperText={errors.email} required />
        <TextField label="Phone" value={form.phone || ''} onChange={handleChange('phone')} />
        <TextField label="Address" value={form.address || ''} onChange={handleChange('address')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
