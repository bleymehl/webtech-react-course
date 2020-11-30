import React from "react"
import { CodeBlock, codepen } from "react-code-blocks"

const exampleCode = {
  functionComponent: `function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }`,
  classComponent: `class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }`,
  stateExample: `// declare a new state variable with default value of "0"
  const [count, setCount] = useState(0);`,
  effectExampleOne: `useEffect(() => {
    // log the value of "count" on componentDidMount
    console.log(count)
  }, []);`,
  effectExampleTwo: `useEffect(() => {
    // log the value of "count" on componentDidUpdate
    console.log(count)
  }, [count]);`,
}

function Dokumentation() {
  return (
    <div className="container container--narrow my-5">
      <h2>
        Dokumentation <small className="text-muted">v.17.x.x</small>
      </h2>
      <hr />

      <p className="lead">
        Diese Dokumentation ist Teil eines React-Tutorials. Im Folgenden wird auf die wichtigsten Begriffe noch einmal eingegangen. Diese Dokumentation versteht sich allerdings als nicht allumfassend. Für weitere Informationen empfehlen wir die{" "}
        <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noreferrer">
          React Dokumentation
        </a>{" "}
        anzuschauen.
        <br />
        Voraussetzung für dieses Tutorial sind grundlegende JavaScript- und HTML-Kenntnisse sowie ein Code-Editor (unsere Empfehlung: Visual Studio Code) und Node.js mit npm (node package manager).
      </p>

      <h4 className="mt-5">Was ist React?</h4>

      <p>React ist eine OpenSource JavaScript-Bibliothek von Facebook zur schnellen, modularen Entwicklung von User-Interfaces basierend auf Komponenten (wiederverwendbarer Code-Bausteine).</p>

      <h4 className="mt-5">Warum ist es populär? Welches Problem löst es?</h4>
      <p>Mit React können wir unsere Daten außerhalb des DOM innerhalb eines virtuellen DOM aufbewahren, so dass die Arbeit mit den Daten einfach und blitzschnell vonstatten geht. </p>
      <p>Wenn sich unsere Daten ändern, reagiert es ("react"), indem es nur genau die Teile des DOM neu rendert, die tatsächlich neu gerendert werden müssen.</p>
      <p>Reacts LifecycleHooks sorgen dafür, dass die Komponenten automatisch geupdated werden, ohne dass der Nutzer manuell das Neuladen auslösen muss.</p>

      <h4 className="mt-5">JSX</h4>
      <p>JSX (JavaScript + XML) ist eine Syntaxerweiterung, die es uns erlaubt, HTML in (React-) JavaScript zu schreiben. Dadurch ergibt sich der Vorteil, dass man die JavaScript-Funktionalität (z.B. Variablen, Funktionen, Eigenschaften usw.) direkt in das HTML schreiben kann.</p>
      <p className="alert alert-warning text-dark">
        Zu beachten ist, dass gewisse Keywords wie zum Beispiel <code>class</code> oder <code>for</code> bereits von JavaScript belegt sind und nicht im HTML als Tag-Attribut genutzt werden können. Hierfür müssen dann alternative Begriffe wie zum Beispiel <code>className</code> oder <code>htmlFor</code> genutzt werden.
      </p>

      <h4 className="mt-5">Komponenten</h4>
      <p>Mit Komponenten (im Folgenden components) kann man die Benutzeroberfläche in unabhängige, wiederverwendbare Teile aufteilen und jedes Teil isoliert betrachten. In React gibt es hinsichtlich ihrer Erstellung sowie Funktionalität zwei Arten von components:</p>
      <p>
        <strong>Function Component</strong>
        <br />
        <ul>
          <li>einfachster Weg eine neue Komponente zu definieren</li>
          <li>es handelt sich dabei um eine klassische JavaScript-Funktion</li>
          <li>gibt uneingeschränkt Daten zurück</li>
        </ul>
      </p>

      <CodeBlock text={exampleCode.functionComponent} language={"jsx"} showLineNumbers={false} theme={codepen} />

      <p className="mt-3">
        <strong>Class Component</strong>
        <br />
        <ul>
          <li>nutzt ES6-Funktionalität, um eine Class in JavaScript zu erzeugen</li>
          <li>erweitert die React component class um eigene component subclass und erbt damit auch deren Funktionalität</li>
          <li>
            dadurch muss auch eine <code>render()</code>-Methode innerhalb der Klasse aufgerufen werden
          </li>
        </ul>
      </p>

      <CodeBlock text={exampleCode.classComponent} language={"jsx"} showLineNumbers={false} theme={codepen} />

      <p className="alert alert-info mt-3">Components können in andere components verschachtelt werden. Ebenso kann man function components und class components vermischen.</p>

      <h4 className="mt-5">Props</h4>
      <p>
        <strong>Props</strong> (properties) sind benutzerdefinierte Eigenschaften, die an Komponenten übergeben werden können. Sie erweitern damit die Funktionalität der Komponenten. Die prop-Werte können ausgelesen und weiterverarbeitet werden.
      </p>
      <p>Props werden einmalig beim Erstellen der Komponente dem Constructor übergeben und dürfen nicht verändert werden.</p>
      <p className="alert alert-danger text-dark">Props are Read-Only!</p>

      <h4 className="mt-5">States</h4>
      <p>
        <strong>States</strong> lassen uns Daten einer Anwendung in den Speicher schreiben. Wenn sich der Zustand (state) der Komponente ändert, führt React automatisch ein erneutes Rendern der Komponente für uns durch, ohne dass wir die <strong>render()</strong>-Funktion erneut manuell aufrufen müssen.
      </p>
      <p>
        Negativbeispiel: <code>setInterval()</code> ruft die <code>render()</code>-Funktion alle 1000ms auf.
      </p>
      <p>
        Im Gegensatz zu <strong>props</strong> (one-way flow), können <strong>states</strong> geupdatet werden. Man kann sich unter <strong>states</strong> alle Daten vorstellen, die gespeichert und geändert werden sollen, ohne dass sie unbedingt in eine Datenbank aufgenommen werden müssen. Beispiel: das Hinzufügen und Entfernen von Artikeln aus einem Einkaufswagen vor der Bestätigung eines Kaufs.
      </p>
      <p className="alert alert-danger text-dark">Do Not Modify State Directly!</p>
      <p>
        Die Philosophie von React besagt, dass states niemals direkt modifiziert werden sollen.
        <br />
        <span className="text-muted">Weiterführende Themen: Unidirectional Data Flow, Functional Programming, Immutability</span>
      </p>

      <div className="alert alert-info">
        <h4 class="alert-heading">Immer</h4>
        <p>
          Im Rahmen des Tutorials wird auf das Package{" "}
          <strong>
            <a href="https://github.com/immerjs/immer#readme" target="_blank" rel="noreferrer">
              Immer
            </a>
          </strong>{" "}
          zur State-Manipulation zurückgegriffen.
        </p>
        <hr />
        <p>"Immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way. It is based on the copy-on-write mechanism."</p>
      </div>

      <h4 className="mt-5">Hooks</h4>
      <p>
        <strong>Hooks</strong> sind spezielle Funktionen, mit denen man sich in React-Zustands- und Lebenszyklus-Features von function components "einklinken" kann. Sie funktionieren nicht innerhalb von Klassen aber ermöglichen es, React ohne Klassen zu verwenden.
      </p>
      <p>
        Hooks erlauben das Wiederverwenden von State-behafteter Logik, ohne das dafür deine Komponenten-Hierarchie geändert werden muss.{" "}
        <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noreferrer">
          Hier
        </a>{" "}
        mehr erfahren.
      </p>
      <p>Im Folgenden werden die beiden bekanntesten Hooks vorgestellt:</p>
      <h5 className="mt-5">useState()</h5>
      <p>
        <code>useState</code> ist ein Hook, mit dem man states zu einer function component hinzufügen kann.
      </p>

      <p>
        <code>useState</code> gibt den aktuellen Zustandswert und eine Funktion, mit der man diesen Zustand aktualisieren kann, zurück. Man kann diese Funktion von einem Event-Handler oder von einem anderen Ort aus aufrufen. Sie ist ähnlich wie <code>this.setState</code> in einer Klasse, nur dass sie den alten und den neuen Zustand nicht zusammenführt.
      </p>

      <CodeBlock text={exampleCode.stateExample} language={"jsx"} showLineNumbers={false} theme={codepen} />

      <h5 className="mt-5">useEffect()</h5>
      <p>
        Im Gegensatz zu <code>useState</code> kann man mit <code>useEffect</code> sogenannte "side effects" in function components ausführen.
      </p>
      <p>
        Es gibt zwei häufige Arten von side effects bei React-Komponenten: solche, die nicht bereinigt werden müssen, und solche, die es erfordern. Mehr dazu{" "}
        <a href="https://reactjs.org/docs/hooks-effect.html#effects-without-cleanup" target="_blank" rel="noreferrer" className="text-secondary">
          hier
        </a>{" "}
        erfahren.
      </p>
      <p>In Anwendungen mit vielen Komponenten ist es wichtig Ressourcen wieder freizugeben, wenn die Komponente gelöscht wird. So gibt es beispielsweise von Haus aus so genannten Lifecycle Methoden wie beispielsweise componentDidMount() oder componentWillUnMount(), die bestimmten Code zur gegebenen Zeit (z.B. beim Mounten oder Unmounten) ausführen.</p>
      <p>
        <code>useEffect</code> kombiniert die Lifecycle Methoden: <code>componentDidMount</code>, <code>componentDidUpdate</code> und <code>componentWillUnmount</code>.
      </p>
      <p>
        Dem <code>useEffect</code>-Hook kann so beispielsweise ein Argument übergeben werden, dass es ermöglicht, diesen inital beim Laden der Komponente auszuführen oder ihn jedes Mal dann auszuführen, wenn sich ein bestimmter state verändert hat.
      </p>

      <p>
        Wenn der zweite Parameter des <code>useEffect</code>-Hooks ein leeres Array ist, dann wird der Code beim Mounten der Komponente einmalig ausgeführt.{" "}
      </p>

      <CodeBlock text={exampleCode.effectExampleOne} language={"jsx"} showLineNumbers={false} theme={codepen} />

      <p className="mt-3">
        Wenn der zweite Parameter des <code>useEffect</code>-Hooks eine State-Variable ist, dann wird der Hook immer dann ausgeführt, wenn sich der Zustand der Variable ändert.{" "}
      </p>

      <CodeBlock text={exampleCode.effectExampleTwo} language={"jsx"} showLineNumbers={false} theme={codepen} />

      <hr className="my-5" />

      <h4>
        Ein neues Projekt mit <code>create-react-app</code> beginnen
      </h4>
      <p>
        Im Terminal den Befehl <code>ngx create-react-app [app-name]</code> ausführen{" "}
        <small>
          <br />
          <em>Voraussetzung: Node &gt;= 8.10 and npm &gt;= 5.6</em>
        </small>
      </p>
      <p>Der Befehl richtet automatisch die Entwicklungsumgebung ein, sodass man die neuesten JavaScript-Funktionen nutzen kann.</p>
      <p>
        Danach kann man in das neu erstellte Projekt-Verzeichnis mit <code>cd app-name</code> navigieren und anschließend mit <code>npm start</code> einen lokalen Server (localhost) starten. "Under the hood" sorgen packages wie{" "}
        <a href="https://babeljs.io/" target="_blank" rel="noreferrer">
          Babel
        </a>{" "}
        und{" "}
        <a href="https://webpack.js.org/" target="_blank" rel="noreferrer">
          webpack
        </a>{" "}
        dafür, dass der Quellcode live und instant kompiliert werden. Dadurch wird auch der geänderte Quellcode im Browser nahtlos aktualisiert.
      </p>
      <p>
        Wem das <code>create-react-app</code>-Template zu unübersichtlich ist, kann dieses mit dem Package{" "}
        <a href="https://github.com/adebayoileri/cleanup-create-react-app/#readme" target="_blank" rel="noopener noreferrer">
          cleanup-create-react-app
        </a>{" "}
        unkompliziert aufräumen. Dabei werden unnötige Dateien entfernt. Es gibt auch ReactJS Boilerplates wie zum Beispiel{" "}
        <a href="https://github.com/nano-react-app/nano-react-app" target="_blank" rel="noopener noreferrer">
          nano-react-app
        </a>
        , die eine abgespeckte <code>create-react-app</code>-Variante zur Verfügung stellen.
      </p>
      <p>Der Workflow ist dann wie folgt:</p>
      <ol>
        <li>
          <code>npm i -g cleanup-create-react-app</code>
          <small>
            <em>
              {" "}
              &mdash; <u>einmalig</u> global das Paket installieren
            </em>
          </small>
        </li>
        <li>
          <code>npx create-react-app</code>
          <small>
            <em> &mdash; starter template installieren</em>
          </small>
        </li>
        <li>
          <code>cleanup-create-react-app</code>
          <small>
            <em> &mdash; Projekt aufräumen lassen</em>
          </small>
        </li>
      </ol>
    </div>
  )
}

export default Dokumentation
