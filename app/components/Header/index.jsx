import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
import createHistory from "history/createHashHistory";

class Header extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render(){
        return (
            <div id="common-header">
                <span onClick={this.clickHandle.bind(this)} className="back-iocn">
                    <i className="icon-chevron-left"></i>
                </span>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
    clickHandle(){
        const backRouter = this.props.backRouter
        if(backRouter){
            const history = createHistory()
            history.push(backRouter)
        }else{
            window.history.back()
        }
    }
}

module.exports=Header