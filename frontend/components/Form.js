import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const {form} = props

  const onChange = evt => {
    const { id , value } = evt.target
    props.inputChange({ ...form, [id]: value})
  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz({ question_text: form.newQuestion, true_answer_text: form.newTrueAnswer, false_answer_text: form.newFalseAnswer })
  }

  const isDisabled = () => {
    if(form.newQuestion.trim().length >= 1 && form.newTrueAnswer.trim().length >= 1 && form.newFalseAnswer.trim().length >= 1) {
      return false
    } else {
      return true
    }
  }
console.log(form)
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion"  value={props.form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={props.form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={props.form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isDisabled()}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {

    form: state.form
  }
}

export default connect(mapStateToProps, actionCreators)(Form)
