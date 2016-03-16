import React, {
  View,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native'
import { connect } from 'react-redux'

import { deleteHabit } from '../../actions'

var styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 50
  },
  mainTitle: {
    padding: 20
  },
  mainTitleText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  deleteButtonTouchable: {
    backgroundColor: 'red',
    padding: 20
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

class SingleHabitView extends Component {

  constructor () {
    super()
    this.state = this.state || {}
  }

  render () {
    return (
      <View style={styles.mainView}>
        <View style={styles.mainTitle}>
          <Text style={styles.mainTitleText}>
            {this.props.habit.name}
          </Text>
        </View>
        <View style={styles.createdTime}>
          <Text style={styles.createTimeText}>
            Created: {this.props.habit.created}
          </Text>
        </View>
        <View style={styles.doHabitEveryDay}>
          <Text style={styles.doHabitEveryDay}>
            Yes or No: {this.props.habit.isAffirmative}
          </Text>
        </View>
        <View style={styles.deleteButtonView}>
          <TouchableHighlight style={styles.deleteButtonTouchable} onPress={() => this._handleDelete()}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  _handleDelete () {
    this.props.store.dispatch(deleteHabit(this.props.habit.id))
      .then(() => this.props.navigator.pop())
  }

}

SingleHabitView.propTypes = {
  habit: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    created: React.PropTypes.number,
    isAffirmative: React.PropTypes.bool
  }),
  store: React.PropTypes.shape({
    dispatch: React.PropTypes.func.isRequired
  }),
  navigator: React.PropTypes.shape({
    pop: React.PropTypes.func.isRequired
  })
}

export default connect(state => ({ }))(SingleHabitView)
