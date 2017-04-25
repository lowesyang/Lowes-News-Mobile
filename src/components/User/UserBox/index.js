import React,{ Component } from 'react';
import { Image,Text,StyleSheet,View } from 'react-native';
import { Card,Button } from 'antd-mobile';

const styles=StyleSheet.create({
    card:{
        width:'80%'
    },
    body:{
        alignItems:'center'
    },
    username:{
        fontWeight:'bold',
        fontSize:24
    },
    hello:{
        fontSize:24
    },
    nameBox:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
    },
    image:{
        borderRadius:130
    },
    logoutBtn:{
        marginTop:10
    }
})

export default class UserBox extends Component{
    logout=()=>{
        storage.remove({
            key:'userInfo'
        });
        this.props.setUserInfo({
            token:'',
            userInfo:{}
        })
    }
    render(){
        return (
            <Card style={styles.card} >
                <Card.Body style={styles.body}>
                    <Image style={styles.image} source={require('./../../../static/timg.jpeg')} />
                    <View style={styles.nameBox}>
                        <Text style={styles.hello}>Hello </Text>
                        <Text style={styles.username}>{this.props.username}</Text>
                    </View>
                    <Button style={styles.logoutBtn} onClick={this.logout}>注销</Button>
                </Card.Body>
            </Card>
        )
    }
}