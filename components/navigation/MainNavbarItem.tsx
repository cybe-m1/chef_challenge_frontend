import { NavbarItemIterface } from "./NavbarItem";
import Link from 'next/link'
import Image from 'next/image'
// import toque from '../public/toque_chef_2.png'

const MainNavbarItem = ({label, link = "#"}: NavbarItemIterface): JSX.Element => {
    return (
        <div className="flex flex-row">
            <div className="self-center">
            <Image
                src="/toque_chef_2.png"
                alt="Landscape picture"
                className="object-contain"
                width={50}
                height={50}
            />
            </div>
            <Link href={link}>
                <a className="typoToque">{label}</a>
            </Link>
        </div>
    )
}
export default MainNavbarItem;