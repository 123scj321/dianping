import React from 'react';
import {Switch} from 'react-router';
import {HashRouter, Route} from 'react-router-dom';

import App from '../containers';
import Home from '../containers/Home';
import City from '../containers/City';
import Login from '../containers/Login';
import User from '../containers/User';
import Search from '../containers/Search';
import Detail from '../containers/Detail';
import NotFound from '../containers/404';

class RouterMap extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/city" component={City}/>
                        <Route path='/login/:router?' component={Login}/>
                        <Route path="/user" component={User}/>
                        <Route path="/search/:category/:keyword?" component={Search}/>
                        <Route path="/detail/:id" component={Detail}/>
                        <Route component={NotFound}/>
                    </Switch>
                </App>
            </HashRouter>

        );
    }
}

export default RouterMap;