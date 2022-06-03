import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Cookie from "js-cookie"
import  axios  from "axios"

const LoginPage: NextPage = () => { 
    const router = useRouter()

    const [state, setState] = useState({
        username: "",
        password: "",
        wrong: false
    })

    const [remember, setRemember] = useState({})
    useEffect(() => {
        Cookie.set("user", JSON.stringify(remember))
    }, [remember])
    
    const connexion : React.FormEventHandler<HTMLFormElement> = async (event) =>  {
        event.preventDefault()
        console.log(state)
        const form = {
            username: state.username,
            password: state.password
        }
        
        const endpoint = 'http://localhost:8082/user/connexion'

        try {
            const data = await axios.post(endpoint, form)
            setRemember(JSON.stringify(data.data));
            if(data.status === 200) {
                router.push('/')
            }
        } catch (error) {
            setState({...state, wrong : true})
            let contenuPage = document.getElementById('error');
            const contenu = '<p class="text-red-500 text-xs italic">Le mot de passe ou identifiant faux !</p>'
            contenuPage!.innerHTML = contenu
        }
        
    }

    return (
            <div className="md:w-1/2 max-w-sm md:m-auto absolute md:inset-60">
                <form className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4" onSubmit={connexion}>
                    <div id="connexion" className="mb-4">
                        <label htmlFor="username" className="block typoColor text-sm font-bold mb-2">
                            Identifiant
                        </label>
                        <input id="username" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            placeholder="Identifiant"
                            value={state.username}
                            onChange={event => setState({...state, username : event.target.value})}
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
                            value={state.password}
                            onChange={event => setState({...state, password : event.target.value})}
                            required />
                        <div id="error"></div>
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
    )
}

export default LoginPage