import axios from 'axios'

const backend = 'http://localhost:3001'

export const EMPTY = 'EMPTY'
export const GET_PROMPTS = "GET_PROMPTS"
export const GET_RANDOM_PROMPT = "GET_RANDOM_PROMPT"
export const SET_IS_NEW_PROMPT = "SET_IS_NEW_PROMPT"

export const empty = () => {
  return {
    type: EMPTY
  }
}

// PROMPTS

export const getPrompts = () => {
  return (dispatch) => {
    return axios.get(`${backend}/prompt/getall`)
    .then(res => dispatch({type: GET_PROMPTS, payload: res.data}))
    .catch(error => console.log(error))
  }
}

export const getRandomPrompt = () => {
  return (dispatch) => {
    return axios.get(`${backend}/prompt/getrandom`)
    .then(res => dispatch({type: GET_RANDOM_PROMPT, payload: res.data}))
    .catch(error => console.log(error))
  }
}

export const voteInPrompt = (id , opt) => {
  return (dispatch) => {
    return axios.put(`${backend}/prompt/vote/${id}/${opt}`)
    .catch(error => console.log(error))
  }
}

export const setIsNewPrompt = (type) => {
  return (dispatch) => {
    return dispatch({type: SET_IS_NEW_PROMPT, payload: type})
  }
}
