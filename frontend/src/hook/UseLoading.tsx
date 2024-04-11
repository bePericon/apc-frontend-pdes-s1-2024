import { useState } from "react";

export function useLoading() {
    const [isActive, setIsActive] = useState<boolean>(false);

    const setLoadingOn = () => {
        setIsActive(true);
    }

    const setLoadingOff = () => {
        setIsActive(false);
    };

    return { isActive, setLoadingOn ,setLoadingOff }
}