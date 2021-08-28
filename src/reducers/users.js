import {RECEIVE_USERS} from '../actions/users'
import { SAVE_QUESTION, SAVE_ANSWER } from '../actions/questions';

export default function users (state = {}, action) {
    if(action.type === RECEIVE_USERS) {
        return {...state, ...action.users}
    }
    else if(action.type === SAVE_ANSWER) {
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
                ...state[action.authedUser].answers,
                [action.qid]: action.answer
            }
          }
        }
    }
    else if(action.type === SAVE_QUESTION) {
        const { question } = action;
        return {
            ...state,
            [question.author]: {
                ...state[question.author],
                questions: state[question.author].questions.concat([question.id])
            }
        }
    }
    return state; 
}
