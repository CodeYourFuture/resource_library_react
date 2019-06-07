import React from "react";
import DropDownMenu from "./DropDownMenu";
class Search extends React.Component {
  render() {
    return (
      <form className="search-form search" onSubmit={this.props.handleSubmit}>
        <div>
          <span>
            <i className="fa fa-search" />
          </span>
          <input
            type="search"
            value={this.props.search}
            onChange={this.props.handleSearch}
            name="resourceSearch"
            placeholder="Search for resources..."
            size="30"
          />
        </div>
        <div className="dropdownFilter">
          <DropDownMenu
            open={this.props.handleOpen}
            select={this.props.select}
          />
        </div>
      </form>
    );
  }
}
export default Search;
