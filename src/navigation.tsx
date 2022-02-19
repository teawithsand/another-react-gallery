import { useState } from "react";
import { Item } from ".";


export const useGalleryNavigation = (items: Item[]) => {
    const [itemIndex, setItemIndex] = useState(0)
    const [prevItemIndex, setPrevItemIndex] = useState<null | number>(null)

    let actualItemIndex = itemIndex
    let actualPrevItemIndex = prevItemIndex
    if (actualItemIndex >= items.length) {
        actualItemIndex = 0
        actualPrevItemIndex = null
    }

    const goToIndex = (i: number) => {
        setPrevItemIndex(itemIndex)
        setItemIndex(i)
    }

    const prevItem: Item | null = actualPrevItemIndex !== null ? items[actualPrevItemIndex] : null

    return {
        itemIndex: actualItemIndex,
        item: items[actualItemIndex],

        prevItemIndex: actualPrevItemIndex,
        prevItem,


        goToIndex,
        goToNext: () => {
            goToIndex((actualItemIndex + 1) % items.length)
        },
        goToPrev: () => {
            let idx = actualItemIndex - 1
            if (idx < 0)
                idx += items.length
    
            goToIndex(idx)
        },
        clearPrev: () => {
            setPrevItemIndex(null)
        }
    }
}