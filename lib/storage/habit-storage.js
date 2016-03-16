import React from 'react-native'
import SQLite from 'react-native-sqlite-storage'

SQLite.DEBUG(true)
SQLite.enablePromise(true)

const { AlertIOS } = React

let habits = {}

const DB_NAME = 'everysingleday'

const HABITS_TABLE = `CREATE TABLE IF NOT EXISTS 'habits' (
  'id' integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  'name' text NOT NULL,
  'created' integer NOT NULL,
  'isAffirmative' integer NOT NULL
);`

const ENTRIES_TABLE = `CREATE TABLE IF NOT EXISTS 'entries' (
  'id' integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  'habit' integer,
  'created' integer,
  'accomplished' integer,
  FOREIGN KEY ('habit') REFERENCES 'habits' ('id') ON DELETE CASCADE ON UPDATE CASCADE
);`

class HabitStorage {

  constructor () {
    this.habits = habits
    this.listeners = []
  }

  init () {
    return SQLite.openDatabase(
      DB_NAME + '.db',
      '1.0',
      DB_NAME,
      200000
    )
    .then((db) => {
      this.db = db
      return Promise.resolve()
        .then(() => this.db.executeSql(HABITS_TABLE))
        .then(() => this.db.executeSql(ENTRIES_TABLE))
    })
      .catch(function (err) {
        console.log('Errr setting initial state', err)
        AlertIOS.alert('Error Setting Initial Data', err.message || err)
      })
  }

  createHabit (habit) {
    if (habit.isAffirmative === 'yes') {
      habit.isAffirmative = 1
    } else if (habit.isAffirmative === 'no') {
      habit.isAffirmative = 0
    } else {
      throw new Error(`Habit must be either 'yes' or 'no'`)
    }
    return this.db.executeSql(`
      INSERT INTO habits (name, created, isAffirmative)
      VALUES ('${habit.name}', ${habit.created}, ${habit.isAffirmative})
    `)
      .then(() => habit)
  }

  getAllHabits (forceUpdate) {
    return this.db.executeSql(`
      SELECT * FROM habits
    `)
      .then(([tx]) => {
        var len = tx.rows.length
        var rows = []
        for (let i = 0; i < len; i++) {
          rows.push(tx.rows.item(i))
        }
        this.habits = rows
        return rows
      })
  }

  deleteHabit (id) {
  }

}

module.exports = HabitStorage
