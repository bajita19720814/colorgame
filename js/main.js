'use strict';
{
  const colors = [
    {n:"赤", c:"red"},
    {n:"青", c:"blue"},
    {n:"黄", c:"yellow"},
    {n:"緑", c:"green"},
    {n:"紫", c:"purple"},
    {n:"黒", c:"black"},
  ];
  let gameStarted = false;
  const main = document.getElementById("main");
  const question = document.getElementById("question");
  const choices = document.getElementById("choices"); 
  const result = document.getElementById("result"); 
  const next = document.getElementById("next"); 
  const select = ["文字の色", "文字", "背景の色"];
  let score = 0;
  let quizNum = 1;
  function shaffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  class SetQuiz {
    constructor() {
     this.colorSet = [...colors];
     this.correctsel = select[Math.floor(Math.random() * 3)];
     this.randomColors = shaffle(colors);
     this.correctColor = this.colorSet.splice(Math.floor(Math.random() * 6), 1)[0];
     this.otherColor1 = this.colorSet.splice(Math.floor(Math.random() * 5), 1)[0];
     this.otherColor2 = this.colorSet.splice(Math.floor(Math.random() * 4), 1)[0];
    
      if (this.correctsel === select[0]) {
        question.textContent = `${select[0]}は？`;
        main.style.color = this.correctColor.c;
        main.textContent = this.otherColor1.n;
        main.style.backgroundColor = this.otherColor2.c;
      } else if (this.correctsel === select[1]) {
        question.textContent = `${select[1]}は？`;
        main.style.color = this.otherColor1.c;
        main.textContent = this.correctColor.n;
        main.style.backgroundColor = this.otherColor2.c;
      } else {
        question.textContent = `${select[2]}は？`;
        main.style.color = this.otherColor1.c;
        main.textContent = this.otherColor2.n;
        main.style.backgroundColor = this.correctColor.c;
      }
      this.randomColors.forEach(color => {
        this.div = document.createElement("div");
        this.div.textContent = color.n;
        this.div.addEventListener("click", () => {
          if ((this.correctsel === select[0] && color === this.correctColor) || (this.correctsel === select[1] && color === this.correctColor) || (this.correctsel === select[2] && color === this.correctColor)) {
            score++;
            result.textContent = `正解！　 SCORE:  ${score}/${quizNum}`;
          } else {
            result.textContent = `残念！   SCORE:  ${score}/${quizNum}`;
          }
          result.classList.add("show");
          next.classList.remove("hidden");
        });
        choices.appendChild(this.div);
      });
    }     
  }
  
  next.addEventListener("click", () => {
    quizNum++;
    result.classList.remove("show");
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    new SetQuiz();
    next.classList.add("hidden");
  });
  document.addEventListener("click", () => {
    if (gameStarted) {
      return;
    }
    new SetQuiz();
    gameStarted = true;
  });
}