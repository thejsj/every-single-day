import React, { AppRegistry, Component, StyleSheet, NavigatorIOS } from 'react-native'

const MainListView = require('./lib/components/main/main-list-view.js')
const AddNewHabitView = require('./lib/components/habit/add-new-habit-view.js')
const HabitStorage = require('./lib/storage/habit-storage.js')
const habitStorage = new HabitStorage()

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

class EverySingleDay extends Component {

  constructor () {
    super()
    habitStorage.init()
      .then(this.forceUpdate.bind(this))
    habitStorage
      .onUpdate(this.forceUpdate.bind(this))
  }

  render () {
    return (
      <NavigatorIOS
        style={styles.navigator}
        ref='nav'
        initialRoute={{
          component: MainListView,
          title: 'Every Single Day',
          passProps: { habitStorage: habitStorage },
          rightButtonTitle: 'Add',
          onRightButtonPress: () => {
            this.refs.nav.push({
              component: AddNewHabitView,
              title: 'Add New',
              leftButtonTitle: 'Back',
              passProps: { habitStorage: habitStorage },
              onLeftButtonPress: () => this.refs.nav.pop()
            })
          }
        }}
      />
    )
  }

}

AppRegistry.registerComponent('EverySingleDay', () => EverySingleDay)
