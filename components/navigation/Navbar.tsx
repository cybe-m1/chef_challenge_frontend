import MainNavbarItem from "./MainNavbarItem"
import NavbarItem, { NavbarItemIterface } from "./NavbarItem"
import styles from '/styles/Home.module.css'

interface NavbarInterface {
    mainitem: NavbarItemIterface
    items: NavbarItemIterface[]
}

const Navbar = ({mainitem, items}: NavbarInterface) : JSX.Element => {
    return (
        <div>
            <nav className="flex mb-3 ml-6 mr-5 flex-row typoColor">
                <div>
                    {mainitem != undefined ? <MainNavbarItem link={mainitem.link} label={mainitem.label} /> : null}
                </div>
                <div className="flex flex-row ml-5 items-center mt-2">
                    {items.map((item) => (<NavbarItem key={item.link} link={item.link} label={item.label}/>))}
                </div> 
            </nav>
        </div>
    )
}

export default Navbar;