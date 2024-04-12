import styled, { DefaultTheme, css } from "styled-components";

const mediaScreen = ({ theme }: { theme: DefaultTheme }) => {
  return css`
    @media screen and (max-width: ${theme.breakpoints.m}) {
      width: ${({ width }: any) => (width ? width : "100%")};
    }

    @media screen and (max-width: ${theme.breakpoints.s}) {
      width: ${({ width }: any) => (width ? width : "250.7px")};
    }
  `;
};

export const StyledContainer = styled.div<{ width?: string }>`
  width: ${({ width }: any) => (width ? width : "100%")};
  position: relative;
  .scroll::-webkit-scrollbar {
    width: 4px;
  }

  .scroll::-webkit-scrollbar-thumb {
    background-color: #C5C8B4;
    border-radius: 4px;
    height: 64px;
  }

  ${mediaScreen}

  #inputSearch::placeholder {
    color: #C5C8B4;

    ${({ theme }) => {
      return css`
        @media screen and (max-width: ${theme.breakpoints.s}) {
          font-size: 14px; 
        }
      `;
    }}
  }
`;

export const StyledRenderResult = styled.div`
  overflow-y:  scroll;
  maxH-height: 236px;
`;

export const StyledContainerResult = styled.div<{ width?: string }>`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  flex: 1 0 0;
  z-index: 2;

  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadows.whiteS};
  padding: 8px;
  margin-top: 8px;
  overflow: hidden;
  width: ${({ width }: any) => (width ? width : "100%")};

  ${mediaScreen}
`;

export const StyledResult = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledItem = styled.div`
  display: flex;
  padding: 12px;
  align-items: center;
  align-self: stretch;
  
  a {
    width: 100%;
  }
`;

export const StyledContainerDivider = styled.div`
  display: flex;
  padding: 0px 12px;
  align-items: center;
  align-self: stretch;
`;

export const StyledCloseIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const StyledWithoutResults = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 12px;
  gap: 4px;
`;

export const StyledMobileSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 12px;
  padding: 24px;
`;

export const StyledMobileResults = styled.div`
  padding: 0 24px 0;
`;