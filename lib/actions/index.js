import HabitStorage from '../storage/habit-storage.js'
const habitStorage = new HabitStorage()
let initPromise = habitStorage.init()

/*
 * action types
 */

export const ADD_HABIT = 'ADD_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'
export const ADD_ENTRY = 'ADD_ENTRY'
export const COMPLETE_ENTRY = 'COMPLETE_ENTRY'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addHabit (obj) {
  return { type: ADD_HABIT, obj }
}

export function saveHabit (obj) {
  return dispatch => {
    return initPromise
      .then(function () { return habitStorage.createHabit(obj) })
      .then(json => dispatch(addHabit(json)))
      .catch((err) => console.log(err))
  }
}

export function deleteHabit (text) {
  return { type: DELETE_HABIT, text }
}

export function addEntry (index) {
  return { type: ADD_ENTRY, index }
}

export function completeEntry (index) {
  return { type: COMPLETE_ENTRY, index }
}

export function setVisibilityFilter (filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
