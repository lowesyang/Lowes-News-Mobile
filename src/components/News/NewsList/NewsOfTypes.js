import React,{ Component } from 'react';
import { View,ListView,Text,RefreshControl,StyleSheet } from 'react-native';
import { Toast } from 'antd-mobile';
import NewsItem from './NewsItem';
import { cateToName } from '../../../utils';

const dataList=new ListView.DataSource({
    rowHasChanged:(r1,r2) => r1 !== r2
});

const styles=StyleSheet.create({
    listView:{
        width:'100%',
        height:'100%'
    }
})

export default class NewsOfTypes extends Component{
    propsTypes={
        type:React.PropTypes.oneOf(['news','tech','finance','sports','entertainment','game','phone','army']),
        navigation:React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state={
            page:1,
            newsList:[],
            isLoading:false,
            dataSource:dataList.cloneWithRows([])
        };
    }
    componentWillMount(){
        //console.log(this.props.type)
        this.getNewsList(false);
    }

    /** 获取新闻列表
     * @param {Bool} isExtra  true: 额外获取  false:替换整个列表
     */
    getNewsList=async (isExtra)=>{
        if(this.state.isLoading) return;
        this.setState({
            isLoading:true
        });
        try{
            let response=await fetch('https://news.zhelishi.cn/extra/news/'
                +this.props.type+'?p='+this.state.page+'&pcount=20');
            let res=await response.json();
            if(!res.code) {
                if(isExtra) {
                    let newsList=this.state.newsList.concat(res.body.news);
                    this.setState({
                        newsList: newsList,
                        dataSource: dataList.cloneWithRows(newsList),
                        page: this.state.page + 1
                    })
                }
                else{
                    this.setState({
                        newsList:res.body.news,
                        dataSource: dataList.cloneWithRows(res.body.news),
                        page:this.state.page+1
                    })
                }
            }
        }
        catch(e){
            console.log(e)
            Toast.offline(e.toString())
        }
        this.setState({
            isLoading:false
        })
    }
    onEndReached=()=>{
        this.getNewsList(true)
    }
    refresh=()=>{
        this.setState({
            page:1
        },()=>{
            this.getNewsList();
        });
    }
    render(){
        const { navigate } = this.props.navigation;
        const item=(rowData,rowId)=> {
            return (<NewsItem
                key={rowId}
                title={rowData.title}
                intro={rowData.intro || rowData.title}
                source={rowData.source}
                time={rowData.time}
                src={rowData.img}
                toDetail={()=>navigate('Detail',{url:rowData.url})}
            />)
        };
        return(
            <ListView
                style={styles.listView}
                refreshControl={
                    <RefreshControl
                        onRefresh={this.refresh}
                        refreshing={this.state.isLoading}
                    />
                }
                dataSource={this.state.dataSource}
                renderRow={item}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0}
                enableEmptySections={true}
                renderFooter={
                ()=><Text style={{ padding:10,textAlign:'center' }}>
                    {this.state.isLoading?"加载中...":"加载完毕"}
                </Text>
            }
            />
        )
    }
}