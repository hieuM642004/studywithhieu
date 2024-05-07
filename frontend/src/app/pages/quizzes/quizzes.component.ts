import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent {
  quizData = [
    {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d"
    },
    {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b"
    },
    {
      question: "What does HTML stand for?",
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborginis",
      correct: "a"
    },
    {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "none of the above",
      correct: "b"
    }
  ];

  currentQuiz = 0;
  score = 0;
  selectedAnswer: string | null = null;
  currentQuizData = this.quizData[this.currentQuiz];

  loadQuiz() {
    this.selectedAnswer = null;
    this.currentQuizData = this.quizData[this.currentQuiz];
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  submitAnswer() {
    if (this.selectedAnswer) {
      if (this.selectedAnswer === this.currentQuizData.correct) {
        this.score++;
      }
      this.currentQuiz++;
      if (this.currentQuiz < this.quizData.length) {
        this.loadQuiz();
      } else {
        alert(`You answered ${this.score}/${this.quizData.length} questions correctly`);
      }
    }
  }
}
