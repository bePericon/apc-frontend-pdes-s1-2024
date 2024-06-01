import { Typography } from "@mui/material"
import styled from "styled-components"
import { css } from "styled-components"


export const StyledTypography = styled(Typography)`
    font-size: 2.5rem !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.s}) {
                font-size: 2rem !important;
                line-height: 1 !important;
            }
        `
    }}
`