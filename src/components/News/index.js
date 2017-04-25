import React,{ Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View,Text } from 'react-native';
//import {Button} from 'antd-mobile';
import NewsList from './NewsList';
import NewsDetail from './NewsDetail';

//class test extends Component{
//    static navigationOptions={
//        title:'Lowes-News'
//    }
//    render(){
//        const {navigate} = this.props.navigation;
//        return (
//            <Button onClick={()=>{
//                navigate('Detail',{url:"https://www.baidu.com"})
//            }}>
//                <Text>Hello</Text>
//            </Button>
//        )
//    }
//}

const News = StackNavigator({
    List:{ screen: NewsList},
    Detail:{ screen: NewsDetail}
});

export default News;