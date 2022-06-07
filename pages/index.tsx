import type { NextPage } from 'next'
import Cookie from "js-cookie"
import cookie from "cookie"
import  axios  from "axios"

export async function getServerSideProps({req}: any) {
  const getCookie = cookie.parse(req.headers.cookie)
    if(getCookie.user.length > 2) {
      let pars = JSON.parse(getCookie.user)
      pars = JSON.parse(pars)
      
      try {
        const resp = await axios.get(
          "http://localhost:9998/user/" + pars
        );
  
        return {
          props: {
            user: await resp.data,
            error: false
          },
        };
      } catch (error) {
        return {
          props: {
            user: '',
            Ingredients: '',
            error: true
          },
        };
      }  
    } else {
      Cookie.set("user", "{}")
      return {
        props: {
          user: '',
          error: false
        },
      };
    }
  }

const Home: NextPage = ({ user, error } : any) => {
  return (
    <div>
      tesdfsddf
    </div>
  )
}

export default Home;
