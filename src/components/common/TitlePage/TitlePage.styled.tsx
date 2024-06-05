import { Typography } from '@mui/material'
import styled from 'styled-components'
import { css } from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px 48px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                text-align: left;
                padding: 24px 20px;
            }
        `
    }}
`

export const StyledTitle = styled(Typography)`
    font-size: 32px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    letter-spacing: 0.14px !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                font-size: 24px !important;
                line-height: 24px !important;
            }
        `
    }}
`

export const StyledSubTitle = styled(Typography)`
    font-size: 16px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    letter-spacing: 0.14px !important;
    color: #495057;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                font-size: 14px !important;
            }
        `
    }}
`
