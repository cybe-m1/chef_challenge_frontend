import type { NextPage } from 'next'
import Navbar from '../navigation/Navbar'

const Header : NextPage = () => {
    return (
        <header className='shadowNav'>
            <Navbar mainitem={{label: "Chef Challenge", link: "/"}} items = {[
                {label: "Recipes", link: "/recipes" },
                {label: "Challenges", link: "/challenges" },
                {label: "Ingredients", link: "/ingredients" },
                {label: "Profile", link: "/users" }
            ]} />
        </header>
    )
}

export default Header;