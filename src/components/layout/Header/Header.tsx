import { FC } from 'react'
import {
    StyledHeaderContainer,
    StyledMiCuenta,
    StyledIconMiCuenta,
    StyledDesktopLogo,
    StyledTextMiCuenta,
    StyledMobileLogo,
    StyledMobileLogoContainer,
    StyledNavbarMobileContainer,
} from './Header.styled'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logoML from '../../../../public/svg/logoML.svg'
import Image from 'next/image'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import PersonIcon from '@mui/icons-material/Person'
import LoginService from '@/service/login.service'
import { Typography } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import MediaQueryWrapper from '@/components/common/MediaQueryWrapper'

const Header: FC = () => {
    const router = useRouter()
    const pathname = usePathname()
    const isHome = pathname === '/apc'

    return (
        <>
            <StyledHeaderContainer>
                <div style={{ display: 'flex' }}>
                    {isHome && (
                        <Link href="/">
                            <Image priority src={logoML} width={56} alt="Logo ML" />
                        </Link>
                    )}
                    {!isHome && (
                        <>
                            <StyledDesktopLogo>
                                <Link href="/">
                                    <Image
                                        priority
                                        src={logoML}
                                        width={56}
                                        alt="Logo ML"
                                    />
                                </Link>
                            </StyledDesktopLogo>
                            <StyledMobileLogo>
                                <StyledMobileLogoContainer>
                                    <div
                                        style={{
                                            width: 28,
                                            height: 28,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => router.back()}
                                    >
                                        <ArrowBackIcon />
                                    </div>
                                    <Link href="/">
                                        <Image
                                            priority
                                            src={logoML}
                                            width={56}
                                            alt="Logo ML"
                                        />
                                    </Link>
                                </StyledMobileLogoContainer>
                            </StyledMobileLogo>
                        </>
                    )}
                    <MediaQueryWrapper visibleFor="desktop">
                        <Navbar />
                    </MediaQueryWrapper>
                </div>

                <StyledMiCuenta>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <StyledTextMiCuenta
                            onClick={() => {
                                LoginService.logout()
                                router.replace('/')
                            }}
                        >
                            <Typography>Cerrar sesión</Typography>
                        </StyledTextMiCuenta>

                        <StyledIconMiCuenta
                            onClick={() => {
                                LoginService.logout()
                                router.replace('/')
                            }}
                        >
                            <PersonIcon />
                        </StyledIconMiCuenta>
                    </div>
                </StyledMiCuenta>
            </StyledHeaderContainer>
            <MediaQueryWrapper visibleFor="mobile">
                <StyledNavbarMobileContainer>
                    <Navbar />
                </StyledNavbarMobileContainer>
            </MediaQueryWrapper>
        </>
    )
}

export default Header
