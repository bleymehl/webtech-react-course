/**
 * Import von React und allen relevanten React-Komponenten
 */
import React, { useEffect, useState, useRef, useReducer } from "react"

function Form() {
  /**
   * Der useRef-Hook gibt ein veränderbares ref-Objekt zurück,
   * dessen Eigenschaft .current auf das übergebene Argument (initialValue) initialisiert ist.
   * Das zurückgegebene Objekt bleibt für die gesamte Lebensdauer der Komponente bestehen.
   * Beispiel: <input ref={formCheck} />
   */
  const formInput = useRef()
  const formCheck = useRef()

  const [checked, setChecked] = useState(false)

  /**
   * email: Input, der über das Input-Feld in der Form generiert wird
   * error: abhängig von der Validierung der E-Mail-Adresse
   * success: abhängig davon, ob die Checkbox checked ist und es keine Fehler gibt.
   *
   * Der success state steuert außerdem die Anzeige der Meldung nach erfolgreichem Submit.
   */
  const originalState = {
    email: null,
    error: false,
    success: false,
  }

  /**
   * Der useReducer-Hook ist eine Alternative zur Verwendung useState.
   * Er akzeptiert einen reducer vom Typ (state, action) => newState und
   * gibt den aktuellen state gepaart mit einer Dispatch-Methode zurück.
   * useReducer ist in der Regel bei komplexer Zustandslogik dem useState vorzuziehen.
   */
  const [state, dispatch] = useReducer(ourReducer, originalState)

  /**
   * Ein Reducer benötigt zwei Argumente:
   * - den aktuellen Zustand
   * - eine Aktion
   * Auf der Grundlage beider Argumente gibt er einen neuen Zustand zurück.
   */
  function ourReducer(state, action) {
    switch (action.type) {
      /**
       * Sobald sich der Value des E-Mail-Inputs ändert,
       * wird der state email mit dem entsprechenden Input-Value aktualisiert.
       * Zugleich wird der state success auf false gesetzt, damit die Meldung ausgeblendet wird.
       */
      case "emailImmediately":
        return {
          /**
           * Der Spread Operator kann verwendet werden, um ein vorhandenes Array zu nehmen
           * und ihm ein weiteres Element hinzuzufügen, während das ursprüngliche Array erhalten bleibt.
           * Wendet man den Spread Operator auf state mit ...state an, dann wird vom aktuellen state
           * eine Kopie erstellt, die dann verändert werden kann.
           * Damit wird der state nicht direkt manipuliert, so wie es auch die Philosophie von React vorsieht.
           */
          ...state,
          email: action.value,
          success: false,
        }
      /**
       * Damit die eingebebe E-Mail nicht permanent bei jeder Änderung
       * des Inputs neu geprüft wird, geschiet der Test mittels setTimeout-Function.
       * Siehe useEffect-Hook um Zeile 100.
       */
      case "emailAfterDelay":
        /**
         * RegEx (regular expression) zum Abgleichen von E-Mail-Adressen
         */
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return {
          ...state,
          /**
           * Die JavaScript test-Function gibt true oder false,
           * wenn der übergebene String dem Kriterium entspricht oder nicht.
           * Die Konstante "re" ist das Kriterium.
           */
          error: !re.test(String(state.email).toLowerCase()) ? true : false,
        }
      /**
       * Hier soll geprüft werden, ob die Checkbox checked ist
       * und ob es keine Fehler bei der Eingabe der
       * E-Mail-Adresse gibt. Wenn beide Kriterien erfüllt sind,
       * wird der state success auf true gesetzt.
       */
      case "submitForm":
        return {
          ...state,
          success: checked && !state.error ? true : false,
        }
      /**
       * Nach erfolgreicher Newsletter-Registrierung, soll die
       * Form auf ihren Default-Zustand zurücksgesetzt werden.
       * checked state: false
       * checked-Attribut der Checkbox: false
       * value des Input-Felds: ""
       */
      case "resetForm":
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

  useEffect(() => {
    if (state.email) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
      /**
       * Der useEffect-Hook ist so aufgebaut, dass man eine Funktion
       * innerhalb der Methode zurückgeben (z.B. clearTimeout) kann.
       * Diese Funktion wird ausgeführt, sobald die Komponente unmounted wird.
       * Das ist sehr nützlich, da damit unnötiges Verhalten entfernt oder
       * Probleme mit memory leaks verhindern werden können.
       * Clean-Up-Functions gelten als best practice zur Perfomance-Optimierung.
       */
      return () => clearTimeout(delay)
    }
  }, [state.email])

  useEffect(() => {
    if (state.success) {
      dispatch({ type: "resetForm" })
    }
  }, [state.success])

  function submitHandler(e) {
    /**
     * Das Standardverhalten der Form soll deaktiviert werden.
     */
    e.preventDefault()
    /**
     * Alle relevanten Dispatch-Types werden bei
     * Klick auf den Submit-Button durchlaufen.
     */
    dispatch({ type: "emailImmediately", value: state.email })
    dispatch({ type: "emailAfterDelay", value: state.email })
    dispatch({ type: "submitForm", value: state.email })
  }

  return (
    <>
      {/**
       * Abhängig vom success state wird die Erfolgsmitteilung gerendert.
       * Der Inhalt der Nachricht wird dynamisch durch email state generiert.
       */}
      {state.success && (
        <div className="alert alert-success" role="alert">
          Sie habe sich erfolgreich mit <strong>{state.email}</strong> registriert.
        </div>
      )}
      {/**
       * Beim Submit der Form wird die submitHandler-Funktion aufgerufen.
       */}
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
