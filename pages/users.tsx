import { NextPage } from "next";
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

const UserPage: NextPage = ({ user } : any) => {
    const router = useRouter()

    if (user != '') {
      return (
        <div className="xl:h-full flex flex-col">
          <div className="text-center ml-5 mr-5 mb-5">
            <img className="mt-5 rounded mx-auto" src="https://i.kym-cdn.com/photos/images/facebook/001/370/962/2ac.jpg" alt="Photo de profile" width="384em" height="512em"/>
            <span className="font-bold">
              Pseudo : {user.pseudo}
            </span>
          </div>
          <div className="text-center flex-grow">
            <h1 className="text-center font-bold">Information personnel :</h1>
            <div className="flex flex-col mb-5">
              <span>Nom complet : {user.first_name} {user.last_name}</span>
              <span>Email : {user.email}</span>
            </div>
            <div className="mb-4">
              <button className="backgroundChefButton text-white mr-3 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                      type="button"
                      onClick={() => router.push('/modifyAccount')}
                      >Modifier le compte
              </button>
              <button className="backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                      type="button"
                      onClick={() => router.push('/destroyAccount')}
                      >Supprimer le compte
              </button>
            </div>
          </div>
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

export default UserPage