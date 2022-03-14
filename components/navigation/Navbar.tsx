import MainNavbarItem from "./MainNavbarItem"
import NavbarItem, { NavbarItemIterface } from "./NavbarItem"

interface NavbarInterface {
    mainitem: NavbarItemIterface
    items: NavbarItemIterface[]
}

const Navbar = ({mainitem, items}: NavbarInterface) : JSX.Element => {
    return (
        <div>
            <nav>
                {mainitem != undefined ? <MainNavbarItem link={mainitem.link} label={mainitem.label} /> : null}
                {items.map((item) => (<NavbarItem key={item.link} link={item.link} label={item.label}/>))}
            </nav>
        </div>
    )
}

export default Navbar;