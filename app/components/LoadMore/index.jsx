import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompontUpdata = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render(){
        const data = this.props.data
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore?
                        <span>加载中...</span>:
                        <span onClick={this.loadMoreHandle.bind(this)} >加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle(){
        //只想传递过来的loadMoreData
        this.props.loadMoreFn()
    }
    componentDidMount(){
        const loadMoreFn = this.props.loadMoreFn
        const wrapper = this.refs.wrapper
        let timeoutId
        function callback() {
            const top = wrapper.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if(top && top < windowHeight){
                //当 wrapper 已经被滚动到暴露在页面的可是范围之内的时候，触发
                loadMoreFn()
            }
        }
        window.addEventListener('scroll', function () {
            if(this.props.isLoadingMore){
                return 
            }
            if(timeoutId){
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        }.bind(this),false)
    }
}

export default LoadMore