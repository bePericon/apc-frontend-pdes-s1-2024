import styled, { css } from "styled-components";

interface StyledContainerSectionProps {
  children: any;
  withColor?: boolean;
  expandFullWidthMobile?: boolean;
}

export const StyledContainerSection = ({
  children,
  withColor,
  expandFullWidthMobile,
}: StyledContainerSectionProps) => {
  return (
    <StyledContainerRow expandFullWidthMobile={expandFullWidthMobile}>
      <StyledContainerInnerRow withColor={withColor}>
        {children}
      </StyledContainerInnerRow>
    </StyledContainerRow>
  );
};

export const StyledContainerRow = styled.div<{
  expandFullWidthMobile?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  padding: 0 48px 0;

  ${({ theme, expandFullWidthMobile }) => {
    return css`
      @media screen and (max-width: ${theme.breakpoints.s}) {
        margin-bottom: 24px;
        padding: 0 ${expandFullWidthMobile ? "0" : "20px"} 0;
      }
    `;
  }}
`;

export const StyledContainerInnerRow = styled.div<{ withColor?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ withColor }: any) =>
    withColor ? "#C5C8B4" : "#ffff"};
  border-radius: 24px;

  ${({ theme }) => {
    return css`
      @media screen and (max-width: ${theme.breakpoints.s}) {
        border-radius: 16px;
      }
    `;
  }}
`;