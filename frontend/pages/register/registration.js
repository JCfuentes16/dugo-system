import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RegistrationForm() {
  const router = useRouter();
  const { type } = router.query; // donor | hospital | bloodbank
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Ayuha ang payload depende sa type
    let payload = {};
    if (type === 'hospital') {
      payload = {
        hospital_name: form.name, // map 'name' field sa hospital_name
        email: form.email,
        password: form.password,
        contact_number: form.contact_number,
        address: form.address,
      };
    } else if (type === 'bloodbank') {
      payload = {
        name: form.name, // sa blood_bank table column = "name"
        email: form.email,
        password: form.password,
        contact_number: form.contact_number,
        address: form.address,
      };
    } else if (type === 'donor') {
      payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        blood_type: form.blood_type,
        contact_number: form.contact_number,
        address: form.address,
      };
    }

    const res = await fetch(`http://localhost:5000/api/auth/register/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#D50000', marginBottom: '12px', textTransform: 'capitalize' }}>{type} Registration</h2>

        {/* Name field - dynamic placeholder */}
        <input 
          name="name" 
          onChange={handleChange} 
          placeholder={
            type === 'hospital' ? 'Hospital Name' : type === 'bloodbank' ? 'Blood Bank Name' : 'Full Name'
          } 
          style={inputStyle} 
          required 
        />

        <input name="email" onChange={handleChange} placeholder="Email" type="email" style={inputStyle} required />
        <input name="password" onChange={handleChange} placeholder="Password" type="password" style={inputStyle} required />

        {/* Donor only field */}
        {type === 'donor' && (
          <input name="blood_type" onChange={handleChange} placeholder="Blood Type" style={inputStyle} required />
        )}

        <input name="contact_number" onChange={handleChange} placeholder="Contact Number" style={inputStyle} required />
        <input name="address" onChange={handleChange} placeholder="Address" style={inputStyle} required />

        <button type="submit" style={btnStyle}>Register</button>
        {message && <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px' }}>{message}</p>}
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px'
};

const btnStyle = {
  backgroundColor: '#D50000',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  width: '100%',
  fontSize: '16px'
};
