import { Gallery, GalleryConfig, GalleryMode, Item, useSoftFullscreen } from "."
import React, { useState } from "react"

export interface AutonomusGalleryProps extends GalleryConfig {
    items: Item[],
    stylePrefix?: string,
    // For parent element only.
    className?: string,
}

/**
 * Gallery, which handles tasks like switching zoom or fullscreen on it's own.
 * On the other hand, user can't do that from external code.
 * In fact, in most cases it should be preferred to gallery.
 */
export function AutonomusGallery(props: AutonomusGalleryProps) {
    const { showFullscreen, showZoomToggle } = props

    const { isFullscreen, setFullscreen } = useSoftFullscreen({})
    const [mode, setMode] = useState<GalleryMode>("normal")

    return <Gallery
        fullscreenDisplay={isFullscreen}
        onFullscreenToggle={(fsc) => {
            if (showFullscreen) {
                setFullscreen(fsc)
            }
        }}

        mode={mode}
        onModeToggle={(mode) => {
            if (!showZoomToggle && mode === "zoom-view")
                return;

            setMode(mode)
        }}

        {...props}
    />
}