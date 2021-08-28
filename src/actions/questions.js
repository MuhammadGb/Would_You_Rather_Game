import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_ANSWER = 'SAVE_ANSWER';


export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS, 
        questions
    }
}

export function saveQuestion (question) {
  return {
    type: SAVE_QUESTION,
    question
  }
}

export function saveAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveQuestion (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText,
        })
        .then((question) => {
            dispatch(saveQuestion(question));
        })
    }
}

export function handleSaveAnswer (qid, answer) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      return _saveQuestionAnswer({authedUser, qid, answer})
          .then(() => {
              dispatch(saveAnswer(authedUser, qid, answer));
            })
        }
    }