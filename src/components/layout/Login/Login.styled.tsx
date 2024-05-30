import { Paper, Typography } from '@mui/material'
import styled, { css } from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 32px;
    width: 100vw;
    height: 100vh;
    padding: 48px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                text-align: center;
                padding: 32px;
            }
        `
    }}
`

export const StyledTypography = styled(Typography)`
    font-size: 3rem !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                font-size: 2rem !important;
                line-height: 1 !important;
            }
        `
    }}
`

export const StyledPaper = styled(Paper)`
    elevation: 4;
    width: 450px;
    height: 490px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                width: auto;
            }
        `
    }}
`

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    text-align: center;
    padding: 32px;
    border-radius: 16px;
    background: white;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                gap: 16px;
                padding: 24px;
            }
        `
    }}
`
