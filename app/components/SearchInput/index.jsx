import React from 'react';
import PureRenderMinix from 'react-addons-pure-render-mixin';
import createHistory from "history/createHashHistory";

import './style.less';

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMinix.shouldComponentUpdate.bind(this);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
                <input className="searchInput"
                       type="text"
                       placeholder="请输入关键字"
                       value={this.state.value}
                       onChange={this.changeHandle.bind(this)}
                       onKeyUp={this.keyUpHandle.bind(this)}/>
        );
    }
    componentDidMount() {
        this.setState({
            value: this.props.value || ''
        });
    }
    changeHandle(e) {
        this.setState({
            value: e.target.value,
        });
    }
    keyUpHandle(e) {
        if(e.keyCode !== 13)
            return;
        const history = createHistory()
        history.push('/search/all/' + encodeURIComponent(this.state.kwd))
    }
}

export default SearchInput;
