import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Wordl from "./Wordl";

fetch("dictionary.txt")
  .then(response => response.text())
  .then(data => {
    const dictionary = data.split("\n").filter(word => word);
    const answer = dictionary[Math.floor(Math.random() * dictionary.length)];

    ReactDOM.render(
      <React.StrictMode>
        <Wordl dictionary={dictionary} answer={answer} maxAttempts={6} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
