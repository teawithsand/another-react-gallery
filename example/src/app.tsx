import { AutonomusGallery, Gallery, GalleryState, Item } from 'another-react-gallery'
import React, { useState } from 'react'
import { render } from 'react-dom'

import starryNight from "./images/starryNight.jpg"
import battleOfGrunwald from "./images/battleOfGrunwald.jpg"
import girlReadingALetterAtAnOpenWindow from "./images/girlReadingALetterAtAnOpenWindow.jpg"
import monaLisa from "./images/monaLisa.jpg"
import sunflowers from "./images/sunflowers.jpg"
import theScream from "./images/theScream.jpg"
import theSeaOfIce from "./images/theSeaOfIce.jpg"
import wandererAboveTheSeaOfFog from "./images/wandererAboveTheSeaOfFog.jpg"



import "./style.scss"

const App = () => {
    const baseItems: Item[] = [
        starryNight,
        battleOfGrunwald,
        girlReadingALetterAtAnOpenWindow,
        monaLisa,
        sunflowers,
        theScream,
        theSeaOfIce,
        wandererAboveTheSeaOfFog,
    ].map((raw, i) => ({
        type: "image",
        key: `${i}`,
        source: {
            type: "srcset",
            srcSet: raw.srcSet,
        },
        alt: "Alt text for image",
        title: `Image #${i+1}`
    }))

    const items: Item[] = [
        ...baseItems,
        {
            type: "image",
            key: "err-1",
            source: "/notfound/image",
            alt: "Error text here",
            title: "Error image title",
        }
    ]

    return <div>
        <AutonomusGallery
            className="const-height"
            items={items}
            showFullscreen={true}
            showZoomToggle={false}
        />
    </div>
}

const renderApp = () => {
    const root = document.createElement("div")
    root.id = "root"
    document.body.appendChild(root)

    const rootById = document.getElementById("root")

    render(<App />, rootById)
}


window.addEventListener("DOMContentLoaded", () => {
    renderApp()
})

