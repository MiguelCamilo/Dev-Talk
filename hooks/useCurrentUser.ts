import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useCurrentUser = () => {
    // useCurrentUser is fetching the currentUser by sending the 'url' to the fetcher lib we created
    // then caches it and won't refetch if data exist
    const { data, error, isLoading, mutate } = useSWR('/api/currentuser', fetcher)

    return { 
        data, 
        error, 
        isLoading, 
        mutate 
    }
}

export default useCurrentUser
