import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { Router, Route }  from 'react-router-dom'

export const Main = ()=>(

    <Router history={}>
        <Provider store={ store } >
            <div>
                {/* Dashboard goes here */}
                < ConnectedDashboard/ >
            </div>
        </Provider>
    </Router>

)