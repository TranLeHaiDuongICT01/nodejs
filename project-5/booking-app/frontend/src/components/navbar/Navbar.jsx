import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './navbar.css'
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem("user", JSON.stringify(user))
  }
  const nav = useNavigate()
  const toLogin = () => {
    nav('/login')
  }
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'capitalize' }}>
          <span className='navLogo'>lamabooking</span></Link>
        <div className='navItems'>
          {!user ? (
            <>
              <button className='navBtn'>Register</button>
              <button onClick={toLogin} className='navBtn'>Login</button>
            </>
          ) : (
            <button onClick={logoutHandler} className='navBtn'>Logout</button>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar