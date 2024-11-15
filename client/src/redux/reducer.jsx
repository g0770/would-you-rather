import {
  EMPTY,
  GET_PROMPTS,
  GET_RANDOM_PROMPT,
  SET_IS_NEW_PROMPT,
  DELETE_PROMPT
} from './actions'

const initialState = {
  loading: false,
  error: null,
  prompts: [],
  selectedPrompt: [],
  deletedPrompt: [],
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
    case DELETE_PROMPT:
      const deletedPrompt = state.prompts.filter(prompt => prompt.id !== payload)
      return {
        ...state,
        prompts: deletedPrompt
      }
    default:
      return state;
  }
}

export default reducer;