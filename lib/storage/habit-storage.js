import React from 'react-native'
import SQLite from 'react-native-sqlite-storage'

SQLite.DEBUG(true)
SQLite.enablePromise(true)

const { AlertIOS } = React

const DB_NAME = 'everysingleday'

const GOALS_TABLE = `CREATE TABLE IF NOT EXISTS 'goals' (
  'id' integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  'name' text NOT NULL,
  'created' integer NOT NULL,
  'isAffirmative' integer NOT NULL
);`

const ENTRIES_TABLE = `CREATE TABLE IF NOT EXISTS 'entries' (
  'id' integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  'goalId' integer,
  'created' integer,
  'entryDate' integer,
  'accomplished' integer,
  FOREIGN KEY ('goalId') REFERENCES 'goals' ('id') ON DELETE CASCADE ON UPDATE CASCADE
);`

class GoalStorage {

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
        // .then(() => this.db.executeSql(`DROP TABLE IF EXISTS goals`))
        // .then(() => this.db.executeSql(`DROP TABLE IF EXISTS entries`))
        .then(() => this.db.executeSql(GOALS_TABLE))
        .then(() => this.db.executeSql(ENTRIES_TABLE))
    })
      .catch(function (err) {
        console.log('Errr setting initial state', err)
        AlertIOS.alert('Error Setting Initial Data', err.message || err)
      })
  }

  _rowParser ([tx]) {
    var len = tx.rows.length
    var rows = []
    for (let i = 0; i < len; i++) {
      rows.push(tx.rows.item(i))
    }
    return rows
  }

  createGoal (goal) {
    if (goal.isAffirmative === 'yes') {
      goal.isAffirmative = 1
    } else if (goal.isAffirmative === 'no') {
      goal.isAffirmative = 0
    } else {
      throw new Error(`Goal must be either 'yes' or 'no'`)
    }
    return this.db.executeSql(`
      INSERT INTO goals (name, created, isAffirmative)
      VALUES ('${goal.name}', ${goal.created}, ${goal.isAffirmative})
    `)
      .then(() => goal)
  }

  getAllGoals (forceUpdate) {
    return this.db.executeSql(`
      SELECT * FROM goals
    `)
      .then(this._rowParser)
  }

  deleteGoal (id) {
    return this.db.executeSql(`
      DELETE FROM goals
      WHERE id = ${id}
    `)
  }

  getAllEntriesForSingleDay (dayTimestamp, goals) {
    // if (goals) {
      // let goalIdString = goals.map(x => x.id).join(', ')
      // ` AND goalId IN (${goalIdString})`
    // }
    return this.db.executeSql(`
      SELECT * FROM entries WHERE entryDate = ${dayTimestamp}
    `)
      .then(this._rowParser)
  }

  createEntry (entry) {
    if (entry.accomplished === true) {
      entry.accomplished = 1
    } else if (entry.accomplished === false) {
      entry.accomplished = 0
    } else {
      throw new Error('`accomplished` must be a boolean')
    }
    return this.db.executeSql(`
      INSERT INTO entries (goalId, created, entryDate, accomplished)
      VALUES ('${entry.goal.id}', ${entry.created}, ${entry.entryDate}, ${entry.accomplished})
    `)
      .then(() => entry)
  }

}

module.exports = GoalStorage
