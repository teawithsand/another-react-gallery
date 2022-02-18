import { Gallery } from 'another-react-gallery'
import React from 'react'
import { render } from 'react-dom'

import starryNight from "./images/starryNight.jpg"
import battleOfGrunwald from "./images/battleOfGrunwald.jpg"

import "./style.scss"

const App = () => {
    return <div>
        <Gallery
            className="const-height"
            items={[
                {
                    type: "image",
                    source: starryNight,
                },
                {
                    type: "image",
                    source: battleOfGrunwald,
                },
            ]}
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

