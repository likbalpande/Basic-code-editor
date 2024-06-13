import { useState } from "react";
import { highlight, languages } from 'prismjs';
import './styles.css';

const CodeEditor = () => {
  const [text, setText] = useState(`
  import React from "react";
  import ReactDOM from "react-dom";

  function App() {
    return (
      <h1>Hello world</h1>
    );
  }

  ReactDOM.render(<App />, document.getElementById("root"));
`);

  const highlighted = highlight(text, languages.javascript, 'javascript');


  const handleChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  }

  return (
    <div className="code-editor-parent-container">
      <pre
      className="overlay-code"
        { ...{dangerouslySetInnerHTML: { __html: highlighted + '<br />' } } }
      />
      <textarea 
        value={text} 
        onChange={handleChange}
        spellCheck={false}
      ></textarea>
    </div>
  )
}

export default CodeEditor;
