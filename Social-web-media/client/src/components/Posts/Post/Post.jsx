import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { deletePost, likePost } from '../../../action/posts'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
const Post = ({ post, currentId, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes)
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) || null)
  const userId = user?.result?.googleId || user?.result?._id
  const deleteHandler = () => {
    dispatch(deletePost(post._id))
  }
  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')) || null)
  }, [location])

  const likeHandler = async () => {
    dispatch(likePost(post._id))
    if (post.likes.find((like) => like === userId)) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId])
    }
  }
  return (
    <Card className={classes.card} elevation={6}>

      <div className={classes.containerBtnBase}>
        <div>
          <CardMedia className={classes.media} image={post.selectFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small" onClick={() => { !currentId || currentId !== post._id ? setCurrentId(post._id) : setCurrentId(null) }}>
              <MoreHorizIcon fontSize="small" />
            </Button>
          </div>
          <div className={classes.cardAction} onClick={openPost}>
            <div className={classes.watchMore}>Watch More</div>
            <div className={classes.detailContainer}>
              <div>
                <div className={classes.details}>
                  <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag.trim()} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent className={classes.cardMessage}>
                  <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div>
        <CardActions className={classes.cardActions}>
          <Button disabled={!user?.result} size="small" color="primary" onClick={likeHandler}>
            <ThumbUpAltIcon fontSize="small" /> Like {likes.length}
          </Button>
          {(user?.result._id === post?.creator || user?.result.googleId === post?.creator) &&
            <Button size="small" color="primary" onClick={deleteHandler}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          }
        </CardActions>
      </div>
    </Card>
  )
}

export default Post