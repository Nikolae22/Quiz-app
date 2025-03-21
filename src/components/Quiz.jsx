import {useState} from "react";

import QUESTIONS from '../data/questions.js'
import QuestionTimer from "./QuestionTimer.jsx";


export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevState) => {
            return [
                ...prevState,
                selectedAnswer
            ]
        })

    }

    if (quizIsComplete) {
        return <div id='summary'>
            <img src="../assets/quiz-complete.png" alt="Quiz complete"/>
            <h2>Quiz complete</h2>
        </div>
    }

    const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffleAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="questions">
                <QuestionTimer
                    timeout={10000}
                    onTimeout={() => handleSelectAnswer(null)}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {shuffleAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}
                            >{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}