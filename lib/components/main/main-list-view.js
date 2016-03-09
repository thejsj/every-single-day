const React = require('react-native')
let {
  Text,
  ListView,
  Component,
  TouchableHighlight,
  View,
  StyleSheet
} = React

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const SingleHabitView = require('../habit/single-habit-view.js')

var styles = StyleSheet.create({
  mainListView: {
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

class MainListView extends Component {

  constructor () {
    super()
    this.state = this.state || {}
    this.propTypes = {
      navigator: React.PropTypes.object.isRequired
    }
  }

  _routeToHabit (rowData) {
    this.props.navigator.push({
      component: SingleHabitView,
      title: rowData.name,
      passProps: { habitStorage: this.props.habitStorage, habit: rowData },
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
              4
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    let habits = this.props.habitStorage.habits
    let clonedDataSource = dataSource.cloneWithRows(habits)
    return (
      <View style={styles.mainListView}>
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

module.exports = MainListView
