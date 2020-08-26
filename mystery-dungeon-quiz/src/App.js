import React from 'react';
import ReactDOM from 'react-dom';
import { TextBox } from './js/textbox.js'
import './App.css'

function Begin(e) {
  // function that is called to begin the process
  // first, must load questions from json file
  // second, must generate random number from 8 to 10
  // third, create a React.Component class that manages the text-box (another js file)
  // fourth, create a React.Component class that shows the result screen (another js file)
  let numQuestions = 64; // apprently there are 64 questions in the json file
  if (e.target.value === 'random') {
    numQuestions = Math.floor(Math.random() * 3) + 8;
  }
  ReactDOM.render(<TextBox num={numQuestions}/>, document.getElementById('root'));
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
      <button type="button" name="button" value="random" onClick={e => Begin(e)}>Let the questions begin!</button>
      <br/><br/>
      <button type="button" name="button" value="all" onClick={e => Begin(e)}>Take the full test!</button>
    </div>
  );
}

export default App;
