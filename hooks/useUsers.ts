import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useUsers = () => {
    // fetching all users from users route
    const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher)

    return { data, error, isLoading, mutate }
}

export default useUsers