import styled, { css } from "styled-components";

export const StyledFavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledPaginationContainer = styled.div`
  padding: 24px 0 24px;
`;

export const StyledColumnItems = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
  padding: 20px 0 20px;

  ${({ theme }) => {
    return css`
      @media screen and (max-width: ${theme.breakpoints.m}) {
        flex-direction: column;
        gap: 16px;
      }
    `;
  }}
`;