import React, {
  Text,
  ListView,
  Component,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import SingleHabitView from '../habit/single-habit-view.js'
import AddNewHabitView from '../habit/add-new-habit-view.js'

import { getStreakForGoals } from '../../actions'

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

var styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  mainListView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  leftBlock: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    flex: 0.25,
    padding: 10
  },
  rightBlock: {
    backgroundColor: '#77FF77',
    flexDirection: 'column',
    padding: 16,
    alignSelf: 'flex-end'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  leftBlockText: {
    fontSize: 18
  },
  rightBlockText: {
    color: '#22AA22',
    fontSize: 18
  },
  loadingTextStyle: {
    fontSize: 18,
    padding: 10
  }
})

class MainGoalListView extends Component {

  constructor (props) {
    super()
    this.state = this.state || {}
  }

  componentDidMount () {
    this.props.store.dispatch(
      getStreakForGoals(this.props.dates.today, this.props.habits)
    )
  }

  _routeToHabit (rowData) {
    this.props.navigator.push({
      component: SingleHabitView,
      title: rowData.name,
      passProps: { habit: rowData, store: this.props.store },
      rightButtonTitle: 'Back',
      onRightButtonPress: () => this.refs.nav.pop()
    })
  }

  _renderRow (rowData) {
    return (
      <TouchableHighlight onPress={() => this._routeToHabit(rowData)}>
        <View style={styles.row}>
          <View style={styles.leftBlock}>
            <Text style={styles.leftBlockText}>
              {rowData.name}
            </Text>
          </View>
          <View style={styles.rightBlock}>
            <Text style={styles.rightBlockText}>
              {rowData.streakCount}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    let clonedDataSource = dataSource.cloneWithRows(this.props.habits)
    return (
      <View style={styles.mainView}>
        <ListView
          dataSource={clonedDataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
          renderSeparator={(sectionID, rowID) => {
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />
          }}
        />
      </View>
    )
  }
}

MainGoalListView.navOptions = function (self) {
  return {
    rightButtonTitle: 'Create Goal',
    onRightButtonPress: function () {
      self.props.navigator.push({
        component: AddNewHabitView,
        title: 'Create Goal',
        leftButtonTitle: 'Back',
        passProps: { store: self.props.store },
        onLeftButtonPress: () => self.props.navigator.pop()
      })
    }
  }
}

MainGoalListView.propTypes = {
  habits: React.PropTypes.arrayOf(React.PropTypes.object),
  dates: React.PropTypes.shape({
    today: React.PropTypes.number.isRequired
  }),
  store: React.PropTypes.shape({
    dispatch: React.PropTypes.func.isRequired
  }),
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  })
}

export default connect(state => ({ habits: state.habits, dates: state.dates }))(MainGoalListView)
