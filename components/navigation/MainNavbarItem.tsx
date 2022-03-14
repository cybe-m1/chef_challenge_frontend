import { NavbarItemIterface } from "./NavbarItem";
import Link from 'next/link'

const MainNavbarItem = ({label, link = "#"}: NavbarItemIterface): JSX.Element => {
    return (
        <Link href={link}>
            <a>{label}</a>
        </Link>
    )
}
export default MainNavbarItem;