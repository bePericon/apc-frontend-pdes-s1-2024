import { Typography } from '@mui/material'
import styled, { css } from 'styled-components'

export const StyledSkeletonInfoContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
`

export const StyledTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const StyledTypographyTitle = styled(Typography)`
    font-size: 2rem !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                font-size: 1.1rem !important;
                line-height: 1.1 !important;
            }
        `
    }}
`

export const StyledSkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                flex-direction: column;
                width: 200px;
            }
        `
    }}
`

export const StyledInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                width: 200px;
            }
        `
    }}
`

export const StyledInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StyledPurchaseSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const StyledPurchaseInnerSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

export const StyledPurchaseButtonContainer = styled.div`
    display: flex;
    margin-top: 8px;
    justify-content: flex-end;
`
