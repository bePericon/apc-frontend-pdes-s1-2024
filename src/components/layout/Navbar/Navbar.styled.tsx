import { Typography } from "@mui/material";
import styled, { css } from "styled-components";


export const StyledNavbarContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 24px;
    padding: 8px 0 8px;
    font-size: 1rem;
    margin-left: 32px;

    a:hover {
        color: #1976d2;
    }

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                justify-content: space-around;
                margin-left: 0;
                padding: 8px 0 8px;
            }
        `
    }}
`

export const StyledTypography = styled(Typography)`
    font-size: 1.2rem !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                font-size: 1.1rem !important;
            }
        `
    }}
`