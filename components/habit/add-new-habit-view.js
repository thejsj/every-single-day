let React = require('react-native')
var {
  View,
  Component,
  StyleSheet,
  TextInput,
  PickerIOS,
  Text,
  TouchableHighlight
} = React

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 50,
    padding: 20
  },
  submitView: {
    backgroundColor: 'blue'
  },
  submitText: {
    color: 'white',
    fontSize: 22,
    padding: 10,
    textAlign: 'center'
  }
})

const PickerItemIOS = PickerIOS.Item

const HABIT_EVERY_DAY_OPTIONS = {
  yes: {
    text: 'I want to start doing this'
  },
  no: {
    text: 'I want to stop doing this'
  }
}

class AddNewHabitView extends Component {

  constructor () {
    super()
    this.state = this.state || {}
    this.state.text = ''
    this.state.doHabitEveryDay = 'yes'
  }

  render () {
    return (
      <View>
        <View style={styles.mainView}>
          <TextInput
            style={{height: 40}}
            onChangeText={(text) => this.setState({text})}
            placeholder={'Name'}
            value={this.state.text}
          />
          <PickerIOS
            selectedValue={this.state.doHabitEveryDay}
            onValueChange={(value) => this.setState({doHabitEveryDay: value})}
          >
            {Object.keys(HABIT_EVERY_DAY_OPTIONS).map((option) => (
              <PickerItemIOS
                key={option}
                value={option}
                label={HABIT_EVERY_DAY_OPTIONS[option].text}
              />
            ))}
          </PickerIOS>
        </View>
        <TouchableHighlight style={styles.submitView} onPress={() => this._handleSubmit()}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _handleSubmit () {
    this.props.navigator.pop()
  }
}

module.exports = AddNewHabitView
