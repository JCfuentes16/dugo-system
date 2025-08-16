import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <button
        onClick={() => setShowPopup(true)}
        style={{ backgroundColor: '#D50000', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#B71C1C'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#D50000'}
      >
        Register
      </button>

      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', width: '300px', textAlign: 'center' }}>
            <h2 style={{ color: '#D50000', marginBottom: '16px' }}>Select Account Type</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/register/donor"><button style={btnStyle}>Donor</button></Link>
              <Link href="/register/hospital"><button style={btnStyle}>Hospital</button></Link>
              <Link href="/register/bloodbank"><button style={btnStyle}>Blood Bank</button></Link>
            </div>
            <button onClick={() => setShowPopup(false)} style={{ marginTop: '16px', width: '100%', backgroundColor: '#ccc', padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  backgroundColor: '#D50000',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px'
};
