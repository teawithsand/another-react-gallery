/**
 * Concatenates multiple css class names.
 */
export const concatClasses = (...classNameSource: (string | undefined | null)[]) => {
    const classSet = new Set

    const classNames = classNameSource
        .map(s => s ? s.split(/\s+/) : [])

    const flatClassNames = []
    for (const names of classNames) {
        for (const name of names) {
            flatClassNames.push(name)
        }
    }

    return flatClassNames
        .flatMap(s => s ? s.split(/\s+/) : [])
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .filter(c => {
            const res = !classSet.has(c)
            classSet.add(c)
            return res
        })
        .join(" ")
}


export const prefixClasses = (prefix: string | null | undefined, ...classNameSource: (string | undefined | null)[]) => {
    const classSet = new Set

    const classNames = classNameSource
        .map(s => s ? s.split(/\s+/) : [])

    const flatClassNames = []
    for (const names of classNames) {
        for (const name of names) {
            flatClassNames.push(name)
        }
    }

    if(!prefix)
        prefix = ""

    return flatClassNames
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .filter(c => {
            const res = !classSet.has(c)
            classSet.add(c)
            return res
        })
        .map(c => prefix + c)
        .join(" ")
}

