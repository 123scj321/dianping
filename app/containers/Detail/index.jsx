import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import Info from './subpage/Info'
import Comment from './subpage/Comment'
import Buy from './subpage/buy'
class Detail extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render(){
        const id = this.props.match.params.id
        return (
            <div>
                <Header title="商户详情"/>
                <Info id={id}/>
                <Buy id={id}/>
                <Comment id={id}/>
            </div>
        )
    }
}

module.exports=Detail