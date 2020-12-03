import React, { useEffect, useState, useRef, useReducer } from "react"

function Form() {
  const formInput = useRef()
  const formCheck = useRef()

  /**
   * TODO:
   * state variable "checked" mit useState-Hook erzeugen
   * default value: false
   */
  const [checked, setChecked] = useState(false)

  /**
   * TODO:
   * initial state object "originalState" definieren
   * email (value:string, hasErrors: boolean, message:string)
   */

  const originalState = {
    email: null,
    error: false,
    success: false,
  }

  /**
   * Reducer
   * Ein Reducer ist eine Funktion, die zwei Argumente benötigt - den aktuellen Zustand und eine Aktion - und auf der Grundlage beider Argumente einen neuen Zustand zurückgibt.
   */

  function ourReducer(state, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "emailImmediately":
        console.log(`Immediately: ${state.email}`)
        return {
          ...state,
          email: action.value,
          success: false,
        }
      case "emailAfterDelay":
        console.log(`After Delay: ${state.email}`)
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return {
          ...state,
          error: !re.test(String(state.email).toLowerCase()) ? true : false,
        }
      case "submitForm":
        console.log(`Submit: ${state.email}`)
        return {
          ...state,
          success: checked && !state.error ? true : false,
        }
      case "resetForm":
        console.log(`Reset: ${state.email}`)
        setChecked(false)
        formCheck.current.checked = false
        formInput.current.value = ""
        return {
          ...state,
        }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(ourReducer, originalState)

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
              <input type="checkbox" ref={formCheck} className="form-check-input" id="check" value={checked} onChange={() => setChecked((checked) => !checked)} disabled={state.error} />
              <label className="form-check-label" htmlFor="check">
                <small> Durch das Absenden des Formulars wird das komplette Internet gelöscht. Ich bin mir über die Konsequenzen bewusst und bestätige, dass ich diesen Hinweis aufmerksam gelesen habe.</small>
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-sm" disabled={!checked}>
          Absenden
        </button>
      </form>
    </>
  )
}

export default Form
