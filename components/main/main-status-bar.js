var React = require('react-native')
var { View, Component, Text, StyleSheet } = React

var styles = StyleSheet.create({
  title: {
    marginTop: 25,
    marginBottom: 8,
    fontWeight: 'bold',
    backgroundColor: 'blue',
    textAlign: 'center',
    fontSize: 20,
    color: 'red'
  }
})

class MainTitleBar extends Component {

  constructor () {
    super()
    this.state = this.state || {}
  }

  render () {
    return (
      <View>
        <Text style={styles.title}>Every Single Day</Text>
      </View>
    )
  }

}

module.exports = MainTitleBar
