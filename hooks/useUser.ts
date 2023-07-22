import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useUser = (userId: string) => {
    // useUser is fetching a specific user by passing the userId to the users route
    // which the file [userId] is expecting from the query
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher)

    return { data, error, isLoading, mutate }
}

export default useUser