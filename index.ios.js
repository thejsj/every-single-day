import React, { AppRegistry, Component, StyleSheet, NavigatorIOS } from 'react-native'

import store from './lib/stores'
import MainListView from './lib/components/main/main-list-view.js'
import AddNewHabitView from './lib/components/habit/add-new-habit-view.js'
import { Provider } from 'react-redux'

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

class EverySingleDay extends Component {

  render () {
    return (
      <Provider store={store}>
        <NavigatorIOS
          style={styles.navigator}
          ref='nav'
          initialRoute={{
            component: MainListView,
            title: 'Every Single Day',
            passProps: { store: store },
            rightButtonTitle: 'Add',
            onRightButtonPress: () => {
              this.refs.nav.push({
                component: AddNewHabitView,
                title: 'Add New',
                leftButtonTitle: 'Back',
                passProps: { store: store },
                onLeftButtonPress: () => this.refs.nav.pop()
              })
            }
          }}
        />
      </Provider>
    )
  }

}

AppRegistry.registerComponent('EverySingleDay', () => EverySingleDay)
