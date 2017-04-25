/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TabBar,Icon } from 'antd-mobile';
import Storage from 'react-native-storage';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image
} from 'react-native';

import News from './src/components/News';
import User from './src/components/User';

let newsIcon=require('./src/static/news.png');
let snewsIcon=require('./src/static/selectednews.png');
let userIcon=require('./src/static/user.png');
let suserIcon=require('./src/static/selecteduser.png');

global.storage=new Storage({
  size:1000,
  storageBackend:AsyncStorage,
  defaultExpires:1000*3600*24*2,    // 2 days
  enableCache:true,

})

const styles=StyleSheet.create({
  icon:{
    width:32,
    height:32
  }
})

export default class LowesNews extends Component {
  state={
    selectedTab:'news',
    tabs:[
      {
        title:'新闻',
        selectedTab:'news',
        page:<News />,
        icon:newsIcon,
        selectedIcon:snewsIcon
      },
      {
        title:'我',
        selectedTab:'user',
        page:<User />,
        icon:userIcon,
        selectedIcon:suserIcon
      }
    ]
  }
  constructor(props){
    super(props);
  }
  render(){
    const tabItem=this.state.tabs.map((item)=> (
        <TabBar.Item
            icon={item.icon}
            selectedIcon={item.selectedIcon}
            title={item.title}
            key={item.title}
            selected={this.state.selectedTab === item.selectedTab}
            onPress={()=>{
                  this.setState({
                      selectedTab:item.selectedTab
                  })
              }}
        >
          {item.page}
        </TabBar.Item>
     ))
    return (
        <TabBar
            unselectedTintColor="#657180"
            tintColor="#108ee9"
        >
          {tabItem}
        </TabBar>
    )
  }
}

AppRegistry.registerComponent('LowesNews', () => LowesNews);
