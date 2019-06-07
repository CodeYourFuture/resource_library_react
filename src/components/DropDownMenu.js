import React from 'react';

export default class DropDownMenu extends React.Component {
  handleClick = e => {
    this.setState(
      {
        select: e.target.value
      },
      this.props.open(true, e.target.value)
    );
  };

  render() {
    return (
      <div>
        <select
          className="drop-down"
          value={this.props.select}
          onChange={this.handleClick}
        >
          <option value="popular">Popular</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    );
  }
}
