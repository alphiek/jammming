import React, {Component} from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(isRemoval) {
    if(isRemoval === 'true') {
      return <a href={'www.#.com'}
      className='Track-action'
      onClick={this.removeTrack}>-</a>;
    }
    return <a href='www.#.com'
    className='Track-action'
    onClick={this.addTrack}>+</a>;
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
    event.preventDefault();
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
      {this.renderAction(this.props.isRemoval)}
      </div>
    )
  }
}

export default Track;
