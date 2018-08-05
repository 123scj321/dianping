import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getCommentData } from '../../../fetch/detail/detail';

import ListComponent from '../../../components/CommentList';
import LoadMore from '../../../components/LoadMore';

import './style.less';

class Comment extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
    render() {
        return (
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
                {
                    this.state.data.length
                        ? <ListComponent data={this.state.data}/>
                        : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                        : ''
                }
            </div>
        );
    }

    componentDidMount() {
        this.loadFirstPageData();
    }

    loadFirstPageData() {
        const id = this.props.id;
        const result = getCommentData(0, id);
        this.resultHandle(result, 0);
    }

    loadMoreData() {
        this.setState({
            isLoadingMore: true
        });
        const page = this.state.page;
        const id = this.props.id;
        const result = getCommentData(0, id);
        this.resultHandle(result, page);
    }

    resultHandle(result, page) {
        result.then(res => {
            return res.json();
        }).then(json => {
            const hasMore = json.hasMore;
            const data = json.data;
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data),
                page: page + 1,
                isLoadingMore: false
            });
        }).catch(ex => {
            if (__DEV__)
                console.error('用户点评获取数据错误', ex.message);
        });
    }

}

export default Comment;