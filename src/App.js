import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent'
import { BrowserRouter } from 'react-router-dom' 
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'

const store = ConfigureStore()

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter basename = {process.env.PUBLIC_URL}>
            <Main/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
