import styled, { css } from 'styled-components'

export const StyledFavoritesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

export const StyledPaginationContainer = styled.div`
    display: flex;
    padding: 24px 0 24px;
`

export const StyledColumnItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 24px;
    padding: 20px 0 20px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                flex-direction: column;
                gap: 16px;
            }
        `
    }}
`
