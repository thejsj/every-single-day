import HabitStorage from '../storage/habit-storage.js'
const habitStorage = new HabitStorage()
let initPromise = habitStorage.init()

/*
 * action types
 */

export const GET_ALL_HABITS = 'GET_ALL_HABITS'
export const ADD_HABIT = 'ADD_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'
export const ADD_ENTRY = 'ADD_ENTRY'
export const GET_ALL_ENTRIES_FOR_SINGLE_DAY = 'GET_ALL_ENTRIES_FOR_SINGLE_DAY'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  LOADING: 'LOADING',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function getAllHabits () {
  return dispatch => {
    return initPromise
      .then(function () { return habitStorage.getAllGoals() })
      .then(json => dispatch(_getAllHabits(json)))
      .catch(console.log)
  }
}

export function _getAllHabits (obj) {
  return { type: GET_ALL_HABITS, obj }
}

export function addHabit (obj) {
  return dispatch => {
    return initPromise
      .then(function () { return habitStorage.createGoal(obj) })
      .then(json => dispatch(_addHabit(json)))
      .catch(console.log)
  }
}

export function _addHabit (obj) {
  return { type: ADD_HABIT, obj }
}

export function deleteHabit (id) {
  return dispatch => {
    return initPromise
      .then(function () { return habitStorage.deleteGoal(id) })
      .then(json => dispatch(_deleteHabit(id)))
      .catch(console.log)
  }
}

export function _deleteHabit (id) {
  return { type: DELETE_HABIT, id }
}

export function addGoalEntry (obj) {
  return dispatch => {
    return initPromise
      .then(function () { return habitStorage.createEntry(obj) })
      .then(json => dispatch(_addGoalEntry(json)))
      .catch(console.log)
  }
}

export function _addGoalEntry (obj) {
  return { type: ADD_ENTRY, obj }
}

export function getAllEntriesForSingleDay (goals, dayTimestamp) {
  console.log('getAllEntriesForSingleDay')
  return dispatch => {
    return initPromise
      .then(function () { return habitStorage.getAllEntriesForSingleDay(goals, dayTimestamp) })
      .then(json => dispatch(_getAllEntriesForSingleDay(json)))
      .then(() => console.log('getAllEntriesForSingleDay DONE'))
      .catch(console.log)
  }
}

export function _getAllEntriesForSingleDay (obj) {
  return { type: GET_ALL_ENTRIES_FOR_SINGLE_DAY, obj }
}

export function setVisibilityFilter (filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
