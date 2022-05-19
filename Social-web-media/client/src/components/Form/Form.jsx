import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../action/posts'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
const Form = ({ currentId, setCurrentId }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({
    name: '', title: '',
    message: '', tags: [],
    selectFile: ''
  })
  const post = useSelector((state) => currentId ? state.posts.posts.find(p => p._id === currentId) : null)
  useEffect(() => {
    if (post && post.creator === user?.result?._id) setPostData({
      name: post.name, title: post.title,
      message: post.message, tags: post.tags,
      selectFile: post.selectFile
    })
    else setPostData({
      name: '', title: '',
      message: '', tags: [],
      selectFile: ''
    })
  }, [post])
  const dispatch = useDispatch()
  const classes = useStyles()
  const clearHandler = () => {
    // e.preventDefault()
    setCurrentId(null)
    setPostData({
      name: '', title: '',
      message: '', tags: [],
      selectFile: ''
    })
  }
  const handlerSubmit = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData, navigate))
    }
    clearHandler()
  }
  const inputHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value })
    // console.log(postData);
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please sign in to create your own cards and like other cards
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handlerSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField name="name" variant='outlined' label='Name' fullWidth value={postData.name} onChange={inputHandler} />
        <TextField name="title" variant='outlined' label='Title' fullWidth value={postData.title} onChange={inputHandler} />
        <TextField name="message" variant='outlined' label='Message' fullWidth value={postData.message} onChange={inputHandler} />
        <TextField name="tags" variant='outlined' label='Tags' fullWidth value={postData.tags.join(',')} onChange={(e) => {
          setPostData({ ...postData, tags: e.target.value.split(',').map(tag => tag.trim()) })
        }} />
        <div className={classes.fileInput}>
          <FileBase className='fileBase' type='file'
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectFile: base64 });
            }}
          />
        </div>
        <Button className={classes.buttonSubmit}
          variant='contained' color='primary' size='large'
          type='submit' fullWidth >Submit</Button>
        <Button className={classes.buttonSubmit}
          variant='contained' color='secondary' size='large'
          type='clear' onClick={clearHandler} fullWidth >Clear</Button>
      </form>

    </Paper>
  )
}

export default Form