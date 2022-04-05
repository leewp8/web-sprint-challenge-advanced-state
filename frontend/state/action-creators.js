import axios from 'axios'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, LOADING, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, RESET_FORM, SET_INFO_MESSAGE, INPUT_CHANGE} from './action-types'

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {type: MOVE_CLOCKWISE }
 }

export function moveCounterClockwise() {
  return {type: MOVE_COUNTERCLOCKWISE}
 }

export function selectAnswer({answers, answer_id}) {
  return {type: SET_SELECTED_ANSWER, payload: {answers, answer_id}}
 }

export function setMessage(message) {
  return {type: SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz() {
   
 } 

export function inputChange({newQuestion, newTrueAnswer, newFalseAnswer}) { 
  return {type: INPUT_CHANGE, payload: {newQuestion, newTrueAnswer, newFalseAnswer}}
}

export function resetForm() {
  return {type: RESET_FORM}
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      // console.log(res)
      dispatch({type: SET_QUIZ_INTO_STATE, payload: res.data })
    })
    .catch(err => {
      console.log( err )
    })
  }
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }

export function postAnswer(answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer)
      .then(res=> {
        console.log(res)
        dispatch(fetchQuiz())
        dispatch(setMessage(res.data.message))
      })
      .catch(err=> {
        console.log({err})
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(question) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', question)
    .then(res=> {
      console.log(res)
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch({type: RESET_FORM})
    })
    .catch(err => {
      dispatch({type: SET_INFO_MESSAGE, payload: err.response.data.message})
      dispatch({type: RESET_FORM})
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
