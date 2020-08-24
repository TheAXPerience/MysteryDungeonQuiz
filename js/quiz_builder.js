import React from './react.js';

class Question {
  constructor(q, as) {
    // q : string = question text
    // as : json array of json objects = answer text and points
    this.question = q;
    // convert from json to javascript
    // Note: same index = matching text to points
    this.answerTexts = [];
    this.answerPoints = [];
  }

  get toJSX() {
    // using React, convert question and answers to toJSX
    // for reference, see quiz.html
    return null;
  }
}

class QuestionList {
  constructor() {
    this.questions = [];
  }

  addQuestions(jsonArray) {
    // from json array:
    // 1. for 8-10 times, pull random question from array
    // 2. convert to Question (class above)
    // 3. add final question
  }

  getNext() {
    if (this.questions.length <= 0) {
      return null;
    }
    const ret = this.questions.shift();
    return ret;
  }

  hasNext() {
    return this.questions.length > 0;
  }
}

class Natures {
  constructor() {
    this.counts = {};
    this.flavor = {};
    this.pokemon = {};
  }

  addNature(jsonObject) {
    // for each nature:
    // 1. add count = 0
    // 2. add object relating pronoun to Pokemon
    // 3. add flavor text
  }

  getNature(gender) {
    // gender : string = he, she, or they
    // 1. find highest count (ties == coin flip or something)
    // 2. return nature, pokemon, and the flavor text
  }

  addCounts(str) {
    // str = space-separated list of natures to increment
    // 1. split by " "
    // 2. for each element, increment the related count
  }
}
