import { useEffect, useRef, useState } from "react"

export const useFullscreen = ({
    onEnterError,
    onExitError,

    onExit,
}: {
    onEnterError?: (e: any) => void,
    onExitError?: (e: any) => void,

    onExit?: () => void,
}) => {
    const isFullscreenRequestedRef = useRef(false)
    const [isFullscreen, setIsFullscreen] = useState(false)


    const innerExitFullscreen = () => {
        if (isFullscreenRequestedRef.current && document.exitFullscreen) {
            isFullscreenRequestedRef.current = false

            return (document.exitFullscreen() || Promise.resolve())
                .then((v) => {
                    isFullscreenRequestedRef.current = false
                    return v
                }).catch((e) => {
                    isFullscreenRequestedRef.current = true
                    throw e
                })
        }
        return Promise.resolve()
    }

    const enter = () => {
        isFullscreenRequestedRef.current = true;

        (document.documentElement.requestFullscreen() || Promise.resolve())
            .then(() => {
                setIsFullscreen(true)
            })
            .catch((e) => {
                isFullscreenRequestedRef.current = false
                if (onEnterError)
                    onEnterError(e)
            })
    }

    const exit = () => {
        innerExitFullscreen()
            .then(() => {
                setIsFullscreen(false)
            }).catch((e) => {
                if (onExitError)
                    onExitError(e)
            })
    }


    useEffect(() => {
        const listener = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false)

                if (onExit)
                    onExit()
            }
        }
        window.addEventListener("fullscreenchange", listener)

        return () => {
            window.removeEventListener("fullscreenchange", listener)
        }
    }, [])

    return {
        isFullscreen: isFullscreen && isFullscreenRequestedRef.current,
        enter,
        exit,
        setFullscreen: (fsc: boolean) => {
            if (fsc)
                enter()
            else
                exit()
        }
    }
}

/**
 * Fullscreen, which allows in-page fullscreen in case requesting fullscreen filed.
 */
export const useSoftFullscreen = ({
    onEnterError,
    onExitError,
}: {
    onEnterError?: (e: unknown) => void,
    onExitError?: (e: unknown) => void,
}) => {
    const [isRequestedFullscreen, setIsRequestedFullscreen] = useState(false)
    const { isFullscreen, enter: innerEnter, exit: innerExit } = useFullscreen({
        onEnterError,
        onExitError,
        onExit: () => {
            setIsRequestedFullscreen(false)
        }
    })

    const enter = () => {
        setIsRequestedFullscreen(true)
        innerEnter()
    }

    const exit = () => {
        setIsRequestedFullscreen(false)
        innerExit()
    }

    return {
        isFullscreen: isFullscreen || isRequestedFullscreen,
        enter,
        exit,
        setFullscreen: (fsc: boolean) => {
            if (fsc)
                enter()
            else
                exit()
        }
    }
}