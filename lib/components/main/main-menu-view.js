import React, {
  Text,
  Component,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import MainGoalListView from './main-goal-list-view.js'
import AddNewHabitView from '../habit/add-new-habit-view.js'
import GoalLogView from '../habit/goal-log-view.js'

var styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 70
  },
  buttonView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    flex: 1
  },
  buttonTextView: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

class MainMenuView extends Component {

  constructor (props) {
    super()
    this.state = this.state || {}
    this.state.today = +(moment().startOf('day').format('x'))
    this.state.yesterday = +(moment().subtract(1, 'day').startOf('day').format('x'))
  }

  _routeToView (newTitle, newView, date) {
    let opts = {
      component: newView,
      title: newTitle,
      passProps: { store: this.props.store, date: date || null }
    }
    if (newView.navOptions) {
      // FIXME: This doesn't allow to pass the right context into the func
      opts = Object.assign(opts, newView.navOptions(this))
    }
    this.props.navigator.push(opts)
  }

  render () {
    return (
      <View style={styles.mainView}>
        <TouchableHighlight onPress={() => this._routeToView('Today\'s Log', GoalLogView, this.state.today)}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonTextView}>
              {'Today\'s Log'}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._routeToView('Yesterday\'s Log', GoalLogView, this.state.yesterday)}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonTextView}>{'Yesterday\'s Log'}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._routeToView('Your Goals', MainGoalListView)}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonTextView}>Your Goals</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._routeToView('Create Goal', AddNewHabitView)}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonTextView}>Create Goal</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

}

MainMenuView.propTypes = {
  store: React.PropTypes.shape({
    dispatch: React.PropTypes.func.isRequired
  }),
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  })
}

export default connect(state => ({ }))(MainMenuView)
