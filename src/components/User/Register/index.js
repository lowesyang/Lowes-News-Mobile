import React,{ Component } from 'react';
import { StyleSheet,View,Text} from 'react-native';
import { List,InputItem,Icon,Button,Toast } from 'antd-mobile'

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

export default class Register extends Component{
    state={
        userName:'',
        password:'',
        email:'',
        confirm:'',
        isLoading:false
    }
    register=async ()=>{
        if(!this.state.userName || !this.state.password){
            Toast.fail('用户名或密码不能为空!');
        }
        if(this.state.password !== this.state.confirm){
            Toast.fail('两次密码输入不一致!');
        }
        this.setState({
            isLoading:true
        });
        try {
            let response = await fetch('http://127.0.0.1:3000/register',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:this.state.userName,
                    email:this.state.email,
                    password:this.state.password,
                    confirm:this.state.confirm
                })
            });
            let res=await response.json();
            if(!res.code) {
                console.log(res)
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
                    <Text style={styles.title}>注册</Text>
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
                    placeholder="电子邮箱"
                    onChangeText={text=>this.setState({
                        email:text
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
                <InputItem
                    style={styles.input}
                    type="password"
                    placeholder="确认密码"
                    onChangeText={text=>this.setState({
                        confirm:text
                    })}
                >
                </InputItem>
                <Button type="primary" onClick={this.register} style={styles.btn}>
                    {this.state.isLoading===true?<Icon type="loading" />:'注册'}
                </Button>
                <Button onClick={this.props.toLogin} style={styles.btn}>去登录</Button>
            </View>
        )
    }
}