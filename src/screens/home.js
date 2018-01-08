import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  BackHandler,
  AsyncStorage
} from 'react-native';
import { Button, ListItem } from '../components';

import { onSignOut } from "../auth";
import { NavigationActions } from 'react-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {
  state = {
    data: ds,
    username: ''
  }
  componentDidMount(){
    const { navigation } = this.props;
    BackHandler.addEventListener('hardwareBackPress', function() {
      if(navigation.state.routeName == 'Home'){
        BackHandler.exitApp()
      }
    });
  }

  componentWillMount() {
   return fetch('https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=react-native&site=stackoverflow', {
      method: 'GET'
    }).then(res => res.json().then(response => this.setState({data: ds.cloneWithRows(response.items)})))
  }

  render() {
    const { navigate } = this.props.navigation;
    AsyncStorage.getItem('user').then(result => this.setState({username: result}));
    
    if (this.state.data === null) {
      return <Text>Loading</Text>
    } else {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`Welcome, ${this.state.username}!`}
        </Text>
        <ListView
          style={styles.list}
          dataSource={this.state.data}
          renderRow={(rowData) => <Text>{rowData.title}</Text>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
        <View style={{marginTop: 20}}>
          <Button
            onChangeText={() => {
              onSignOut().then(() => {
                AsyncStorage.removeItem("user_key")
                navigate('SignedOut');
              })
            }}
            text="Sign out"
          />
        </View>
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 50
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
