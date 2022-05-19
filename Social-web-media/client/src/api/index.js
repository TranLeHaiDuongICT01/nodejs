import axios from 'axios'
const url = 'https://social-app-memmories.herokuapp.com'

const API = axios.create({ baseURL: url })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

export const fetchPost = (id) => API.get(`/posts/${id}`)

export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)

export const createPost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, post) => API.patch(`/posts/${id}`, post)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signin = (formData) => API.post('/users/signin', formData)

export const signup = (formData) => API.post('/users/signup', formData)

export const comment = (comment, id) => API.post(`/posts/${id}/commentPost`, { value: comment })