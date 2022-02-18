export type ItemSource = string | {
    type: "srcset",
    srcset: string,
} | {
    type: "src",
    src: string,
}

/**
 * Type of images handled by this gallery.
 */
export type Item = {
    type: "image",
    source: ItemSource,
    thumbnailSource?: ItemSource,
    
    title?: string,
    alt?: string,
    width?: number,
    height?: number,
}