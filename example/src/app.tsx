import React from 'react'
import { render } from 'react-dom'

const App = () => {
    return <div>Hell world!</div>
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

