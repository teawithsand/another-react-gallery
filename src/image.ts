/**
 * Defines where from item should be loaded.
 */
export type ItemSource = string | {
    type: "srcset",
    srcSet: string,
    sizes?: string,
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


// TODO(teawithsand): implement <picture> tag support in these sources