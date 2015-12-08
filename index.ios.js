var React = require('react-native')
var { AppRegistry } = React

let MainTabView = require('./components/main/main-tab-view.js')

var AwesomeProject = React.createClass({
  render: function () {
    return (
      <MainTabView/>
    )
  }
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
