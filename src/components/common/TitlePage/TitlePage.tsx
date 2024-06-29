import { StyledContainer, StyledSubTitle, StyledTitle } from './TitlePage.styled'

const TitlePage = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <StyledContainer>
            <StyledTitle>{title}</StyledTitle>
            <StyledSubTitle>{subtitle}</StyledSubTitle>
        </StyledContainer>
    )
}

export default TitlePage
