import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home Rules</title>
        <meta name="description" content="Family management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Home Rules
        </h1>
        <p>Admin panel and family dashboard</p>
      </main>
    </div>
  )
}

export default Home