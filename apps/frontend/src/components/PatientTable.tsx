import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Pagination
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { fetchPatients, createPatient, updatePatient, deletePatient } from '@kinetix/api-client';
import type { Patient } from '@kinetix/shared-types';
import { PatientFormModal } from './PatientFormModal';

export function PatientTable() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | undefined>();

  const load = async (pageNum = page) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPatients(pageNum, pageSize);
      setPatients(data.patients);
      setTotal(data.total);
    } catch (e) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, [page]);

  const handleSave = async (patient: Partial<Patient>) => {
    try {
      if (editPatient) {
        await updatePatient(editPatient.id, patient);
      } else {
        await createPatient(patient as any);
      }
      setModalOpen(false);
      setEditPatient(undefined);
      load();
    } catch {
      setError('Failed to save patient');
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await deletePatient(id);
      load();
    } catch {
      setError('Failed to delete patient');
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Patients</h2>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditPatient(undefined); setModalOpen(true); }}>Add Patient</Button>
      </div>
      {loading ? <CircularProgress /> : error ? <div style={{ color: 'red' }}>{error}</div> : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.firstName}</TableCell>
                  <TableCell>{p.lastName}</TableCell>
                  <TableCell>{p.dateOfBirth}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.address}</TableCell>
                  <TableCell>
                    <Button onClick={() => { setEditPatient(p); setModalOpen(true); }}><Edit /></Button>
                    <Button onClick={() => handleDelete(p.id)}><Delete /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={Math.ceil(total / pageSize)}
        page={page}
        onChange={(_, val) => setPage(val)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
      <PatientFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditPatient(undefined); }}
        onSave={handleSave}
        initial={editPatient}
      />
    </Paper>
  );
}
