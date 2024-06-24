import { Typography } from '@mui/material'
import styled, { css } from 'styled-components'

export const StyledContainerSearch = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 48px 0 48px;
    gap: 32px;

    text-align: center;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                margin: 32px 0 32px;
                gap: 40px;
            }
        `
    }}
`

export const StyledHomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                text-align: center;
            }
        `
    }}
`

export const StyledPaginationContainer = styled.div`
    display: flex;
    padding: 24px 0 24px;
`

export const StyledTypography = styled(Typography)`
    font-size: 2.5rem !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                font-size: 1.8rem !important;
            }
        `
    }}
`
