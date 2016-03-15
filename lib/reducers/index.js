import { VisibilityFilters, ADD_HABIT } from '../actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  habits: [],
  entries: {}
}

export default function mainReducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type === ADD_HABIT) {
    state.habits.push(action.obj)
    return state
  }

  // For now, don’t handle any actions
  // and just return the state given to us.
  return state
}
