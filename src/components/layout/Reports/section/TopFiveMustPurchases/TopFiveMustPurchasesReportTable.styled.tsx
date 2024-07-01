import styled, { css } from 'styled-components'
import { Typography } from '@mui/material'

export const StyledTableCellTextEmail = styled(Typography)`
    font-size: 14px !important;
    font-style: normal !important;
    line-height: 20x !important;
    color: grey;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                font-size: 14px !important;
            }
        `
    }}
`
