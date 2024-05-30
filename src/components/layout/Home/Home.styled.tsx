import styled, { css } from "styled-components";

export const StyledContainerSearch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 48px 0 48px;
  gap: 32px;

  ${({ theme }) => {
    return css`
      @media screen and (max-width: ${theme.breakpoints.s}) {
        margin: 32px 0 32px;
        gap: 40px;
      }
    `;
  }}
`;

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledPaginationContainer = styled.div`
  padding: 24px 0 24px;
`;