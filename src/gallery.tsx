import React, { useRef, useState } from "react"
import { Item } from "."
import { DisolveGalleryDisplay } from "./display"
import { RenderedItem } from "./item"
import { useGalleryNavigation } from "./navigation"
import { concatClasses, prefixClasses } from "./utils"

export interface GalleryProps {
    items: Item[],

    stylePrefix?: string,
    className?: string,

    fullscreen?: boolean,

    onFullscreenToggle?: (isFullscreen: boolean) => void,
}

const clickableClassName = "antg-gallery__clickable-hack"

export function Gallery(props: GalleryProps) {
    const { items, stylePrefix, className, onFullscreenToggle } = props
    let { fullscreen } = props
    fullscreen = true

    const [isFullView, setIsFullView] = useState(false)
    const wasBottomBarAnimated = useRef(true)

    const nav = useGalleryNavigation(items)


    const bottomBarClasses = [
        "antg-gallery__bottom-bar",
    ]
    const middleBarClasses = [
        "antg-gallery__middle-bar"
    ]
    if (isFullView) {
        bottomBarClasses.push("antg-gallery__bottom-bar--full-view")
        middleBarClasses.push("antg-gallery__middle-bar--full-view")
        wasBottomBarAnimated.current = true
    } else {
        /*
        if (wasBottomBarAnimated.current) {

        }*/
    }

    return <div className={
        concatClasses(
            prefixClasses(
                stylePrefix,
                "antg-gallery",
                fullscreen ? "antg-gallery--fullscreen" : null,
            ),
            className,

        )
    }>
        <div className={prefixClasses(stylePrefix, "antg-gallery__top-bar")}>
            <div className="antg-gallery__image_no">
                {nav.itemIndex + 1}/{items.length}
            </div>
            <div className="antg-gallery__title">
                IMAGE TITLE HERE
            </div>
            <div className="antg-gallery__toggle_full_icon"
                onClick={() => {
                    setIsFullView(!isFullView)
                }}
            >
                GO FULL
            </div>
        </div>
        <div className={prefixClasses(stylePrefix, ...middleBarClasses)}>
            <div
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
                stylePrefix={stylePrefix}
                item={nav.item}
                prevItem={nav.prevItem}
                onClick={() => {
                    setIsFullView(!isFullView)
                }}
            />

            <div
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
        
        <div className={prefixClasses(stylePrefix, ...bottomBarClasses)}>
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