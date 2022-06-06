import { NextPage } from "next";
import { useRouter } from 'next/router'
import cookie from "cookie"
import Cookie from "js-cookie"
import axios from "axios"

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

const DestroyAccount: NextPage = ({ user } : any) => {
    const router = useRouter()

    const destroyAccount = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>  {
      event.preventDefault()
      console.log(event)
      
      const endpoint = 'http://localhost:8082/user/' + user.id_user

      try {
          const data = await axios.delete(endpoint)
          Cookie.set("user", "{}")
          if(data.status === 200) {
              router.push('/')
          }
      } catch (error) {
          console.log(error)
      }
      
  }
    return (
      <div className="xl:h-full flex flex-col md:w-1/2 md:m-auto md:inset-60">
        <div className="text-center ml-5 mr-5 mb-5">
          <div className="mb-4">
            <h1>Êtes vous sur de vouloir détruire votre compte ? cette opération est irréversible !</h1>
            <button className="bg-red-600 text-white mr-3 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => destroyAccount}>Oui</button>
            <button className="backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => router.push('/')}>Non</button>
          </div>
        </div>
      </div>
    )
}

export default DestroyAccount