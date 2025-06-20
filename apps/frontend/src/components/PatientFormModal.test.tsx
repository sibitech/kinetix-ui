import './setupTests';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PatientFormModal } from './PatientFormModal';

describe('PatientFormModal', () => {
  it('validates required fields', async () => {
    const handleSave = jest.fn();
    render(<PatientFormModal open={true} onClose={() => {}} onSave={handleSave} />);
    fireEvent.click(screen.getByText('Save'));
    expect(await screen.findByText('First name is required')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required')).toBeInTheDocument();
    expect(await screen.findByText('Date of birth is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const handleSave = jest.fn();
    render(<PatientFormModal open={true} onClose={() => {}} onSave={handleSave} />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'bademail' } });
    fireEvent.click(screen.getByText('Save'));
    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
  });

  it('calls onSave with valid data', async () => {
    const handleSave = jest.fn();
    render(<PatientFormModal open={true} onClose={() => {}} onSave={handleSave} />);
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(handleSave).toHaveBeenCalled());
  });
});
