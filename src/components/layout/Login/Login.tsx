import {
    StyledFormContainer,
    StyledForm,
    StyledPaper,
    StyledTitleTypography,
    StyledTitleContainer,
    StyledTabs,
    StyledTab,
} from './Login.styled'
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
        if (currentUser && isAdmin(currentUser.roles))
            router.replace('/apc/admin/reportes')
    }, [])

    return (
        <>
            <StyledTitleContainer>
                <StyledTitleTypography>Asesor Personal de Compras</StyledTitleTypography>
            </StyledTitleContainer>

            <StyledFormContainer>
                <StyledPaper sx={{ borderRadius: 4 }}>
                    <StyledTabs>
                        <StyledTab
                            className={currentTab === TabLogin.LOGIN ? 'selected' : ''}
                            onClick={() => setCurrentTab(TabLogin.LOGIN)}
                        >
                            LOGIN
                        </StyledTab>
                        <StyledTab
                            className={currentTab === TabLogin.SINGUP ? 'selected' : ''}
                            onClick={() => setCurrentTab(TabLogin.SINGUP)}
                        >
                            CREAR USUARIO
                        </StyledTab>
                    </StyledTabs>

                    <StyledForm>
                        {currentTab === TabLogin.LOGIN && <LoginSection />}
                        {currentTab === TabLogin.SINGUP && <SignUpSection />}
                    </StyledForm>
                </StyledPaper>
            </StyledFormContainer>
        </>
    )
}

export default Login
