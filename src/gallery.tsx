import React, { useEffect, useRef } from "react"
import { Item } from "."
import { DisolveGalleryDisplay } from "./display"
import { RenderedItem } from "./item"
import { useGalleryNavigation } from "./navigation"
import { concatClasses, prefixClasses } from "./utils"
import { useGesture } from '@use-gesture/react'

export type GalleryMode = "normal" | "full-view" | "zoom-view" | "hidden"

export interface GalleryState {
    // does not request fullscreen via API, but makes 
    // gallery display over entire body element via CSS
    //
    // It's up to user to request native fullscreen, even though this library provides util for this.
    // Defaults to false.
    fullscreenDisplay?: boolean,

    // Defines gallery display mode.
    mode?: GalleryMode,
}

export interface GalleryCallbacks {
    onModeToggle?: (newMode: GalleryMode) => void,
    onFullscreenToggle?: (toFsc: boolean) => void,
}

export interface GalleryConfig {
    allowZoom?: boolean,
    showFullscreen?: boolean,
}

export interface GalleryProps extends GalleryState, GalleryCallbacks, GalleryConfig {
    items: Item[],

    stylePrefix?: string,

    // For parent element only.
    className?: string,
}

const clickableClassName = "antg-gallery__clickable-hack"

export function Gallery(props: GalleryProps) {
    const { items, stylePrefix, className, onFullscreenToggle, onModeToggle, mode: innerMode } = props
    const { fullscreenDisplay } = props

    const isBottomBarVisibleOnScreenRef = useRef(false)

    const mode = innerMode ?? "normal"
    const wasBottomBarAnimated = useRef(true)

    const nav = useGalleryNavigation(items)

    const bottomBarClasses = [
        "antg-gallery__bottom-bar",
    ]
    const middleBarClasses = [
        "antg-gallery__middle-bar",
        "antg-gallery__gesture",
    ]
    const parentClasses = [
        "antg-gallery",
    ]
    if (mode === "hidden") {
        parentClasses.push("antg-gallery--hidden")
    } else if (mode === "full-view") {
        parentClasses.push("antg-gallery--full-view")
        wasBottomBarAnimated.current = true
    } else if (mode === "zoom-view") {
        parentClasses.push("antg-gallery--zoom-view")
        wasBottomBarAnimated.current = true
    }

    if (fullscreenDisplay) {
        parentClasses.push("antg-gallery--fullscreen")
    }

    const zoomScrollDivRef: React.LegacyRef<HTMLDivElement> = useRef()
    const controlLeftRef: React.LegacyRef<HTMLDivElement> = useRef()
    const controlRightRef: React.LegacyRef<HTMLDivElement> = useRef()

    const bottomBarRef: React.LegacyRef<HTMLDivElement> = useRef()

    const bind = useGesture({
        onDrag: ({
            xy: [x, y],
            initial: [sx, sy],
            swipe: [swx, swy],
            intentional,
            first,
            last,
            memo,
        }) => {
            const div = zoomScrollDivRef.current
            if (div) {
                if (!memo || first)
                    memo = {
                        ...(memo || {}),
                        divScroll: [div.scrollLeft, div.scrollTop],
                    }
            }
            if (intentional) {
                if (mode === "zoom-view") {
                    // Note: this actually is not needed on mobile devices, where nice scrolling is native,
                    // however I didn't find a way to emulate such behaviour on pc.

                    // TODO(teawithsand): use native scrolling with touch-events != none on mobile
                    if (div) {
                        const [mx, my] = memo.divScroll

                        const dx = sx - x
                        const dy = sy - y

                        div.scroll({
                            left: mx + dx,
                            top: my + dy,
                        })
                    }
                } else {
                    if (swy === 0 && swx !== 0) {
                        if (swx < 0)
                            nav.goToNext()
                        else
                            nav.goToPrev()
                    } else {
                        if (onModeToggle) {
                            if (swx === 0 && swy !== 0) {
                                if (swy < 0) {
                                    onModeToggle("normal")
                                } else {
                                    onModeToggle("full-view")
                                }
                            }
                        }
                    }
                }


            }

            if (last) {
                return null;
            } else {
                return memo;
            }
        },

        // TODO(teawithsand): entering zoom mode on pinch
        onPinch: () => {
            return;
        }
    }, {
        drag: {
            filterTaps: true,
            preventDefault: true,

        },
        pinch: {

        }
    }) as unknown as (() => unknown)

    const scrollToCurrentImage = () => {
        if (bottomBarRef.current) {
            const target = bottomBarRef.current.childNodes[nav.itemIndex]
            if (isBottomBarVisibleOnScreenRef.current) {
                const callable = ((target as any).scrollIntoView.bind(target) || (() => { }))
                callable({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                })
            }
        }
    }

    useEffect(() => {
        if (bottomBarRef.current) {
            const observer = new IntersectionObserver(function (entries) {
                if (!isBottomBarVisibleOnScreenRef.current && entries[0].isIntersecting) {
                    scrollToCurrentImage()
                }
                isBottomBarVisibleOnScreenRef.current = entries[0].isIntersecting
            }, { threshold: [1] });

            observer.observe(bottomBarRef.current)


            return () => {
                observer.disconnect()
            }
        }
        return () => { }
    }, [bottomBarRef.current])


    // Scrolls bottom slider if required
    useEffect(() => {
        scrollToCurrentImage()
    }, [bottomBarRef.current, nav.itemIndex])

    return <div className={
        concatClasses(
            prefixClasses(
                stylePrefix,
                ...parentClasses,
            ),
            className,

        )
    }>
        <div className={prefixClasses(stylePrefix, "antg-gallery__top-bar")}>
            <div className="antg-gallery__image_no">
                {nav.itemIndex + 1}/{items.length}
            </div>
            <div className="antg-gallery__title">
                {nav.item.title ?? ""}
            </div>
            <div className="antg-gallery__toggle_zoom_icon"
                onClick={onModeToggle ? () => {
                    if (mode === "zoom-view") {
                        onModeToggle("normal")
                    } else {
                        onModeToggle("zoom-view")
                    }
                } : null}
            >
                ZOOM
            </div>
            <div className="antg-gallery__toggle_full_icon"
                onClick={onFullscreenToggle ? () => {
                    onFullscreenToggle(!fullscreenDisplay)
                } : null}
            >
                FSC
            </div>
        </div>
        <div
            ref={zoomScrollDivRef}
            {...bind()}
            className={prefixClasses(stylePrefix, ...middleBarClasses)}>
            <div
                ref={controlLeftRef}
                className={prefixClasses(stylePrefix, "antg-gallery__control-left", clickableClassName)}
                onClick={() => {
                    nav.goToPrev()
                }}
            >
                <div className={prefixClasses(stylePrefix, "antg-gallery__control-left__center-hack")}>
                    {"<"}
                </div>
            </div>

            <DisolveGalleryDisplay
                key={"const"}
                stylePrefix={stylePrefix}
                item={nav.item}
                prevItem={nav.prevItem}

                // Toggling fullscreen on click breaks UI, so it's disabled.
                // It may be enabled in future version.
                onClick={() => {
                    if (mode === "zoom-view") {
                        onModeToggle("normal")
                    }
                }}
            />

            <div
                ref={controlRightRef}
                className={prefixClasses(stylePrefix, "antg-gallery__control-right", clickableClassName)}
                onClick={() => {
                    nav.goToNext()
                }}
            >
                <div className={prefixClasses(stylePrefix, "antg-gallery__control-right__center-hack")}>
                    {">"}
                </div>
            </div>
        </div>

        <div
            ref={bottomBarRef}
            className={prefixClasses(stylePrefix, ...bottomBarClasses)}>
            {items.map((it, i) => <RenderedItem
                className={
                    prefixClasses(
                        stylePrefix,
                        "antg-gallery__bottom-image",
                        clickableClassName,
                        i === nav.itemIndex ? "antg-gallery__bottom-image--active" : null,
                    )
                }
                item={it}
                key={i}
                thumbnail={true}
                onClick={() => {
                    nav.goToIndex(i)
                }}
            />)}
        </div>
    </div>
}