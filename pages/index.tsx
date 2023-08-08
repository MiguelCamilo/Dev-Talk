import Head from 'next/head'
import Header from '@/components/Header'
import Form from '@/components/Form'
import PostFeed from '@/components/posts/PostFeed'

export default function Home() {
  return (
    <>
      {/* head tag */}
      <Head>
        <title>DevLink</title>
        <meta name='description' content='Connecting the Tech Community with DevLink 🤝' />
      </Head>
      <Header label='Home' />
      <Form placeholder="What's on your mind?" />
      <PostFeed />
    </>
  )
}
