import React from 'react';
import ReactDOM from 'react-dom';
import  App from './App';
import Loader from './App'
import SFComponent from './App'
import AsyncDataSourceRender from './App'
it('renders without crashing app', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing loader', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders without crashing sfc', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SFComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders without crashing async render', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AsyncDataSourceRender />, div);
  ReactDOM.unmountComponentAtNode(div);
});