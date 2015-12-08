'use strict'

let React = require('react-native')
let { Text, View, Component } = React
let { TabBarIOS } = require('react-native-icons')
let NewsFeed = require('../news-feed/news-feed.js')

let viewStyles = {
  flex: 1,
  backgroundColor: '#F5FCFF'
}

let tabBarStyles = {
  backgroundColor: 'red',
  flex: 1,
  color: 'green',
  tintColor: 'blue'
}

class MainTabView extends Component {

  constructor () {
    super()
    this.statics = {
      title: '<TabBarIOS>',
      description: 'Tab-based navigation.'
    }
    this.state = {
      selectedTab: 'feed'
    }
    this.displayName = 'TabBarExample'
  }

  changeTab (tabName) {
    this.setState({
      selectedTab: tabName
    })
  }

  render () {
    return (
      <View style={viewStyles}>
        <TabBarIOS
          selectedTab={this.state.selectedTab}
          styles={tabBarStyles}
        >
          <TabBarIOS.Item
            name = 'Feed'
            selected={this.state.selectedTab === 'feed'}
            onPress={() => this.changeTab('feed')}
            iconName={'ion|ios-paper-outline'}
            selectedIconName={'ion|ios-paper'}
            badgeValue={'3'}
            iconSize={32}
            title={''}
          >
            <NewsFeed/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            name = 'Browse'
            selected={this.state.selectedTab === 'browse'}
            onPress={() => this.changeTab('browse')}
            iconSize={32}
            iconName={'ion|ios-browsers-outline'}
            selectedIconName={'ion|ios-browsers'}
            title={''}
          >
            <Text>
              Browse
            </Text>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            name = 'Profile'
            selected={this.state.selectedTab === 'profile'}
            onPress={() => this.changeTab('profile')}
            iconSize={32}
            iconName={'ion|ios-person-outline'}
            selectedIconName={'ion|ios-person'}
            title={''}
          >
            <Text>
              Profile
            </Text>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    )
  }

}

module.exports = MainTabView
