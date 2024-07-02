import { TableContainer, Typography } from '@mui/material'
import styled from 'styled-components'
import { css } from 'styled-components'

export const StyledTableHeadText = styled(Typography)`
    font-size: 14px !important;
    color: #495057;
`

export const StyledTableCellText = styled(Typography)`
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: bold !important;
    line-height: 20x !important;
    color: #212529;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                font-size: 14px !important;
            }
        `
    }}
`

export const StyledTableContainer = styled(TableContainer)`
    background: #f8f9fa;
    border-radius: 16px;

    .MuiTableCell-root {
        border-bottom: solid 1px #6c757d;
    }
`

export const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 48px 8px;
`
