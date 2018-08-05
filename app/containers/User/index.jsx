import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//import {bindActionCreators} from "redux/index";
import {connect} from "react-redux";
import createHistory from 'history/createHashHistory';
import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList.jsx'

class User extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render(){
        const userinfo = this.props.userinfo
        return (
            <div>
                <Header title="用户中心" backRouter="/" />
                <UserInfo username={userinfo.username} city={userinfo.cityName}/>
                <OrderList username={userinfo.username} />
            </div>
        )
    }
    componentDidMount(){
        if(!this.props.userinfo.username) {
            const history = createHistory()
            history.push('/Login')
        }
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

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)