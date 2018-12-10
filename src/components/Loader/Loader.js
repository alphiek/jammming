import React, {Component} from 'react';
import './Loader.css'

class Loader extends Component {
  render() {
    return (
      <div>
        <div className='loader'>
          <div className='message'>
          <p>{this.props.messageChange}</p>
          </div>
        </div>
      </div>
    )
  }
}


export default Loader;
