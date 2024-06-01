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
            @media screen and (max-width: ${theme.breakpoints.s}) {
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
    align-items: center;
    gap: 24px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                flex-direction: column;
                width: 200px;
            }
        `
    }}
`

export const StyledInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
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
