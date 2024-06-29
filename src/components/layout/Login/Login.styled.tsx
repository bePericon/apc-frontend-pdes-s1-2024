import { Paper, Typography } from '@mui/material'
import styled, { css } from 'styled-components'

export const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 32px;
    padding: 4px 0 32px;
    background: #f8f9fa;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                text-align: center;
                padding: 8px 0 32px;
            }
        `
    }}
`

export const StyledFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 32px;
    padding: 48px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                text-align: center;
                padding: 32px 0;
            }
        `
    }}
`

export const StyledTitleTypography = styled(Typography)`
    font-size: 32px !important;
    font-style: normal !important;
    font-weight: bold !important;
    color: #212529;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                font-size: 24px !important;
                line-height: 1 !important;
            }
        `
    }}
`

export const StyledPaper = styled(Paper)`
    elevation: 4;
    width: 450px;
    height: 560px;
    background: #f8f9fa !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                width: 100%;
                height: 530px;
            }
        `
    }}
`

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: center;
    padding: 32px;
    border-radius: 16px;
    background: #f8f9fa;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                padding: 24px;
            }
        `
    }}
`

export const StyledTabs = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 8px;
    background: #faf0ca;
    margin: 32px 32px 0;
    padding: 6px 0;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
            }
        `
    }}
`

export const StyledTab = styled(Typography)`
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 20x !important;

    cursor: pointer;
    padding: 4px 8px;
    border-radius: 8px;

    &.selected {
        font-weight: bold !important;
        background: #f4d35e;
    }

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
            }
        `
    }}
`
