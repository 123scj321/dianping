import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createHistory from 'history/createHashHistory';
import BuyAndStore from '../../../components/BuyAndStore'
import * as storeActionsFromFile from '../../../actions/store'

class Buy extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            isStore: false
        }
    }
    render(){
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
        )
    }
    componentDidMount(){
        // console.log(123,this.props.store)
        // console.log(456,this.props.storeActions)
        this.checkStoreState()
    }
    //检验当前商户是否已被收藏
    checkStoreState(){
        const id = this.props.id
        const store = this.props.store
        store.forEach(item=>{
            if(item.id === id){
                this.setState({
                    isStore: true
                })
                //跳出循环
                return true
            }
        })
    }
    //验证登录
    loginCheck(){
        const id = this.props.id
        const userinfo = this.props.userinfo
        if(!userinfo.username){
            //跳转到登录页面
            const history = createHistory()
            history.push('/login/'+ encodeURIComponent('/detail/'+id))
            return false
        }
            return true
    }
    //购买事件
    buyHandle(){
        //验证登录
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return
        }
        //购买的流程
        //...
        //...
        //..
        //跳转到用户主页
        const history = createHistory();
        history.push('/user');

    }
    //收藏事件
    storeHandle(){
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions
        if(this.state.isStore){
            //当前商户已经被收藏。点击时即要取消收藏
            storeActions.rm({id: id})
        }else{
            //当前商户尚未被收藏。点击时即要执行收藏
            storeActions.add({id: id})
        }
        //修改状态
        this.setState({
            isStore: this.state.isStore
        })
    }

}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)