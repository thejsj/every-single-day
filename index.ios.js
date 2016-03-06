var React = require('react-native')
var { AppRegistry, NavigatorIOS, StyleSheet } = React

let MainListView = require('./components/main/main-list-view.js')
var AddNewHabitView = require('./components/habit/add-new-habit-view.js')

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

var AwesomeProject = React.createClass({

  render: function () {
    return (
      <NavigatorIOS
        style={styles.navigator}
        ref='nav'
        initialRoute={{
          component: MainListView,
          title: 'Every Single Day',
          passProps: { myProp: 'foo' },
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
