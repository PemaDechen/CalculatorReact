import './App.css';
import { Component } from 'react';
import Calculator from './Container/Calculator';

// already class is export why double export 
export class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div >
        <Calculator />
      </div>)
  }
}
export default App;

