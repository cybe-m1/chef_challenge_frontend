import type { NextPage } from 'next'
import cookie from "cookie"
import  axios  from "axios"

export async function getServerSideProps({req, query}: any) {
    const getCookie = cookie.parse(req.headers.cookie)

    if(getCookie.user.length > 2) {
      let pars = JSON.parse(getCookie.user)
      pars = JSON.parse(pars)
      
      try {
        const resp = await axios.get(
          "http://localhost:9998/user/" + pars
        );

        const Recipe = await axios.get(
            "http://localhost:9998/recipe/" + query.keyword
          );
  
        return {
          props: {
            user: await resp.data,
            Recipe: await Recipe.data,
            error: false
          },
        };
      } catch (error) {
        return {
          props: {
            user: '',
            Recipe: '',
            error: true
          },
        };
      }  
    } else {
        return {
          props: {
            user: '',
            Recipe: '',
            error: true
          },
        };
    }
  }

const recipe: NextPage = ({ user, Recipe, error } : any) => {
    if(user) {
        return (
            <div className="xl:h-full flex flex-col md:w-1/2 md:m-auto md:inset-60">
                <div className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4">
                    <div className="text-center ml-5 mr-5 mb-5">
                        <img className="mt-5 rounded mx-auto" src={Recipe.url} alt="Photo de profile" width="384em" height="512em"/>
                        <h1>{Recipe.name}</h1>
                    </div>
                    <div>
                        <p>{Recipe.description}</p>
                    </div>
                </div>
            </div>
          )
    } else {
        return (
            <div className='flex flex-row justify-around flex-grow'>
              <div className='flex flex-col w-2/5'>
                Il faut se connecter
              </div>
            </div>
          )
    }

}

export default recipe;