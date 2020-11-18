import React from "react"
import { Link } from "react-router-dom"

function Header(props) {
  const bgLight = props.bgLight

  return (
    <>
      <div className={`navbar navbar-expand navbar-light ${bgLight ? "bg-light" : ""} sticky-top`}>
        <Link to="/" className="navbar-brand">
          ReactJS Kurs
        </Link>
        <span className="navbar-text">Webtechnologien &mdash; WiSe 2020</span>
        <div className="nav navbar-nav ml-auto">
          <Link to="/dokumentation" className="btn btn-sm btn-outline-secondary">
            Dokumentation
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
