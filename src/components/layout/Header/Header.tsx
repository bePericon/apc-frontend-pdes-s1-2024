import { FC } from 'react'
import {
    StyledHeaderContainer,
    StyledMiCuenta,
    StyledIconMiCuenta,
    StyledDesktopLogo,
    StyledTextMiCuenta,
    StyledMobileLogo,
    StyledMobileLogoContainer,
} from './Header.styled'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logoML from '../../../../public/svg/logoML.svg'
import Image from 'next/image'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import PersonIcon from '@mui/icons-material/Person'
import LoginService from '@/service/login.service'

const Header: FC = () => {
    // const currentTitle = useSelector(
    //   (state: RootState) => state.navigation.title
    // );
    const router = useRouter()
    const pathname = usePathname()
    const isHome = pathname === '/apc'

    return (
        <StyledHeaderContainer>
            {isHome && (
                <Link href="/">
                    <Image priority src={logoML} width={56} alt="Logo ML" />
                </Link>
            )}
            {!isHome && (
                <>
                    <StyledDesktopLogo>
                        <Link href="/">
                            <Image priority src={logoML} width={56} alt="Logo ML" />
                        </Link>
                    </StyledDesktopLogo>
                    <StyledMobileLogo>
                        <StyledMobileLogoContainer>
                            <div
                                style={{ width: 28, height: 28, cursor: 'pointer' }}
                                onClick={() => router.back()}
                            >
                                <ArrowBackIcon />
                            </div>
                            <Link href="/">
                                <Image priority src={logoML} width={56} alt="Logo ML" />
                            </Link>
                        </StyledMobileLogoContainer>
                    </StyledMobileLogo>
                </>
            )}

            <StyledMiCuenta>
                <Link href="#" target="_blank" style={{ padding: 0 }}>
                    <StyledIconMiCuenta>
                        <PersonIcon />
                    </StyledIconMiCuenta>
                </Link>
                <StyledTextMiCuenta
                    onClick={() => {
                        LoginService.logout()
                        router.replace('/')
                    }}
                >
                    Cerrar sesión
                </StyledTextMiCuenta>
            </StyledMiCuenta>
        </StyledHeaderContainer>
    )
}

export default Header
