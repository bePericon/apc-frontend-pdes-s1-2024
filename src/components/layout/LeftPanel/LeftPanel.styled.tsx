import styled from 'styled-components'

export const StyledContainer = styled.div<{ closeWidth: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${({ closeWidth }) => (closeWidth ? 'auto' : '268px')};
    height: 100%;
    min-width: 76px;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.neutral[100]};
    box-shadow: ${({ theme }) => theme.boxShadows.whiteM};    
`

export const StyledHeaderLeftPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 12px;
    padding: 8px 8px 0;
`

export const StyledNavigationLeftPanel = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
`

export const StyledNavigationItem = styled.div`
    padding: 8px 8px 8px 8px;
    width: 100%;
    border-radius: 8px;

    &.focused {
        background-color: ${({ theme }) => theme.colors.violet[200]};
    }

    a {
        padding: 0px;
    }
`

export const StyledItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const StyledButton = styled.div`
    cursor: pointer;
    padding: 0px;
`
