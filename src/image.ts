export type ItemSource = string | {
    type: "srcset",
    srcSet: string,
} | {
    type: "src",
    src: string,
}

/**
 * Type of images handled by this gallery.
 */
export type Item = {
    type: "image",

    key: string,
    source: ItemSource,
    thumbnailSource?: ItemSource,

    className?: string,
    
    title?: string,
    alt?: string,
    width?: number,
    height?: number,
}