import { useEffect, useRef, useState } from "react"


export const useFullscreen = ({
    onFullscreenError
}: {
    onFullscreenError?: (e) => void,
}) => {
    // used to prevent double calls to enter/exit fulllscreen
    const ifFullscreenRequestedRef = useRef(false)
    // used to determine if fullscreen
    const [isFullscreen, setIsFullscreen] = useState(false)


    const requestFullscreen = () => {
        ifFullscreenRequestedRef.current = true;
        (document.documentElement.requestFullscreen() || Promise.resolve())
            .then(() => {
                setIsFullscreen(true)
            })
            .catch((e) => {
                ifFullscreenRequestedRef.current = false
                if (onFullscreenError)
                    onFullscreenError(e)
            })
    }


    const innerExitFullscreen = () => {
        if (ifFullscreenRequestedRef.current && document.exitFullscreen) {
            ifFullscreenRequestedRef.current = false

            return (document.exitFullscreen() || Promise.resolve())
                .then((v) => {
                    ifFullscreenRequestedRef.current = false
                    return v
                }).catch((e) => {
                    ifFullscreenRequestedRef.current = true
                    throw e
                })
        }
        Promise.resolve()
    }

    const exitFullscreen = () => {
        ifFullscreenRequestedRef.current = false
        innerExitFullscreen()
            .then(() => {
                setIsFullscreen(false)
            }).catch((e) => {
                if (onFullscreenError)
                    onFullscreenError(e)
            })
    }


    useEffect(() => {
        const listener = (e: any) => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false)
                // exitFullscreen()
            }

        }
        window.addEventListener("fullscreenchange", listener)

        return () => {
            window.removeEventListener("fullscreenchange", listener)

            exitFullscreen
        }
    }, [])

    return {
        isFullscreen: isFullscreen && ifFullscreenRequestedRef.current,
        requestFullscreen,
        exitFullscreen,
    }
}