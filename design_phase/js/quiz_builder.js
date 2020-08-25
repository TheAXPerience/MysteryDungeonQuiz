export const printArray = function(arr) {
  let str = '';
  arr.forEach(e => {
    str += e + ", "
  })
  return ('[' + str.substr(0, str.length-2) + ']');
}

export function Answer(text, points) {
  this.text = text;
  this.points = points;
}

export function toPortrait(str) {
  const s = str.toLowerCase();
  return `./assets/${s}_portrait.png`;
}

Answer.prototype.toString = function aToString() {
  return this.text;
};

export class Question {
  constructor(q, as) {
    // q : string = question text
    // as : json array of json objects = answer text and points
    this.question = q;
    // convert from json to javascript
    // Note: same index = matching text to points
    this.answers = [];

    for (let i = 0; i < as.length; i++) {
      this.answers.push(new Answer(as[i].text, as[i].points));
    }
  }

  toString() {
    return `${this.question}: ${printArray(this.answers)}`;
  }

  containsNatures(arr) {
    let foundAll = true;
    arr.forEach(s => {
      // for each s in arr
      let found = false;
      this.answers.forEach(a => {
        found |= a.points.includes(s);
      });
      foundAll &= found;
    });
    return foundAll;
  }

  getAnswerTexts() {
    const ret = [];
    this.answers.forEach(a => {
      ret.push(a.text);
    });
    return ret;
  }

getNumAnswers() {
  return this.answers.length;
}

  getAnswerPoints(num) {
    return this.answers[num].points;
  }

  to_row() {
    // convert to a table row
    let str = ""
    this.answers.forEach(element => str += "<td>" + element.text + "<br/>" + element.points + "</td>");
    return "<tr><td>" + this.question + "</td>" + str + "</tr>";
  }
}

export class QuestionList {
  constructor() {
    this.questions = [];
  }

  addQuestion(jsonObject) {
    this.questions.push(new Question(jsonObject.q, jsonObject.as));
  }

  addQuestions(jsonArray) {
    // from json array:
    // 2. convert to Question (class above)
    // 3. add final question
    const $this = this;
    jsonArray.forEach(jsonObject => {
      $this.addQuestion(jsonObject);
    });
  }

  getNext() {
    if (this.questions.length <= 0) {
      return null;
    }
    const index = Math.floor(Math.random() * this.questions.length);
    const ret = this.questions.splice(index, 1);
    return ret[0];
  }

  hasNext() {
    return this.questions.length > 0;
  }

  getLastQuestion() {
    // will always return the same final question
    return new Question('Select your preferred pronouns.', [
      {'text': 'He/him', 'points': 'he'},
      {'text': 'She/her', 'points': 'she'},
      {'text': 'They/them', 'points': 'they'}
    ]);
  }
}

export class Natures {
  constructor() {
    this.gender = 'he'; // default
    this.counts = {};
    this.flavor = {};
    this.pokemon = {};
  }

  addNature(jsonObject) {
    // for each nature:
    // 1. add count = 0
    // 2. add object relating pronoun to Pokemon
    // 3. add flavor text
    const name = jsonObject.name;
    this.counts[name] = 0;
    this.flavor[name] = jsonObject.flavor;
    this.pokemon[name] = {
      "he": jsonObject.he,
      "she": jsonObject.she,
      "they": jsonObject.they
    };
  }

  addNatures(jsonArray) {
    const $this = this;
    jsonArray.forEach(function(n) {
      $this.addNature(n);
    });
  }

  to_row() {
    let str = "";
    Object.keys(this.counts).forEach(key => {
      let curr = "<tr>";
      curr += "<td>" + key + '(' + this.counts[key] + ')</td>'
      curr += "<td>" + this.pokemon[key].he + "</td>"
      curr += "<td>" + this.pokemon[key].she + "</td>"
      curr += "<td>" + this.pokemon[key].they + "</td>"
      curr += "<td>" + this.flavor[key] + "</td>"
      str += curr + "</tr>";
    });
    return str;
  }

  getNature() {
    // 1. find highest count (ties == coin flip or something)
    // 2. return nature, pokemon, and the flavor text
    let max = []
    let maxScore = -1;
    Object.keys(this.counts).forEach(key => {
      // console.log(key + " : " + this.counts[key]);
      if (this.counts[key] > maxScore) {
        max = [key];
        maxScore = this.counts[key];
      } else if (this.counts[key] === maxScore) {
        max.push(key);
      }
    });

    const nature = max[Math.floor(Math.random() * max.length)];
    return {
      "nature": nature,
      "pokemon": this.pokemon[nature][this.gender],
      "flavor": this.flavor[nature]
    }
  }

  addCounts(str) {
    // str = space-separated list of natures to increment
    // 1. split by " "
    // 2. for each element, increment the related count
    const s = str.split(' ');
    s.forEach(element => {
      if (this.counts[element] === undefined && element.length > 0) {
        this.gender = element;
      } else if (element.length > 0){
        this.counts[element] += 1;
      }
    });
  }

  resetCounts() {
    Object.keys(this.counts).forEach(key => {
      this.counts[key] = 0;
    });
    this.gender = 'he';
  }

  getAllCounts() {
    // return counts in an array (each containing an object of 3) in sorted order
    const ret = [];
    let sumCount = 0;
    Object.keys(this.counts).forEach(key => {
      sumCount += this.counts[key];
    });
    Object.keys(this.counts).forEach(key => {
      let curr = {
        'nature': key,
        'picture': toPortrait(this.pokemon[key][this.gender]),
        'count': this.counts[key],
        'percent': Math.round(100 * (this.counts[key] / sumCount))
      }
      ret.push(curr);
    });

    // sort
    ret.sort(function(a,b) {
      return b.count - a.count;
    })
    return ret;
  }
}
/*
window.Question = Question;
window.QuestionList = QuestionList;
window.Natures = Natures;*/
