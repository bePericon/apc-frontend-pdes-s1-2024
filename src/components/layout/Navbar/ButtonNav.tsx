import Link from 'next/link'
import { StyledTypography } from './Navbar.styled'
import { usePathname } from 'next/navigation'

const ButtonNav = ({ href, text }: { href: string, text: string }) => {
    const pathname = usePathname()

    return (
        <Link href={href}>
            <StyledTypography className={pathname === href? 'selected' : ''}>{text}</StyledTypography>
        </Link>
    )
}

export default ButtonNav
