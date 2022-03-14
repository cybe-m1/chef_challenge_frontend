import Link from 'next/link'

type NavbarItemIterface = {
    label: string,
    link: string
}

const NavbarItem = ({label, link = "/"}: NavbarItemIterface): JSX.Element => {
    return (
        <Link href={link}>
            <a>{label}</a>
        </Link>
    )
}

export type {NavbarItemIterface};
export default NavbarItem;