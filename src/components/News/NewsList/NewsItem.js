import React,{ Component } from 'react';
import { View,Image,StyleSheet,Text,TouchableHighlight } from 'react-native';

const styles=StyleSheet.create({
    item:{
        position:'relative',
        flexDirection:'row',
        alignItems:'stretch',
        padding:10,
        borderBottomWidth:1,
        borderColor:'#dddddd'
    },
    infoBox:{
        flex:2,
        paddingLeft:10
    },
    title:{
        fontSize:16,
        lineHeight:20
    },
    intro:{
        fontSize:14,
        lineHeight:18,
        marginTop:5,
        color:'#333333'
    },
    image:{
        flex:1,
        height:90
    },
    bottomBox:{
        position:'absolute',
        left:10,
        bottom:0,
        marginTop:25,
    },
    source:{
        fontSize:12,
        color:'#777777'
    },
    time:{
        fontSize:12,
        color:'#777777',
        marginTop:4
    }
});

export default class NewsItem extends Component{
    propsTypes={
        title:React.PropTypes.string,
        intro:React.PropTypes.string,
        source:React.PropTypes.string,
        time:React.PropTypes.string,
        src:React.PropTypes.string,
        toDetail:React.PropTypes.func
    }
    render(){
        let imgPath=this.props.src?{uri:this.props.src}:require('../../../static/timg.jpeg');
        return (
            <TouchableHighlight onPress={this.props.toDetail} activeOpacity={0.8}>
                <View style={styles.item}>
                    <Image source={imgPath} style={styles.image} />
                    <View style={styles.infoBox}>
                        <Text style={styles.title} numberOfLines={2}>{this.props.title}</Text>
                        <View style={styles.bottomBox}>
                            <Text style={styles.source}>{this.props.source}</Text>
                            <Text style={styles.time}>{this.props.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}