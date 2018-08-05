import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput';

import './style.less';
import createHistory from "history/createHashHistory";

class HomeHeader extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            kwd: ''
        }
    }
    render(){
        return (
            <div id="home-header" className='clear-fix'>
                <div className='home-header-left float-left'>
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className="icon-angle-down"></i>
                    </Link>
                </div>
                <div className='home-header-right float-right'>
                    <Link to="/Login">
                        <i className="icon-user"></i>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        <SearchInput value="" enterhandle={this.enterHandle.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
    enterHandle(value) {
        const history = createHistory()
        history.push('/search/all/' + encodeURIComponent(value))
    }
}

export default HomeHeader