import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import useStyles from './styles'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import PostDetail from './components/PostDetail/PostDetail'

function App() {
  const classes = useStyles()
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem('profile')))
  }, [])
  return (
    <Router>
      <Container maxwidth="xl" className={classes.container}>
        <Navbar setUserId={setUserId} />
        <Routes>
          {/* <Route exact path='/' element={<Home />} /> */}
          <Route
            exact path="/"
            element={<Navigate to="/posts" replace />}
          />
          <Route exact path='/posts' element={<Home />} />
          <Route exact path='/posts/search' element={<Home />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          {!userId && <Route exact path='/auth' element={<Auth />} />}
          <Route path='*' element={<Navigate to='/' replace />} />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
