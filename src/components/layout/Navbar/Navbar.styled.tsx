import { Typography } from '@mui/material'
import styled, { css } from 'styled-components'

export const StyledNavbarContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 24px;
    padding: 8px 0 8px;
    font-size: 1rem;
    margin-left: 32px;

    ${({ theme }) => {
        return css`
            @media screen and (max-width: ${theme.breakpoints.xxs}) {
                justify-content: center;
                margin-left: 0;
                padding: 8px 0 8px;
            }
        `
    }}
`

export const StyledTypography = styled(Typography)`
    font-size: 1rem !important;
    padding: 0.4rem 0.5rem;
    border-radius: 4px;
    
    &&:hover {
        background: #f4d35e;
    }

    &.selected {
        font-weight: bold;
        background: #f4d35e;
    }
`