import { useState, useRef } from "react";
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
  const preRef = useRef(null);
  const highlighted = highlight(text, languages.javascript, 'javascript');


  const handleChange = (e) => {
    setText(e.target.value);
  }

  return (
    <div className="code-editor-parent-container">
      <pre
      className="overlay-code"
        { ...{dangerouslySetInnerHTML: { __html: highlighted + '<br />' } } }
        ref={preRef}
      />
      <textarea 
        value={text} 
        onChange={handleChange}
        spellCheck={false}
        onScroll={(e)=>{
          preRef.current.scrollTop = e.target.scrollTop;
        }}
      ></textarea>
    </div>
  )
}

export default CodeEditor;
