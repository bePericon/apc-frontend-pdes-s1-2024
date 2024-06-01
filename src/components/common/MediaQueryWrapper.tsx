// Wrappers para reemplazar el hook useMediaBreakpointQuery ya que no funciona bien con server side rendering
// Estos wrappers se pueden usar para mostrar/ocultar componentes en mobile/desktop

import { FC, ReactNode } from "react";
import styled from "styled-components";

const OnlyDesktop = styled.div<{ breakpoint?: keyof IBreakpoints; fullWidth?: boolean }>`
  display: flex;
  ${({ fullWidth }) => fullWidth && `width: 100%`};

  @media screen and (max-width: ${({ theme, breakpoint }) =>
      theme.breakpoints[breakpoint || "s"]}) {
    display: none;
  }
`;

const OnlyMobile = styled.div<{ breakpoint?: keyof IBreakpoints; fullWidth?: boolean }>`
  display: none;
  ${({ fullWidth }) => fullWidth && `width: 100%`};

  @media screen and (max-width: ${({ theme, breakpoint }) =>
      theme.breakpoints[breakpoint || "s"]}) {
    display: flex;
  }
`;

interface IBreakpoints {
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
}

interface IMediaQueryWrapper {
  visibleFor: "desktop" | "mobile";
  breakpoint?: keyof IBreakpoints;
  children: ReactNode;
  fullWidth?: boolean;
}

const MediaQueryWrapper: FC<IMediaQueryWrapper> = ({ children, visibleFor, ...props }) => {
  const Wrapper = visibleFor == "desktop" ? OnlyDesktop : OnlyMobile;

  return <Wrapper {...props}>{children}</Wrapper>;
};

export default MediaQueryWrapper;
