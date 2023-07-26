import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'

    // userPost is fetching a specific user by passing the userId to the users route
    // which the file [userId] is expecting from the query
    const { data, error, isLoading, mutate } = useSWR(url, fetcher)

    return { data, error, isLoading, mutate }
}

export default usePosts