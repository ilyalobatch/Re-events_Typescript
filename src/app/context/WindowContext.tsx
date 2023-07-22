import React, { useCallback, useEffect, useState, createContext } from "react";

interface IWindowContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
}

export const BREAKPOINT_MOBILE = 768;
export const BREAKPOINT_TABLET = 992;
export const WindowContext = createContext({
  clientHeight: 0,
  clientWidth: 0,
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});
export const WindowContextProvider: React.VFC<IWindowContextProviderProps> = ({
  children,
}) => {
  const getHeight = useCallback(
    () =>
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ),
    []
  );

  const getWidth = useCallback(
    () =>
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ),
    []
  );

  const [clientHeight, setHeight] = useState(getHeight());
  const [clientWidth, setWidth] = useState(getWidth());

  useEffect(() => {
    const handleResize = () => {
      setHeight(getHeight());
      setWidth(getWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getHeight, getWidth]);

  return (
    <WindowContext.Provider
      value={{
        clientHeight,
        clientWidth,
        isMobile: clientWidth < BREAKPOINT_MOBILE,
        isTablet:
          clientWidth >= BREAKPOINT_MOBILE && clientWidth < BREAKPOINT_TABLET,
        isDesktop: clientWidth > BREAKPOINT_TABLET,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
