import React, { useState } from 'react'
import { gapi } from 'gapi-script'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { signIn, signUp } from '../../action/auth'
import useStyles from './styles'

const Auth = () => {
  const initialState = {
    firstName: '', lastName: '',
    email: '', password: '',
    confirmPassword: ''
  }
  gapi.load('client:auth2', () => {
    gapi.auth2.init({
      clientId: '694830871542-d8ggebospri9avtnpi995163epoe0d7d.apps.googleusercontent.com',
      plugin_name: "chat",
      // scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    })
  })
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const classes = useStyles()
  const [isSignup, setIsSignUp] = useState(false)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signUp(formData, navigate))
    } else {
      dispatch(signIn(formData, navigate))
    }
  }
  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  const switchMode = () => {
    setIsSignUp(!isSignup)
  }
  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure = (err) => {
    console.log(err);
    console.log("Google sign in unsuccessfully. Try again");
  }
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup &&
              <>
                <Input name='firstName' type='text' label='First name' onChange={handleChange} autoFocus half />
                <Input name='lastName' type='text' label='Last name' onChange={handleChange} half />
              </>
            }
            <Input name='email' label='Email' onChange={handleChange} type='email' />
            <Input name='password' label='Password' onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label='Confirm Password' onChange={handleChange} type={showConfirmPassword ? 'text' : 'password'} handleShowPassword={handleShowConfirmPassword} />}
          </Grid>
          <Button type='submit' onClick={handleSubmit} fullWidth variant='contained' color='primary' className={classes.submit}>
            {
              isSignup ? 'Sign up' : 'Sign in'
            }
          </Button>
          <GoogleLogin fullWidth
            clientId='694830871542-d8ggebospri9avtnpi995163epoe0d7d.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary'
                fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}
                startIcon={<Icon />} variant='contained'
              >Google Sign In</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Grid container justifyContent='flex-end'>
            <Grid>
              <Button onClick={switchMode}>{
                isSignup ? 'Already have an account? Sign in' :
                  "Don't have an account? Sign up"
              }</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth