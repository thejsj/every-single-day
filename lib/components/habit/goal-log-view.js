import React, {
  Text,
  Component,
  TouchableHighlight,
  ListView,
  View,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { addGoalEntry, getAllEntriesForSingleDay } from '../../actions'

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
  accomplished: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: '#cfffcf'
  },
  notAccomplished: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: '#ffcfcf'
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
  actionCompleted: {
    backgroundColor: '#22AA22',
    flexDirection: 'column',
    padding: 16,
    alignSelf: 'flex-end'
  },
  actionNotCompleted: {
    backgroundColor: '#AA2222',
    flexDirection: 'column',
    padding: 16,
    alignSelf: 'flex-end'
  },
  loadingTextStyle: {
    fontSize: 18,
    padding: 10
  }
})

class GoalLogView extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.store.dispatch(getAllEntriesForSingleDay(this.props.habits, this.props.date))
  }

  _markAsCompleted (goal, accomplished) {
    this.props.store.dispatch(addGoalEntry({
      goal: goal,
      accomplished: accomplished,
      entryDate: this.props.date,
      created: Math.floor((new Date()).getTime() / 1000)
    }))
  }

  _getRowStyle (rowData, date) {
    if (rowData.entries && rowData.entries[date]) {
      if (rowData.entries[date].accomplished) {
        return styles.accomplished
      } else {
        return styles.notAccomplished
      }
    }
    return styles.row
  }

  _renderRow (rowData) {
    console.log('RENDER ROW', !!rowData.entries)
    return (
      <View style={this._getRowStyle(rowData, this.props.date)}>
        <View style={styles.leftBlock}>
          <Text style={styles.leftBlockText}>
            {rowData.name}
          </Text>
        </View>
        <TouchableHighlight onPress={() => this._markAsCompleted(rowData, false)}>
          <View style={styles.actionNotCompleted}>
            <Icon name='close' size={30} color='#660000' />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._markAsCompleted(rowData, true)}>
          <View style={styles.actionCompleted}>
            <Icon name='checkmark' size={30} color='#006600' />
          </View>
        </TouchableHighlight>
      </View>
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

GoalLogView.propTypes = {
  habits: React.PropTypes.arrayOf(React.PropTypes.object),
  store: React.PropTypes.shape({
    dispatch: React.PropTypes.func.isRequired
  }),
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }),
  date: React.PropTypes.number
}

export default connect(state => ({ habits: state.habits, entries: state.entries }))(GoalLogView)
