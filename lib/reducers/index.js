import moment from 'moment'

import {
  VisibilityFilters,
  ADD_HABIT,
  DELETE_HABIT,
  GET_ALL_HABITS,
  ADD_ENTRY,
  GET_ALL_ENTRIES_FOR_SINGLE_DAY,
  GET_STREAK_FOR_GOALS
} from '../actions'

const initialState = {
  visibilityFilter: VisibilityFilters.LOADING,
  habits: [],
  entries: {},
  dates: {
    today: +(moment().startOf('day').format('x')),
    yesterday: +(moment().subtract(1, 'day').startOf('day').format('x'))
  }
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

  if (action.type === ADD_ENTRY) {
    let goals = state.habits
    goals = goals.map(goal => {
      if (goal.entries === undefined) goal.entries = {}
      // FIXME: This could be linear instead of exponential, but let's not
      // optimize this just yet!
      let entry = action.obj
      if (entry.goalId === goal.id) {
        goal.entries[entry.entryDate] = entry
      }
      return goal
    })
    return Object.assign({}, state, {
      habits: goals
    })
  }

  if (action.type === GET_ALL_ENTRIES_FOR_SINGLE_DAY) {
    let goals = state.habits
    goals = goals.map(goal => {
      if (goal.entries === undefined) goal.entries = {}
      // FIXME: This could be linear instead of exponential, but let's not
      // optimize this just yet!
      action.obj.forEach(entry => {
        if (entry.goalId === goal.id) {
          goal.entries[entry.entryDate] = entry
        }
      })
      return goal
    })
    return Object.assign({}, state, {
      habits: goals
    })
  }

  if (action.type === GET_STREAK_FOR_GOALS) {
    let goals = state.habits
    goals = goals.map(goal => {
      goal.streakCount = 0
      if (action.obj[goal.id]) {
        goal.streakCount = action.obj[goal.id].length
        goal.streakEntires = action.obj[goal.id]
      }
      return goal
    })
    return Object.assign({}, state, {
      habits: goals
    })
  }

  return state
}
