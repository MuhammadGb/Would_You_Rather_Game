import {getInitialData} from '../utils/api'
import {receiveQuestions} from '../actions/questions'
import {receiveUsers} from '../actions/users'


export function handleInitialData () {
    return dispatch => {
        return getInitialData().then(({users, questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}