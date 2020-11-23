import React from "react"
import Form from "./Form"

function Home() {
  return (
    <div className="container my-5 h-full">
      <h2>
        Newsletter-Formular
        <small className="text-muted">
          <br />
          mit Live-Validierung
        </small>
      </h2>
      <hr />
      <Form />
    </div>
  )
}

export default Home
