import React,{ Component } from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { Tabs } from 'antd-mobile';
import NewsOfTypes from './NewsOfTypes';
import { cateToName } from '../../../utils';

const { TabPane } = Tabs;

const styles=StyleSheet.create({

})

export default class NewsList extends Component{
    static navigationOptions={
        title:'Lowes-News'
    }
    constructor(props) {
        super(props);
        this.state={
            types:['news','tech','finance','sports','entertainment','game','phone','army']
        };
    }
    changeTab=(type)=>{
        //console.log(type)
    }
    render(){
        const newsList=this.state.types.map((type)=>(
            <TabPane tab={cateToName(type)} key={type}>
                <NewsOfTypes key={type} type={type} navigation={this.props.navigation} />
            </TabPane>
        ))
        return(
            <Tabs defaultActiveKey="news"
                  onChange={this.changeTab}
                  onTabClick={this.changeTab}
            >
                {newsList}
            </Tabs>
        )
    }
}