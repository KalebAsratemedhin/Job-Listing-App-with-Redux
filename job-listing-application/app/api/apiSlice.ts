import JobPost from '@/app/types/JobPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com' }),
  endpoints: builder => ({
    getAllJobs: builder.query<{data: JobPost[]}, void>({
      query: () => '/opportunities/search'
    }),
    getJobById: builder.query<{data: JobPost}, string>({
      query: postId => `/opportunities/${postId}`,
    })    
  })
})

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery
} = apiSlice