import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navigation/Navbar'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chef Challenge</title>
        <meta name="description" content="Prove and improve your cooking skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='shadowNav'>
        <Navbar mainitem={{label: "Chef Challenge", link: "/"}} items = {[
          {label: "Receipes", link: "/receipes" },
          {label: "Challenges", link: "/challenges" },
          {label: "Ingredients", link: "/ingredients" },
          {label: "Profile", link: "/users" }
        ]} />
      </header>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home;
