import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getInfoData} from "../../../fetch/detail/detail";
import DetailInfo from '../../../components/DetailInfo'
class Info extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state={
            info:false
        }
    }
    render(){
        return (
            <div>
                {this.state.info?
                    <DetailInfo data={this.state.info}/>:
                    ''
                }
            </div>
        )
    }
    componentDidMount(){
        var id = this.props.id
        var result = getInfoData(id)
        result.then(res => {
            return res.json()
        }).then(json=>{
            this.setState({
                info: json
            })
        })
    }
}

module.exports=Info