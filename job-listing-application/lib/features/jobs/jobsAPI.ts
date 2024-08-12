import JobPost from "@/lib/types/jobPost"

export const getAllJobs = async () => {
    
    const response = await fetch("https://akil-backend.onrender.com/opportunities/search")
    
    if (response.status == 200){
        const result : {data: JobPost[]} = await response.json()
        return result.data
    }

    const error = await response.json()
    throw new Error(error.message)
    
}

export const getJobById = async (id: string) => {
    const response = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`)
    if (response.status == 200){
        const result : {data: JobPost} = await response.json()
        return result.data
    }
    const error = await response.json()
    throw new Error(error.message)
}