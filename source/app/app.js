import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory, browserHistory } from 'react-router';

import {socialShare} from './libs/Share/index';
import {Index} from './pages/Index';

let container = document.getElementById('d-root');
ReactDOM.render((
		<Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
			<Route path="/" component={Index}>
			</Route>
		</Router>
	), container);

socialShare('d-social__item');
