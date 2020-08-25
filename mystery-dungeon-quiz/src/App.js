import React from 'react';
import ReactDOM from 'react-dom';
import { TextBox } from './js/textbox.js'
import './App.css'

function Begin() {
  // function that is called to begin the process
  // first, must load questions from json file
  // second, must generate random number from 8 to 10
  // third, create a React.Component class that manages the text-box (another js file)
  // fourth, create a React.Component class that shows the result screen (another js file)
  // readJSON();
  ReactDOM.render(<TextBox />,
    document.getElementById('root')
  );
}

function App() {
  return (
    <div id="text-box">
      <h2>
        Welcome!<br/>
        This is the portal that leads to the world inhabited only by Pokemon.<br/>
        Beyond this gateway, many new adventures and fresh experiences await your arrival!<br/>
        Before you depart for adventure, you must answer some questions.<br/>
        Be truthful when you answer them!<br/>
        Now, are you ready?<br/>
        Then...
      </h2>
      <button type="button" name="button" onClick={Begin}>Let the questions begin!</button>
    </div>
  );
}

export default App;
