import * as api from "../api"
import { START_LOADING, COMMENT, FETCH_POST, END_LOADING, FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from '../constants/actionTypes'

export const getAllPosts = (page) => async (dispatch) => {

    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.fetchPosts(page)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data: { data } } = await api.fetchPostBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.createPost(post)
        navigate(`/posts/${data.post._id}`)
        dispatch({ type: CREATE, payload: data.post })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data.post })
    } catch (error) {

    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.deletePost(id)
        dispatch({ type: DELETE, payload: data.id })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: UPDATE, payload: data.post })
    } catch (error) {
        console.log(error);
    }
}

export const getPostById = (id) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: data.post })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(comment, id)
        dispatch({ type: COMMENT, payload: data.post })
        return data.post.comments
    } catch (error) {
        console.log(error);
    }
}