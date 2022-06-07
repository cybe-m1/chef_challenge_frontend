import MainNavbarItem from "./MainNavbarItem"
import NavbarItem, { NavbarItemIterface } from "./NavbarItem"
import styles from '/styles/Home.module.css'
import cookie from "cookie"
import  axios  from "axios"

interface NavbarInterface {
    mainitem: NavbarItemIterface
    items: NavbarItemIterface[]
}

export async function getServerSideProps({req}: any) {
    const getCookie = cookie.parse(req.headers.cookie)
    if(getCookie.user.length > 2) {
      let pars = JSON.parse(getCookie.user)
      pars = JSON.parse(pars)
      console.log('test')

      const resp = await axios.get(
        "http://localhost:9998/user/" + pars
      );

      return {
        props: {
          user: await resp.data,
        },
      };
    } else {
      return {
        props: {
          user: undefined,
        },
      };
    }
}

const Navbar = ({mainitem, items}: NavbarInterface, { user } : any) : JSX.Element => {
    if(!user) {
        return (
            <div>
                <nav className="flex mb-3 ml-6 mr-5 items-stretch flex-row typoColor">
                    <div>
                        {JSON.stringify(user)}
                        {mainitem != undefined ? <MainNavbarItem link={mainitem.link} label={mainitem.label} /> : null}
                    </div>
                    <div className="flex flex-row grow ml-5 items-center mt-2">
                        {items.map((item) => (<NavbarItem key={item.link} link={item.link} label={item.label}/>))}
                    </div> 
                    <div className="flex flex-row ml-5 items-center mt-2">
                        <NavbarItem key="/login" link="/login" label="Se connecter"/>
                    </div> 
                </nav>
            </div>
        )
    } else {
        return (
            <div>
                <nav className="flex mb-3 ml-6 mr-5 items-stretch flex-row typoColor">
                    <div>
                        {JSON.stringify(user)}
                        {mainitem != undefined ? <MainNavbarItem link={mainitem.link} label={mainitem.label} /> : null}
                    </div>
                    <div className="flex flex-row grow ml-5 items-center mt-2">
                        {items.map((item) => (<NavbarItem key={item.link} link={item.link} label={item.label}/>))}
                    </div> 
                    <div className="flex flex-row ml-5 items-center mt-2">
                        <button className=" m-auto backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Déconnexion
                        </button>
                    </div> 
                </nav>
            </div>
        )
    }
    
}

export default Navbar;