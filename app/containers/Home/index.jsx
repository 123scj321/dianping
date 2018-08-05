import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHander from '../../components/HomeHeader'
import { connect } from 'react-redux'
import Category from '../../components/Category'
import Ad from './subpage/Ad.jsx'
import List from './subpage/List'

class Home extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render(){
        return (
            <div>
                <HomeHander cityName={this.props.userinfo.cityName}/>
                <Category/>
                <div style={{height: '15px'}}></div>
                <Ad />
                <List cityName={this.props.userinfo.cityName} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userinfo : state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);