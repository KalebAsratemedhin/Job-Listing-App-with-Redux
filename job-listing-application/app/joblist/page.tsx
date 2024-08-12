"use client"
import JobCard from "../components/JobCard"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getAllJobsAsync, selectPosts, selectPostState } from "@/lib/features/jobs/jobsSlice"
import { useEffect } from "react"
import Spinner from "../components/Spinner"
import Error from "../components/Error"



const page = () => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectPosts)
    const postState = useAppSelector(selectPostState)
    

    useEffect(() => {
        if (!posts && postState.status == "idle"){
            dispatch(getAllJobsAsync())
        }
    }, [])

    if(postState.status == "loading")
        return <Spinner />
        
    if(postState.status == "failed")
        return <Error message={postState.error || "Something went Wrong! Try again later!"} />
        
    if(posts)
        return ( 
            <main className="pl-8 sm:pl-12 lg:pl-28 pr-10 sm:pr-20 lg:pr-72 py-16 ">
                <div className="flex justify-between">
                    <hgroup>
                        <h1 className="font-black text-3xl font-heading text-dark-blue">Opportunities</h1>
                        <h2 className="text-gray-500">Showing {posts.length} results</h2>
                    </hgroup>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-400 font-body font-medium">Sort by: </p>

                        <select className="bg-white w-36 focus:border-collapse font-body font-medium " name="sortby" id="choice">
                            <option defaultValue="most-relevant" value="most-relevant">Most relevant</option>
                            <option value="latest">Latest</option>
                            <option value="popular">Popular</option>
                        </select>

                    </div>
                </div>

                <section>
                    {posts.map((job) => <JobCard key={job.id} jobPost={job} />)}
                </section>
            </main>
        )

}

export default page