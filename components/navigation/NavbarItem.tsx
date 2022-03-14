import Link from 'next/link'
import styles from '/styles/Home.module.css'

type NavbarItemIterface = {
    label: string,
    link: string
}

const NavbarItem = ({label, link = "/"}: NavbarItemIterface): JSX.Element => {
    return (
        <div>
            <Link href={link}>
                <a>{label}</a>
            </Link>
        </div>
    )
}

export type {NavbarItemIterface};
export default NavbarItem;