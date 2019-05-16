import React,{ Fragment } from 'react';
import { Provider } from "react-redux";
import store from './store';


const App = () => (
  
  <Provider store={store} >
      <Fragment>
      </Fragment>
  </Provider>
)
  


export default App;
