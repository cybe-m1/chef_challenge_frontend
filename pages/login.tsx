import { NextPage } from "next";
import Layout from '../components/layout/Layout'

const LoginPage: NextPage = () => {
    const connexion : React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) =>  {
        event.preventDefault();
        console.log('yrds')
        const username = null
        const password = null
        
        const endpoint = 'localhost:8081/api/user/username=' + username + '/password=' + password
    }
    return (
        <Layout>
            <div className="md:w-1/2 max-w-sm md:m-auto absolute md:inset-60">
                <form className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block typoColor text-sm font-bold mb-2">
                            Identifiant
                        </label>
                        <input id="username" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            placeholder="Identifiant"
                            required />
                        </div>
                        <div className="mb-6">
                        <label htmlFor="password" className="block typoColor text-sm font-bold mb-2">
                            Mot de passe
                        </label>
                        <input id="password" 
                            className='shadow appearance-none border rounded w-full py-2 px-3 typoColor mb-3 leading-tight focus:outline-none focus:shadow-outline' 
                            type="password" 
                            placeholder="******************"
                            required />
                        <p className="text-red-500 text-xs italic">Le mot de passe ou l'identifiant est faux !</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Connexion
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm typoColor ml-2" href="#">
                            Mot de passe oubliée ?
                        </a>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <button className=" m-auto backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Créé un compte
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default LoginPage