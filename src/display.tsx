import { Item } from ".";
import { RenderedItem } from "./item";
import React, { useEffect, useRef } from "react"
import { concatClasses, prefixClasses } from "./utils";

export type GalleryDisplay = (
    props: {
        oldItem: Item,
        item: Item,
    }
) => React.ElementType

type Element = {
    className: string,
    item: Item | null,
}

export interface GalleryDisplayProps {
    prevItem: Item | null,
    item: Item,
    stylePrefix?: string,
    onClick?: () => void,
}

export const DisolveGalleryDisplay = (
    props: {
        prevItem: Item | null,
        item: Item,
        stylePrefix?: string,
        onClick?: () => void,
    }
) => {
    const { prevItem, item, stylePrefix, onClick, } = props

    const firstItemStyles = prefixClasses(
        stylePrefix,
        "antg-gallery__central-item",
        "antg-gallery__central-item--active",
        onClick ? "antg-gallery__clickable-hack" : null,
    )

    const newItemStyles = prefixClasses(
        stylePrefix,
        "antg-gallery__central-item",
        "antg-gallery__fade--intro",
        "antg-gallery__central-item--active",
        onClick ? "antg-gallery__clickable-hack" : null,
    )

    const oldItemStyles = prefixClasses(
        stylePrefix,
        "antg-gallery__central-item",
        "antg-gallery__fade--outro",
        "antg-gallery__central-item--inactive",
        onClick ? "antg-gallery__clickable-hack" : null,
    )


    // defines the index of element, which should contain prevItem
    const currentElementIndexRef = useRef(0)
    const elements: Element[] = [
        {
            className: "",
            item: null,
        },
        {
            className: "",
            item: null,
        },
    ]

    const lastItem = useRef(null)

    if (prevItem === null || lastItem.current?.key == item.key) {
        const e = elements[currentElementIndexRef.current]
        e.item = item
        e.className = concatClasses(firstItemStyles, item.className)
    } else {
        const oldElement = elements[currentElementIndexRef.current]
        const newElementIndex = (currentElementIndexRef.current + 1) % elements.length
        const newElement = elements[newElementIndex]

        oldElement.item = prevItem
        oldElement.className = concatClasses(oldItemStyles, prevItem.className)

        newElement.item = item
        newElement.className = concatClasses(newItemStyles, item.className)

        currentElementIndexRef.current = newElementIndex
    }
    lastItem.current = item
    
    return <>
        {elements.map((e, i) => {
            if (!e.item)
                return null

            return <RenderedItem
                key={i}
                className={e.className}
                item={e.item}
                thumbnail={false}
                onClick={onClick}
            />
        })}
    </>
}       