import React from 'react';
import {toPortrait, QuestionList, Natures} from './questions.js';

export class TextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: this.props.num,
      q_list: null,
      n_list: null,
      loading: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const n = new Natures();
    const q = new QuestionList();
    fetch('./data/mysterydungeonquiz.json')
      .then(response => response.json())
      .then((jsonData) => {
        n.addNatures(jsonData.personalities);
        q.addQuestions(jsonData.questions);
        this.setState({
          left: this.state.left,
          q_list: q,
          n_list: n,
          loading: false,
          num_question: 1
        });
      });
  }

  handleClick(e) {
    this.state.n_list.addCounts(e.target.dataset.value);
    const tmp = this.state.left - 1;
    const num_question = this.state.num_question + 1;

    if (this.state.q_list.hasNext() || tmp < 0) {
      this.setState({
        left: tmp,
        q_list: this.state.q_list,
        n_list: this.state.n_list,
        loading: false,
        num_question: num_question
      });
    } else {
      this.setState({
        left: 0,
        q_list: this.state.q_list,
        n_list: this.state.n_list,
        loading: false,
        num_question: num_question
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <div id="text-box"><h2>Loading...</h2></div>;
    }

    const handleClick = this.handleClick;
    if (this.state.left > 0) {
      // get question from questions_list
      const get_q = this.state.q_list.getNext();
      let i = 1;
      let answers = get_q.getAnswers().map(function(a) {
        const data_value = a.points;
        const txt = a.text;
        return <a key={'a' + i++} data-value={data_value} onClick={e => handleClick(e, "data-value")}>{txt}</a>;
      });
      return (
        <div id="text-box">
          <div className="question">
            <h2>
              {this.state.num_question}. { get_q.q }
            </h2>
            </div>
          <div className="answers">
            {answers}
          </div>
        </div>);
    } else if (this.state.left === 0) {
      // get Last Question from questions_list
      const get_q = this.state.q_list.getLastQuestion();
      let i = 1;
      let answers = get_q.getAnswers().map(function(a) {
        const data_value = a.points;
        const txt = a.text;
        return <a key={'a' + i++} data-value={data_value} onClick={e => handleClick(e, "data-value")}>{txt}</a>;
      });
      return (
        <div id="text-box">
          <div className="question">
            <h2>
              { get_q.q }
            </h2>
            </div>
          <div className="answers">
            {answers}
          </div>
        </div>);
    } else {
      // show results screen
      return <ResultsScreen natures={this.state.n_list}/>;
    }
  }
}

class ResultsScreen extends React.Component {
  render() {
    let i = 1;
    const n = this.props.natures.getNature();
    const counts = this.props.natures.getAllCounts().map(function(n) {
      return (
        <tr key={'n' + i++}>
          <td>{n.nature}</td>
          <td><img src={n.picture} alt={n.nature}/></td>
          <td>{n.count} ({n.percent}%)</td>
        </tr>
      );
    });
    return (
      <div id="text-box">
      <h2>
        You seem to be... the {n.nature} type!
      </h2>
      <p>
        {n.flavor}<br/><br/>
        <img id="portrait" src={toPortrait(n.pokemon)} alt={n.pokemon} /><br/>
        Will be a <span className="player">{n.pokemon}</span>!
      </p>
      <table>
        <thead>
          <tr>
            <th>Nature</th>
            <th>Portrait</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {counts}
        </tbody>
      </table>
    </div>);
  }
}
