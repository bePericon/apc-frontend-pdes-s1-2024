import { useWidth } from '@hooks/useWidth'
import {
    StyledButton,
    StyledContainer,
    StyledHeaderLeftPanel,
    StyledItem,
    StyledNavigationItem,
    StyledNavigationLeftPanel,
} from './LeftPanel.styled'
import {
    MenuIcon,
    CloseIcon,
    DocumentIcon,
    ChatIcon,
    Divider,
    Strong,
    TextBody,
} from '@fravega-it/bumeran-ds-fvg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface LeftPanelProps {
    onClose?: () => void
}

const LeftPanel = ({ onClose }: LeftPanelProps) => {
    const [isClose, setIsClose] = useState(false)
    const router = useRouter()
    const isCreateConsult = () => router.route === '/'
    const isStatusConsult = () => router.route.match(/^\/consulta-de-estados/) !== null
    const getColor = (isSelected: boolean) => (isSelected ? 'violet' : 'neutral')

    const handleOnClose = () => {
        if (onClose) onClose()
        else setIsClose(true)
    }

    return (
        <StyledContainer closeWidth={isClose}>
            <StyledHeaderLeftPanel>
                {isClose && (
                    <StyledButton onClick={() => setIsClose(false)}>
                        <MenuIcon size="l" color="neutral" colorTone="500" />
                    </StyledButton>
                )}
                {!isClose && (
                    <CloseIcon
                        size="l"
                        color="neutral"
                        colorTone="500"
                        onClick={handleOnClose}
                    />
                )}
                <Divider />
            </StyledHeaderLeftPanel>

            <StyledNavigationLeftPanel>
                <StyledNavigationItem className={`${isCreateConsult() ? 'focused' : ''}`}>
                    <Link href={`/`} onClick={onClose}>
                        <StyledItem>
                            <DocumentIcon
                                size="l"
                                color={getColor(isCreateConsult())}
                                colorTone="500"
                            />
                            {!isClose && (
                                <TextBody
                                    size="m"
                                    color={getColor(isCreateConsult())}
                                    colorTone={500}
                                >
                                    <Strong>Iniciar una consulta</Strong>
                                </TextBody>
                            )}
                        </StyledItem>
                    </Link>
                </StyledNavigationItem>

                <StyledNavigationItem className={`${isStatusConsult() ? 'focused' : ''}`}>
                    <Link href={`/consulta-de-estados`} onClick={onClose}>
                        <StyledItem>
                            <ChatIcon
                                size="l"
                                color={getColor(isStatusConsult())}
                                colorTone="500"
                            />
                            {!isClose && (
                                <TextBody
                                    size="m"
                                    color={getColor(isStatusConsult())}
                                    colorTone={500}
                                >
                                    <Strong>Consultar una gestión</Strong>
                                </TextBody>
                            )}
                        </StyledItem>
                    </Link>
                </StyledNavigationItem>
            </StyledNavigationLeftPanel>
        </StyledContainer>
    )
}

export default LeftPanel
