/**
 * TODO:
 * useState-Hook importieren
 */
import React, { useEffect, useRef, useReducer } from "react"

function Form() {
  /**
   * TODO:
   * Checkbox referenzieren mit useRef-Hook
   */
  const formInput = useRef()

  /**
   * TODO:
   * state variable "checked" mit useState-Hook erzeugen
   * default value: false
   */

  const originalState = {
    email: null,
    error: false,
    success: false,
  }

  const [state, dispatch] = useReducer(ourReducer, originalState)

  function ourReducer(state, action) {
    switch (action.type) {
      case "emailImmediately":
        return {
          ...state,
          email: action.value,
          success: false,
        }
      case "emailAfterDelay":
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return {
          ...state,
          error: !re.test(String(state.email).toLowerCase()) ? true : false,
        }
      case "submitForm":
        return {
          ...state,
          /**
           * TODO:
           * Abfrage insofern erweitern, dass checked berücksichtigt wird.
           * Checkbox muss checked sein, damit state success = true.
           */
          success: !state.error ? true : false,
        }
      case "resetForm":
        /**
         * TODO:
         * checked-Attribut der Checkbox auf false setzen (s. useRef-Hook)
         */
        formInput.current.value = ""
        return {
          ...state,
        }
      default:
        throw new Error()
    }
  }

  useEffect(() => {
    if (state.email) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.email])

  useEffect(() => {
    if (state.success) {
      dispatch({ type: "resetForm" })
    }
  }, [state.success])

  function submitHandler(e) {
    e.preventDefault()
    dispatch({ type: "emailImmediately", value: state.email })
    dispatch({ type: "emailAfterDelay", value: state.email })
    dispatch({ type: "submitForm", value: state.email })
  }

  return (
    <>
      {state.success && (
        <div className="alert alert-success" role="alert">
          Sie habe sich erfolgreich mit <strong>{state.email}</strong> registriert.
        </div>
      )}
      <form onSubmit={submitHandler} className="my-3">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-8">
            <div className="form-group">
              <label htmlFor="email">E-Mail Adresse</label>
              <input type="email" ref={formInput} className="form-control" id="email" placeholder="example@email.com" aria-describedby="emailHelp" onChange={(e) => dispatch({ type: "emailImmediately", value: e.target.value })} />
              {state.error && <small className="text-danger liveValidateMessage">Bitte geben Sie eine valide E-Mail-Adresse ein!</small>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="form-group form-check">
              {/**
               * TODO:
               * useRef-Hook mit HTML-Element verknüpfen
               */}
              <input type="checkbox" className="form-check-input" id="check" disabled={state.error} />
              <label className="form-check-label" htmlFor="check">
                <small> Durch das Absenden des Formulars wird das komplette Internet gelöscht. Ich bin mir über die Konsequenzen bewusst und bestätige, dass ich diesen Hinweis aufmerksam gelesen habe.</small>
              </label>
            </div>
          </div>
        </div>
        {/**
         * TODO:
         * In Abhängigkeit von dem checked state soll
         * der Submit-Button dis- oder enabled werden.
         */}
        <button type="submit" className="btn btn-primary btn-sm">
          Absenden
        </button>
      </form>
    </>
  )
}

export default Form
