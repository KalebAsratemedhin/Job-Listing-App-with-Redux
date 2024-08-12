import { Action } from './../../../node_modules/redux/src/types/actions';
import { getAllJobs, getJobById } from './jobsAPI';
import JobPost from "../../types/jobPost";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '@/lib/store';



export interface JobsSliceState {
    posts: JobPost[] | null;
    status: "idle" | "loading" | "failed" ;
    currPost: JobPost | null;
    error: string | null
  }
  
const initialState: JobsSliceState = {
    posts: null,
    status: 'idle',
    currPost: null,
    error: null
}

export const getAllJobsAsync = createAsyncThunk(
    'jobs/getAllJobs',
    async () => {
      const response = await getAllJobs()
      return response
    }
  )

export const getJobByIdAsync = createAsyncThunk(
    'jobs/getById',
    async (id: string) => {
        const response = await getJobById(id)
        return response

    }
)


export const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllJobsAsync.pending, state => {
            state.status = 'loading'})
            
        .addCase(getAllJobsAsync.fulfilled, (state, action) => {
            state.posts = action.payload
            state.status = 'idle'
        })
        .addCase(getAllJobsAsync.rejected, (state, action) => {
            state.status = 'failed'
            if (action.error.message)
                state.error = action.error.message
        })
        .addCase(getJobByIdAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getJobByIdAsync.fulfilled, (state, action) => {
            state.currPost = action.payload
            state.status = 'idle'
        })
        .addCase(getJobByIdAsync.rejected, (state, action) => {
            state.status = "failed"
            if (action.error.message)
                state.error = action.error.message
        })

    }
})


export const selectPosts = (state: RootState) => state.jobs.posts
export const selectCurrPost = (state: RootState) => state.jobs.currPost
export const selectPostState = (state: RootState) => state.jobs

export default jobsSlice.reducer