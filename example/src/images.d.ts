// PNG support
declare module '*.png' {
    interface ResponsiveImageEntry {
        src: string,
        width: number,
        height: number,
    }

    interface ResponsiveImage {
        src: string,
        srcSet: string,
        images: ResponsiveImageEntry[],
    }    
    const fooImage: ResponsiveImage
    namespace fooImage { }
    export = fooImage
}

// JPG support
declare module '*.jpg' {
    interface ResponsiveImageEntry {
        src: string,
        width: number,
        height: number,
    }

    interface ResponsiveImage {
        src: string,
        srcSet: string,
        images: ResponsiveImageEntry[],
    }    
    const fooImage: ResponsiveImage
    namespace fooImage { }
    export = fooImage
}

// JPEG support
declare module '*.jpeg' {
    interface ResponsiveImageEntry {
        src: string,
        width: number,
        height: number,
    }

    interface ResponsiveImage {
        src: string,
        srcSet: string,
        images: ResponsiveImageEntry[],
    }    
    const fooImage: ResponsiveImage
    namespace fooImage { }
    export = fooImage
}

// WEBP support
declare module '*.webp' {
    interface ResponsiveImageEntry {
        src: string,
        width: number,
        height: number,
    }

    interface ResponsiveImage {
        src: string,
        srcSet: string,
        images: ResponsiveImageEntry[],
    }    
    const fooImage: ResponsiveImage
    namespace fooImage { }
    export = fooImage
}

