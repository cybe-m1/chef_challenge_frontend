import { NextPage } from "next";
import { useState } from "react";
import cookie from "cookie"
import axios from "axios"
import { useRouter } from 'next/router'

export async function getServerSideProps({req}: any) {
    const getCookie = cookie.parse(req.headers.cookie)
    if(getCookie.user.length > 2) {
      let pars = JSON.parse(getCookie.user)
      pars = JSON.parse(pars)

      const resp = await axios.get(
        "http://localhost:8082/user/" + pars
      );

      return {
        props: {
          user: await resp.data,
        },
      };
    } else {
      return {
        props: {
          user: '',
        },
      };
    }
}

const ModifyAccount: NextPage = ({ user } : any) => {
    const router = useRouter()
    const [state, setState] = useState({
        id_user: user.id_user,
        pseudo: user.pseudo,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    })

    const modifyProfile : React.FormEventHandler<HTMLFormElement> = async (event) =>  {
        event.preventDefault()
        const form = state
        
        const endpoint = 'http://localhost:8082/user'

        try {
            const data = await axios.put(endpoint, form)
            if(data.status === 200) {
                router.push('/users')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    if (user != '') {
      return (
        <div className="xl:h-full flex flex-col md:w-1/2 md:m-auto md:inset-60">
            <form className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4" onSubmit={modifyProfile}>
                <div className="text-center ml-5 mr-5 mb-5">
                    <img className="mt-5 rounded mx-auto" src="https://i.kym-cdn.com/photos/images/facebook/001/370/962/2ac.jpg" alt="Photo de profile" width="384em" height="512em"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block typoColor text-sm font-bold mb-2">
                        Pseudo
                    </label>
                    <input id="username" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Pseudo"
                        value={state.pseudo}
                        onChange={event => setState({...state, pseudo : event.target.value})}
                        required />
                </div>
                <div className="mb-4 flex flex-row justify-around">
                    <div>
                        <label htmlFor="first_name" className="block typoColor text-sm font-bold mb-2">
                            Prénom
                        </label>
                        <input id="first_name" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            placeholder="first_name"
                            value={state.first_name}
                            onChange={event => setState({...state, first_name : event.target.value})}
                            required />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block typoColor text-sm font-bold mb-2">
                            Nom
                        </label>
                        <input id="last_name" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            placeholder="last_name"
                            value={state.last_name}
                            onChange={event => setState({...state, last_name : event.target.value})}
                            required />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block typoColor text-sm font-bold mb-2">
                        Email
                    </label>
                    <input id="email" 
                        className='shadow appearance-none border rounded w-full py-2 px-3 typoColor mb-3 leading-tight focus:outline-none focus:shadow-outline' 
                        type="email" 
                        placeholder="******************"
                        value={state.email}
                        onChange={event => setState({...state, email : event.target.value})}
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
                </div>
                <div className="flex items-center justify-between mt-3">
                    <button className=" m-auto backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Modifier
                    </button>
                </div>
            </form>
        </div>
      )
    } else {
      return (
        <div>
          Veuillez aller vous connectez
        </div>
      )
    }
}

export default ModifyAccount