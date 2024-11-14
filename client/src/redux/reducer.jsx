import {
  EMPTY,
  GET_PROMPTS,
  GET_RANDOM_PROMPT,
  SET_IS_NEW_PROMPT
} from './actions'

const initialState = {
  loading: false,
  error: null,
  prompts: [],
  selectedPrompt: [],
  isNewPrompt: false
}

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case EMPTY:
      return {
        ...state
      }
    case GET_PROMPTS:
      return{
        ...state,
        prompts: payload
      }
    case GET_RANDOM_PROMPT:
      return{
        ...state,
        selectedPrompt: payload,
        isNewPrompt: true
      }
    case SET_IS_NEW_PROMPT:
      return {
        ...state,
        isNewPrompt: payload
      }
    default:
      return state;
  }
}

export default reducer;