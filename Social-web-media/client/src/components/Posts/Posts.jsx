import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress, Card, Container } from '@material-ui/core'
import useStyles from './styles'
const Posts = ({ currentId, setCurrentId }) => {
  const classes = useStyles()
  const { posts, isLoading } = useSelector((state) => state.posts)

  if (!posts.length && !isLoading) return (
    <Container className={classes.container}>
      <Card className={classes.noPost} raised elevation={6}>No post</Card>
    </Container>
  )
  return (
    isLoading ? <CircularProgress /> :
      <Grid className={classes.mainContainer} container spacing={3}>
        {posts.map(post => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
  )
}

export default Posts