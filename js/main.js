'use strict';
{
  const colors = [
    {n:"赤", c:"red", r:"あか"},
    {n:"青", c:"blue", r:"あお"},
    {n:"黄", c:"yellow", r:"きいろ"},
    {n:"緑", c:"green", r:"みどり"},
    {n:"紫", c:"purple", r:"むらさき"},
    {n:"黒", c:"black", r:"くろ"},
  ];
  let isGameStarted = false;
  const main = document.getElementById("main");
  const question = document.getElementById("question");
  const choices = document.getElementById("choices"); 
  const result = document.getElementById("result"); 
  const coment = document.getElementById("coment"); 
  const score = document.getElementById("score"); 
  const container = document.getElementById("container"); 
  const select = ["文字の色", "文字の読み", "背景の色"];
  let correctCount = 0;
  let quizNum = 1;
  let startTime;
  function shaffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  class SetQuiz {
    constructor(colors) {
      this.colors = shaffle(colors);
      this.sIndex = Math.floor(Math.random() * 3);
      this.qIndex = shaffle([0, 1, 2, 3, 4, 5]);
      this.setQuestion();
      this.setChoices();
      this.correctStatus = undefined;
    }
    setQuestion() {
      question.textContent = select[this.sIndex];
      main.textContent = this.colors[this.qIndex[1]].n;
      main.style.color = this.colors[this.qIndex[0]].c;
      main.style.backgroundColor = this.colors[this.qIndex[2]].c;
    }
    setChoices() {
      while (choices.firstChild) {
        choices.removeChild(choices.firstChild);
      }
      this.colors.forEach((color, index) => {
        const div = document.createElement('div');
        div.textContent = color.r;
        div.style.color = this.colors[index + 1 < 6 ? index + 1 : 0].c;
        choices.appendChild(div);
        div.addEventListener('click', () => {
          if (color === this.colors[this.qIndex[this.sIndex]]) {
            correctCount++;
            coment.textContent = '正解！！';
          } else {
            coment.textContent = '残念！不正解';
          }
          if (correctCount < 10) {
            score.style.fontSize = '24px';
            score.textContent = `SCORE : ${correctCount} / ${quizNum}`;
            result.classList.add('show');
            setTimeout(setNextQuiz, 900);
          } else {
            getResult();
          }
        });
      });
    }
  } 
  container.addEventListener('click', () => {
    if (isGameStarted) {
      return;
    }
    isGameStarted = true;
    correctCount = 0;
    quizNum = 1;
    result.classList.remove('show');
    new SetQuiz(colors);
    startTime = Date.now();
  });
  function setNextQuiz() {
    quizNum++;
    result.classList.remove('show');
    new SetQuiz(colors);
  }  
  function getResult() {
    const t = Math.floor((Date.now() - startTime) / 1000);
    coment.textContent = '10問正解！！';
    score.style.fontSize = '14px';
    score.textContent = `タイムは${t}秒だよ。もう一度チャレンジするにはクリックしてね`;
    result.classList.add('show');
    setTimeout(() => {
      isGameStarted = false;
    }, 50);
  }
}