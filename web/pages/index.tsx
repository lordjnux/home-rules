import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

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
        <button onClick={handleLogin}>Login with Google</button>
      </main>
    </div>
  )
}

export default Home