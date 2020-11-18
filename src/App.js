import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "./App.scss"

import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import Dokumentation from "./components/Dokumentation"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header bgLight={true} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/dokumentation">
            <Dokumentation />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
