import AppActions from '../actions/AppActions.js'
import Constants from '../Util/Constants'

const rootReducer = (state, action) => {
  if (action.type === AppActions.ADD_TODO) {
    return {
      ...state,
      next_index: state.next_index + 1,
      todos: [...state.todos,
      {
        id: state.next_index,
        details: action.details,
        status: Constants.STATUS_PENDING
      }]
    }
  } 
  else if (action.type === AppActions.APPLY_FILTER) {
    return {
      ...state,
      visibility: action.filter
    }
  }
  else if (action.type === AppActions.TOGGLE_COMPLETED) {
    return {
      ...state,
      todos : state.todos.map((t)=>{
        if (t.id === action.id)
          t.status = t.status === Constants.STATUS_COMPLETED ? Constants.STATUS_PENDING : Constants.STATUS_COMPLETED;
        return t
      })
    }
  }
  else if (action.type === AppActions.INIT_STATE) {
    return action.state;
  }
  else if (action.type === AppActions.CLEAR_STATE) {
      return Constants.INITIAL_STATE
  }
  else {
    return state;
  }
}

export default rootReducer;