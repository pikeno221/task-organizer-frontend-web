import React from 'react';
import ReactDOM from 'react-dom';

import Home from './views/Home';  
import TaskDetails from './views/TaskDetails';

ReactDOM.render(
  <React.StrictMode>
    <TaskDetails />
  </React.StrictMode>,
  document.getElementById('root')
);
