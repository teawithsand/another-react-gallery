import { Item } from ".";
import { RenderedItem } from "./item";
import React, { useRef } from "react"
import { prefixClasses } from "./utils";

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
        onClick ? "antg-gallery__clickable-hack" : null,
    )

    const newItemStyles = prefixClasses(
        stylePrefix,
        "antg-gallery__central-item",
        "antg-gallery__fade--intro",
        onClick ? "antg-gallery__clickable-hack" : null,
    )

    const oldItemStyles = prefixClasses(
        stylePrefix,
        "antg-gallery__central-item",
        "antg-gallery__fade--outro",
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
    if (prevItem === null || lastItem.current === item) {
        const e = elements[currentElementIndexRef.current]
        e.item = item
        e.className = firstItemStyles
    } else {
        lastItem.current = item

        const oldElement = elements[currentElementIndexRef.current]
        const newElementIndex = (currentElementIndexRef.current + 1) % elements.length
        const newElement = elements[newElementIndex]

        oldElement.item = prevItem
        oldElement.className = oldItemStyles

        newElement.item = item
        newElement.className = newItemStyles

        currentElementIndexRef.current = newElementIndex
    }

    /*
    useEffect(() => {
        return () => {
        }
    }, [newRef, oldRef, newItem, oldItem])
    */

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