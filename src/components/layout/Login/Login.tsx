import { Tab, Tabs } from '@mui/material'
import { StyledContainer, StyledForm, StyledPaper, StyledTypography } from './Login.styled'
import { useEffect, useState } from 'react'
import LoginSection from './section/LoginSection'
import SignUpSection from './section/SignUpSection'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { isAdmin, isPurchaser } from '@/utils/roles'

enum TabLogin {
    LOGIN = 0,
    SINGUP = 1,
}

const Login = () => {
    const [currentTab, setCurrentTab] = useState<TabLogin>(TabLogin.LOGIN)
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const router = useRouter()

    useEffect(() => {
        if (currentUser && isPurchaser(currentUser.roles)) router.replace('/apc')
        if (currentUser && isAdmin(currentUser.roles)) router.replace('/apc/admin/reportes')
    }, [])

    return (
        <StyledContainer>
            <StyledTypography>Asesor Personal de Compras</StyledTypography>
            <StyledPaper>
                <Tabs
                    value={currentTab}
                    onChange={(_: any, value: number) => setCurrentTab(value)}
                    centered
                >
                    <Tab label="INICIAR SESIÓN" />
                    <Tab label="REGISTRARSE" />
                </Tabs>

                <StyledForm>
                    {currentTab === TabLogin.LOGIN && <LoginSection />}
                    {currentTab === TabLogin.SINGUP && <SignUpSection />}
                </StyledForm>
            </StyledPaper>
        </StyledContainer>
    )
}

export default Login
