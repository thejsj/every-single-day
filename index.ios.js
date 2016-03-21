import React, { AppRegistry, Component, StyleSheet, NavigatorIOS } from 'react-native'
import { Provider } from 'react-redux'

import store from './lib/stores'
import { getAllHabits } from './lib/actions'
import MainMenuView from './lib/components/main/main-menu-view.js'

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

class EverySingleDay extends Component {

  componentDidMount () {
    store.dispatch(getAllHabits())
  }

  render () {
    return (
      <Provider store={store}>
        <NavigatorIOS
          style={styles.navigator}
          ref='nav'
          initialRoute={{
            component: MainMenuView,
            title: 'Every Single Day',
            passProps: { store: store }
          }}
        />
      </Provider>
    )
  }

}

AppRegistry.registerComponent('EverySingleDay', () => EverySingleDay)
