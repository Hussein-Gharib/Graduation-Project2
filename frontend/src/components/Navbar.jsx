import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    padding: '10px 18px',
    textDecoration: 'none',
    borderRadius: 8,
    fontWeight: 600,
    color: isActive ? '#FFD700' : '#fff', 
    background: isActive ? '#000' : 'transparent',
    marginRight: 10,
    transition: '0.3s',
  })

  return (
    <nav
      style={{
        backgroundColor: '#111', 
        color: '#fff', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '2px solid #FFD700', 
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: '22px',
            letterSpacing: '1px',
            color: '#FFD700',
            marginRight: '30px',
          }}
        >
          Luxury Modern Bags
        </div>

        <NavLink to="/home" end style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/products" style={linkStyle}>
          Products
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          About Us
        </NavLink>
        <NavLink to="/contact" style={linkStyle}>
          Contact
        </NavLink>
      </div>
    </nav>
  )
}
