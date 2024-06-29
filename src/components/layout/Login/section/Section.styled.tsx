import { Typography } from '@mui/material'
import styled from 'styled-components'
import { css } from 'styled-components'

export const StyledTypography = styled(Typography)`
    font-size: 32px !important;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                font-size: 24px !important;
                line-height: 1 !important;
            }
        `
    }}
`

export const StyledLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`


export const StyledLabel = styled(Typography)`
    font-size: 16px !important;
`
