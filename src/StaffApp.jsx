// StaffApp.jsx
import { useNavigate } from 'react-router-dom'
import StaffPage from './StaffPage.jsx'

export default function StaffApp() {
  const navigate = useNavigate()
  return (
    <>
      {/* Back bar — fixed at very top, 36px tall */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: 'rgba(8,12,20,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,158,11,0.15)',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 36,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 0',
            fontFamily: 'inherit',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#F1F5F9'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
        >
          ← All Products
        </button>
        <span style={{ color: '#1E293B', fontSize: 13 }}>|</span>
        <span style={{ fontSize: 12, color: '#F59E0B', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          👥 Staff Intelligence
        </span>
      </div>

      <StaffPage />
    </>
  )
}
