import {Question, QuestionList, Natures} from './quiz_builder.js';

const natures = new Natures();
const q_list = new QuestionList();

const testCases = [
  'Sassy Calm Sassy Calm Sassy she',        // case: multiple poitns in > 1, find correct max
  'Hardy Docile they',                              // case = tie
  'Calm he',
  'Calm she',
  'Calm they',                                          // cases: correct gender
  'Lonely Docile Quirky Brave Calm Timid Jolly Relaxed Quiet Hardy Rash Bold Naive Impish Hasty Sassy', // case: tie with everyone
  'Lonely Docile Quirky Brave Calm Timid Jolly Relaxed Quiet Hardy Rash Bold Naive Impish Hasty Sassy Lonely', // case: everyone tied but one, which is higher
]

const fill_question_table = function(jsonArray) {
  const tbody = $('#qas tbody');
  q_list.addQuestions(jsonArray);
  while (q_list.hasNext()) {
    const q = q_list.getNext();
    tbody.append(q.to_row());
    natures.addCounts(q.getAnswerPoints(Math.floor(Math.random() * q.getNumAnswers())));
  }
  const q = q_list.getLastQuestion();
  tbody.append(q.to_row());
  natures.addCounts(q.getAnswerPoints(Math.floor(Math.random() * q.getNumAnswers())));
}

const fillNatures = function(jsonArray) {
  natures.addNatures(jsonArray);
}

const addToBody = function() {
  const body = $('body');
  const result = natures.getNature();

  const link = './assets/' + result.pokemon.toLowerCase() + '_portrait.png';
  body.append('<img src="' + link + '" alt="' + result.pokemon + '"/>');
  body.append('You seem to be... the ' + result.nature+ ' type! ' + result.flavor + 'Will be a ' + result.pokemon + '!<br/>');
}

const testNatures = function() {
  testCases.forEach(element => {
    natures.resetCounts();
    natures.addCounts(element);
    addToBody();
  });
}

$(document).ready(function() {
  $.getJSON('json/mysterydungeonquiz.json')
    .done(function(json) {
      fillNatures(json.personalities);
      fill_question_table(json.questions);
      const tbody = $('#natures tbody');
      tbody.append(natures.to_row());

      addToBody();
      const counts = natures.getAllCounts();
      let showCounts = '<ul>'
      counts.forEach(n => {
        showCounts += '<li>' + n.nature;
        showCounts += `<img src="${n.picture}"/>`;
        showCounts += n.count + ` (${n.percent}%)` + '</li>';
      })
      $('body').append(showCounts + '</ul>');

      testNatures();
    }).fail(function(jqxhr, textStatus, error) {
      console.log("Request failed: " + textStatus + ", " + error);
    });
});
