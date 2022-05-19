import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core'
import logo from '../../images/logo.png'
import text from '../../images/text.png'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import useStyles from './styles'
const Navbar = ({ setUserId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logoutHandler()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
        setUserId(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    const logoutHandler = () => {
        dispatch({ type: 'LOGOUT' })
        setUserId(null)
        navigate('/')
    }
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={text} className={classes.imageText} alt='icon' height='45px' />
                <img className={classes.image} src={logo} alt="memories" height="40px"></img>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt='user.result.name' src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name.split(' ')[0]}</Typography>
                        <Button variant='contained' onClick={logoutHandler} className={classes.logout} color='secondary'>Logout</Button>
                    </div>
                ) : (
                    <div className={classes.profile}>
                    <Button component={Link} to='auth' variant='contained' color='primary'>Sign in</Button>
                    </div>
                )}
        </Toolbar>
        </AppBar >
    )
}

export default Navbar