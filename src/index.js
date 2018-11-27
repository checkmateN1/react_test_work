import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Register from './components/register';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Register />, document.getElementById('root'));

serviceWorker.unregister();
