import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from '../views/Home';
import TaskDetail from '../views/TaskDetails';



export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tasks" exact component={TaskDetail} />
                <Route path="/tasks/:id" exact component={TaskDetail} />
            </Switch>
        </BrowserRouter>
    )
};
