var React = require('react-native')
var { AppRegistry, NavigatorIOS, StyleSheet } = React

let MainListView = require('./lib/components/main/main-list-view.js')
var AddNewHabitView = require('./lib/components/habit/add-new-habit-view.js')
const HabitStorage = require('./lib/storage/habit-storage.js')
const habitStorage = new HabitStorage()

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

var EverySingleDayApp = React.createClass({

  getInitialState: function () {
    habitStorage.getAllHabits()
      .then((habits) => this.forceUpdate())
    return {}
  },

  render: function () {
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
              onLeftButtonPress: () => this.refs.nav.pop()
            })
          }
        }}
      />
    )
  }

})

AppRegistry.registerComponent('EverySingleDay', () => EverySingleDayApp)
