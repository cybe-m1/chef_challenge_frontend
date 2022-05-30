import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface Children {
    children?: React.ReactNode;
}

const Layout :React.FC<Children>= ({ children }) => {
    return (
        <div>
            <Head>
                <title>Chef Challenge</title>
                <meta name="description" content="Prove and improve your cooking skills" />
                <link rel="icon" href="/toque_chef_2.png" />
            </Head>
            <div className='flex flex-col h-screen'>
                <Header />
                
                <main className='p-4 flex-grow'>
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default Layout;