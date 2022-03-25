import React from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { selectAnswer, fetchQuiz } from '../state/action-creators'

function Quiz(props) {
  const { quiz, selectedAnswer, selectAnswer } = props

  useEffect(() => {
    props.fetchQuiz()
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className={`answer${selectedAnswer===null? '': ' selected'}`}>
                A function
                <button onClick={selectAnswer}>
                  {`${selectedAnswer===null? 'Select': 'SELECTED'}`}
                </button>
              </div>

              <div className={`answer${selectedAnswer===null? '': ' selected'}`}>
                An elephant
                <button onClick={selectAnswer}>
                {`${selectedAnswer===null? 'Select': 'SELECTED'}`}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
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

export default connect(mapStateToProps, {selectAnswer, fetchQuiz})(Quiz)
