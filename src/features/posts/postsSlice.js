import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postAdapter.getInitialState({
    status: 'idle',
    error: null, 
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
        const response = await axios.get(POSTS_URL)
        return response.data;
    } catch (err){
        return err.message
    }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async ( initialPost) => {
    try{
        const response = await axios.post(POSTS_URL, initialPost)
        return response.data;
    } catch (err){
        return err.message
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try{
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch(err){
        return initialPost;
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try{
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if(response?.status === 200) return initialPost;
        return `${response?.status} : ${response?.statusText}`
    } catch(err){
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action){
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++}).toISOString() 
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post;
            });
            postAdapter.upsertMany(state, loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error =  action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
            console.log(action.payload)
            postAdapter.addOne(state, action.payload)
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            if(!action.payload?.id){
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            action.payload.date = new Date().toISOString();
            postAdapter.upsertOne(state, action.payload)
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            if(!action.payload?.id){
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            postAdapter.removeOne(state, id)
        })
    }
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => state.posts)

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostsByUser = createSelector(
    [ selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;