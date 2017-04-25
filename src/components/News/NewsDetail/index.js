import React,{ Component } from 'react';
import {StyleSheet, WebView, View } from 'react-native';

const styles=StyleSheet.create({
    container:{
        flex:1
    }
})

export default class NewsDetail extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {params} = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <WebView
                    source={{uri:params.url}}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                />
            </View>
        )
    }
}