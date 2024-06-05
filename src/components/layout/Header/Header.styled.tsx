import styled, { css } from 'styled-components'

export const StyledHeaderContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 48px 32px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                height: 84px;
                padding: 24px 16px;
            }
        `
    }}
`

export const StyledNavbarMobileContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`

export const StyledDesktopLogo = styled.div`
    display: block;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                display: none;
            }
        `
    }}
`

export const StyledMobileLogo = styled.div`
    display: none;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                display: block;
            }
        `
    }}
`

export const StyledMobileLogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`

export const StyledMiCuenta = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`

export const StyledIconMiCuenta = styled.div`
    width: 36px;
    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 1000px;
    border: solid 1px black;
    margin-right: 10px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                margin-right: 0;
            }
        `
    }}
`

export const StyledTextMiCuenta = styled.div`
    display: block;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 0.14px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                display: none;
            }
        `
    }}
`
