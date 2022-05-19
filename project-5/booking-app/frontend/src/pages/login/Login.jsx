import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import './login.css'
const Login = () => {
    const [credential, setCredential] = useState({
        email: undefined,
        password: undefined
    })
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.id]: e.target.value })
    }
    const nav = useNavigate()

    const { loading, error, dispatch, clearError } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: 'LOGIN_START' })
        try {
            const data = await axios.post('http://localhost:5000/api/auth/login', credential)
            console.log(data.data.user);
            dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user })
            localStorage.setItem("user", JSON.stringify(data.data.user))
            nav('/')
        } catch (error) {
            console.log(error);
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.err })
        }
    }
    return (
        <div className='login'>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder='email' id='email'
                        name='email' onChange={handleChange} className='lInput' />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='password' id='password'
                        name='password' onChange={handleChange} className='lInput' />
                </div>

                <div className="form-btn">
                    <button disabled={loading} onClick={handleClick} className="btn">Login</button>

                </div>
                {error && <span className='error'><div onClick={(e) => { clearError() }}>!!!{error}</div></span>}
            </div>
        </div>
    )
}

export default Login 