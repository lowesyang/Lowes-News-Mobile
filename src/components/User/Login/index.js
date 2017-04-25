import React,{ Component } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { List,InputItem,Toast,Icon,Button } from 'antd-mobile'

const styles=StyleSheet.create({
    title:{
        alignItems:'center',
        fontSize:24,
        marginBottom:5
    },
    input:{
        width:'80%'
    },
    btn:{
        marginLeft:10,
        marginRight:5,
        marginTop:10
    }
})

export default class Login extends Component{
    state={
        userName:'',
        password:'',
        isLoading:false
    }
    login=async ()=>{
        if(!this.state.userName || !this.state.password){
            Toast.fail('用户名或密码不能为空!');
        }
        this.setState({
            isLoading:true
        })
        try {
            let response = await fetch('http://127.0.0.1:3000/login',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:this.state.userName,
                    password:this.state.password
                })
            });
            let res=await response.json();
            if(!res.code) {
                storage.save({
                    key: 'userInfo',
                    rawData: {
                        token:res.token,
                        userInfo:res.body
                    }
                });
                this.props.setUserInfo({
                    token:res.token,
                    userInfo:res.body
                })
            }
            else Toast.fail(res.msg);
        }
        catch(e){
            Toast.offline(e.toString());
        }
        this.setState({
            isLoading:false
        })
    }
    render(){
        return (
            <View>
                <View style={styles.title}>
                    <Text style={styles.title}>登录</Text>
                </View>
                <InputItem
                    style={styles.input}
                    placeholder="用户名"
                    onChangeText={text=>this.setState({
                        userName:text
                    })}
                >
                </InputItem>
                <InputItem
                    style={styles.input}
                    type="password"
                    placeholder="密码"
                    onChangeText={text=>this.setState({
                        password:text
                    })}
                >
                </InputItem>
                <Button style={styles.btn} type="primary" onClick={this.login}>
                    {this.isLoading?<Icon type="loading" />:'登录'}
                </Button>
                <Button style={styles.btn} onClick={this.props.toRegister}>去注册</Button>
            </View>
        )
    }
}