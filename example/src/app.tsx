import { Gallery, GalleryState, Item } from 'another-react-gallery'
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
    const [state, setState] = useState<GalleryState>({})

    const items: Item[] = [
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
    }))

    return <div>
        <Gallery
            className="const-height"
            items={items}
            {...state}
            onModeToggle={(mode) => {
                setState({
                    ...state,
                    mode
                })
            }}
            onFullscreenToggle={(fullscreenDisplay) => {
                setState({
                    ...state,
                    fullscreenDisplay
                })
            }}
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

