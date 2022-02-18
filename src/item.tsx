import { Item } from "."
import React from "react"

export const RenderedItem = (props: {
    item: Item,
    className?: string,
    onClick?: () => void,
    ref?: React.LegacyRef<HTMLImageElement>,

    thumbnail: boolean,
}) => {
    const { item, className, onClick, ref, thumbnail } = props
    if (item.type === "image") {
        const { source, thumbnailSource, width, height, alt, title } = item

        const initProps = {
            width,
            height,
            alt,
            title,
            className,
            onClick,
        }

        let props: any = initProps

        // TODO(teawithsand): pack source to props to function
        let sourceSet = true
        if (thumbnail) {
            if (typeof thumbnailSource === "string") {
                props = {
                    ...initProps,
                    src: thumbnailSource,
                }
            } else if (typeof thumbnailSource === "object" && thumbnailSource.type === "src") {
                props = {
                    ...initProps,
                    src: thumbnailSource.src,
                }
            } else if (typeof thumbnailSource === "object" && thumbnailSource.type === "srcset") {
                props = {
                    ...initProps,
                    srcSet: thumbnailSource.srcset,
                }
            } else {
                sourceSet = false
            }
        } else {
            sourceSet = false
        }

        if (!sourceSet) {
            if (typeof source === "string") {
                props = {
                    ...initProps,
                    src: source,
                }
            } else if (typeof source === "object" && source.type === "src") {
                props = {
                    ...initProps,
                    src: source.src,
                }
            } else if (typeof source === "object" && source.type === "srcset") {
                props = {
                    ...initProps,
                    srcSet: source.srcset,
                }
            }
        }

        return <img
            ref={ref}
            {...props} />
    }
}