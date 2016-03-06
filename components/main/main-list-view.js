let React = require('react-native')
let {
  Text,
  ListView,
  Component,
  TouchableHighlight,
  View,
  StyleSheet
} = React

var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1
  }
})

class MainListView extends Component {

  constructor () {
    super()
    this.state = this.state || {}
    this.state.dataSource = dataSource.cloneWithRows(['ROW 1', 'row 2', 'row 3', 'CONSTRUCTORT', '234234l', 'asdfasdf', 'asdfasd', 'asdfa'])
    this.propTypes = {
      navigator: React.PropTypes.object.isRequired
    }
  }

  getIntialState () {
    return {
      dataSource: dataSource.cloneWithRows(['ROW 1', 'row 2', 'row 3', 'getIntialState', '1', 'wer', 'ewerwe', 'asdfa', 'asdf'])
    }
  }

  _renderRow (rowData) {
    // <Image style={styles.thumb} source={imgSource} />
    return (
      <TouchableHighlight onPress={() => true}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    return (
      <View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this._renderRow(rowData)}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        />
      </View>
    )
  }

  _handleBackButtonPress () {
    console.log('_handleBackButtonPress')
  }

  _handleNextButtonPress (a, b, c) {
    console.log('HANDLE NEXT BUTTON PRESS')
  }

  _handleNavigationRequest () {
    console.log('Handle navigator req')
  }

}

module.exports = MainListView
