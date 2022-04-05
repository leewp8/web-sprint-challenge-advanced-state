import React from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { selectAnswer, fetchQuiz, postAnswer } from '../state/action-creators'

function Quiz(props) {
  const { quiz, selectedAnswer, selectAnswer } = props

  useEffect(() => {
    props.fetchQuiz()
  }, []);
// console.log(selectAnswer)

const handleSubmit = evt => {
  evt.preventDefault()
  props.postAnswer({quiz_id: quiz.quiz_id, answer_id: selectedAnswer.answer_id})
}

const isDisabled = () => {
  if(document.getElementsByClassName('answer').value === 'answer selected') {
    return true
  } else {
    return false
  }
}

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${selectedAnswer?.answer_id===quiz.answers[0].answer_id? ' selected': ''}`}>
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(props.quiz.answers[0])}>
                  {`${selectedAnswer?.answer_id!==quiz.answers[0].answer_id? 'Select': 'SELECTED'}`}
                </button>
              </div>

              <div className={`answer${selectedAnswer?.answer_id===quiz.answers[1].answer_id? ' selected': ''}`}>
              {quiz.answers[1].text}
                <button onClick={() => selectAnswer(props.quiz.answers[1])}>
                {`${selectedAnswer?.answer_id!==quiz.answers[1].answer_id? 'Select': 'SELECTED'}`}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit} disabled={isDisabled()} >Submit answer</button> 
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {selectAnswer, fetchQuiz, postAnswer})(Quiz)


// disabled={isDisabled()}