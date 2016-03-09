var React = require('react-native')
var uuid = require('uuid')
var { AsyncStorage, AlertIOS } = React

const NAMESPACE = 'EVERY_SINGLE_DAY_167_'

let habits = {}

class HabitStorage {

  constructor () {
    this.habits = habits
    this.habitsLoaded = false
  }

  getItem (key) {
    return AsyncStorage.getItem(NAMESPACE + key)
  }

  setItem (key, newValueString) {
    return AsyncStorage.setItem(NAMESPACE + key, newValueString)
  }

  removeItem (key) {
    return AsyncStorage.removeItem(NAMESPACE + key)
  }

  createHabit (habitObject) {
    habitObject.id = uuid.v4()
    habits[habitObject.id] = habitObject
    var json = JSON.stringify(habits)
    this.setItem('habits', json)
      .catch(function (err) {
        AlertIOS.alert('Save Error', err.message || err)
      })
    return habitObject.id
  }

  getAllHabits (forceUpdate) {
    if (this.habitsLoaded || forceUpdate) return Promise.resolve(habits)
    this.habitsLoaded = true
    return this.getItem('habits')
      .then((habitsJSONString) => {
        let newHabits = JSON.parse(habitsJSONString)
        Object.keys(newHabits).forEach(function (habitKey) {
          habits[habitKey] = newHabits[habitKey]
        })
        return habits
      })
  }

  deleteHabit (id) {
    delete habits[id]
    var json = JSON.stringify(habits)
    return this.setItem('habits', json)
      .catch(function (err) {
        AlertIOS.alert('Save Error', err.message || err)
      })
  }

}

module.exports = HabitStorage
