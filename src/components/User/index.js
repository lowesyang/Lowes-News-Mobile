import React,{ Component } from 'react';
import { View,StyleSheet } from 'react-native';
import Login from './Login';
import Register from './Register';
import UserBox from './UserBox';

const styles=StyleSheet.create({
    container:{
        marginTop:100,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default class User extends Component{
    constructor(props){
        super(props);
        this.state= {
            currPage: 'login',    //'login' or 'register',
            token: '',
            userInfo:{}
        }
    }
    componentWillMount(){
        storage.load({
            key:'userInfo'
        }).then((ret)=>{
            this.setState({
                token:ret.token,
                userInfo:ret.userInfo
            })
        }).catch(()=>{
            this.setState({
                token:'',
                userInfo:{}
            })
        })
    }
    setUserInfo=(payload)=>{
        this.setState({
            token:payload.token,
            userInfo:payload.userInfo
        })
    }
    toPage=(page)=>{
        this.setState({
            currPage:page
        })
    }
    render(){
        const Page=this.state.token?
            <UserBox setUserInfo={this.setUserInfo} username={this.state.userInfo.username} />:this.state.currPage==='login'?
            <Login setUserInfo={this.setUserInfo} toRegister={this.toPage.bind(this,'register')} />:
            <Register setUserInfo={this.setUserInfo} toLogin={this.toPage.bind(this,'login')} />;
        return (
            <View style={styles.container}>
                {Page}
            </View>
        )
    }
}