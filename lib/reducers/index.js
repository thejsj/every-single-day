import {
  VisibilityFilters,
  ADD_HABIT,
  DELETE_HABIT,
  GET_ALL_HABITS,
  GET_ALL_ENTRIES_FOR_SINGLE_DAY
} from '../actions'

const initialState = {
  visibilityFilter: VisibilityFilters.LOADING,
  habits: [],
  entries: {}
}

export default function mainReducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type === ADD_HABIT) {
    let habits = [].concat(state.habits).concat([action.obj])
    return Object.assign({}, state, {
      habits: habits
    })
  }

  if (action.type === GET_ALL_HABITS) {
    let habits = action.obj
    return Object.assign({}, state, {
      habits: habits,
      visibilityFilter: VisibilityFilters.SHOW_ALL
    })
  }

  if (action.type === DELETE_HABIT) {
    let habits = state.habits.filter(h => h.id !== action.id)
    return Object.assign({}, state, {
      habits: habits
    })
  }

  if (action.type === GET_ALL_ENTRIES_FOR_SINGLE_DAY) {
    console.log('ACTION', action)
    let goals = state.habits
    goals.forEach(goal => {
      if (goal.entries === undefined) goal.entries = {}
    })
    action.obj.forEach(entry => {
      goals[entry.goalId].entries[entry.entryDate] = entry
    })
    return Object.assign({}, state, {
      habits: goals
    })
  }

  // For now, don’t handle any actions
  // and just return the state given to us.
  return state
}
