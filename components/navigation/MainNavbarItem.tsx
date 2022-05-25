import { NavbarItemIterface } from "./NavbarItem";
import Link from 'next/link'
import Image from 'next/image'
// import toque from '../public/toque_chef_2.png'

const MainNavbarItem = ({label, link = "#"}: NavbarItemIterface): JSX.Element => {
    return (
        <div>
            <Link href={link}>
                {/* <Image 
                    src={toque}
                    alt="La plus belle tocque du monde"
                    width='200'
                    height='300'
                /> */}
                <a className="typoToque">{label}</a>
            </Link>
        </div>
    )
}
export default MainNavbarItem;