import React from 'react';
import {render} from 'react-dom';
import RouteMap from './router/routeMap';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import createHistory from 'history/createHashHistory'

import './static/css/common.less';
import './static/css/font.css'
import {createHashHistory} from "history";

const store = configureStore();
render(
    <Provider store={store}>
        <RouteMap hashistory={history}/>
    </Provider>,
    document.getElementById('root'),
);
