import styled, { css } from 'styled-components'

export const StyledImageContainer = styled.div`
    display: flex;
    justify-content: center;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                width: 200px;
            }
        `
    }}
`
