import React, { useEffect, useState, useRef } from "react"
import { useImmer, useImmerReducer } from "use-immer"

function Form() {
  const formInput = useRef()
  const formCheck = useRef()

  const [checked, setChecked] = useState(false)

  const [originalState, setOriginalState] = useImmer({
    formReady: false,
    success: false,
  })

  const initialState = {
    email: {
      value: "",
      hasErrors: false,
      message: "",
    },
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function ourReducer(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.value = action.value
        setOriginalState((draft) => {
          draft.success = false
        })
        return
      case "emailAfterDelay":
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(draft.email.value).toLowerCase())) {
          draft.email.hasErrors = true
          draft.email.message = "Bitte geben Sie eine valide E-Mail-Adresse ein."
        }
        return
      case "submitForm":
        if (checked && !draft.email.hasErrors) {
          setChecked(false)
          formCheck.current.checked = false
          formInput.current.value = ""
          setOriginalState((draft) => {
            draft.formReady = false
            draft.success = true
          })
        }
    }
    return
  }

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])

  function submitHandler(e) {
    e.preventDefault()
    dispatch({ type: "emailImmediately", value: state.email.value })
    dispatch({ type: "emailAfterDelay", value: state.email.value })
    dispatch({ type: "submitForm" })
  }

  return (
    <>
      {originalState.success && (
        <div className="alert alert-success" role="alert">
          Sie habe sich erfolgreich mit <strong>{state.email.value}</strong> registriert.
        </div>
      )}
      <form onSubmit={submitHandler} className="my-3">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-8">
            <div className="form-group">
              <label htmlFor="email">E-Mail Adresse</label>
              <input type="email" ref={formInput} className="form-control" id="email" placeholder="example@email.com" aria-describedby="emailHelp" onChange={(e) => dispatch({ type: "emailImmediately", value: e.target.value })} />
              <small className="text-danger liveValidateMessage">{state.email.message}</small>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="form-group form-check">
              <input type="checkbox" ref={formCheck} className="form-check-input" id="check" value={checked} onChange={() => setChecked((checked) => !checked)} />
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
