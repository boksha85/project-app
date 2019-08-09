import React, {Component} from 'react';
import "./../css/input.css";

export default class Input extends Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Upload</span>
        </div>
        <div className="custom-file">
          <input type="file" className="custom-file-input" onChange={(e) => this.props.callback(e, this.props.array)}/>
          <div id="custom-file-label" className="custom-file-label">{this.props.label}</div>
        </div>
      </div>
    )
  }
}

