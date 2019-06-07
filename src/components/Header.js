import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import FormModalWindow from './FormModalWindow';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  closeNavbar = () => {
    if (this.state.isOpen) {
      this.toggle();
    }
  };
  dropDownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  render() {
    const { receiver, categories } = this.props;
    let dropDownItems = [];
    let dropdownList;
    const catList = categories.map((cat, i) => {
      if (i <= 5) {
        // TODO: add some state condition
        return (
          <NavItem key={i} className="navItem">
            <Link className="link" to={cat} onClick={this.closeNavbar}>
              {cat}
            </Link>
          </NavItem>
        );
      } else if (this.state.isOpen) {
        return (
          <NavItem key={i} className="navItem">
            <Link className="link" to={cat} onClick={this.closeNavbar}>
              {cat}
            </Link>
          </NavItem>
        );
      } else {
        dropDownItems.push(cat);
      }
      return '';
    });
    if (dropDownItems.length === 0) {
      dropdownList = undefined;
    } else {
      dropdownList = (
        <Dropdown
          className="dropdown-container"
          isOpen={this.state.dropdownOpen}
          toggle={this.dropDownToggle}
        >
          <DropdownToggle
            caret
            className="dropdown-button"
            tag="a"
            onClick={this.dropDownToggle}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            More
          </DropdownToggle>
          <DropdownMenu>
            {dropDownItems.map((item, num) => {
              return (
                <DropdownItem key={num}>
                  <NavItem className="navItem">
                    <Link className="link" to={item}>
                      {item}
                    </Link>
                  </NavItem>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <div className="nav-container">
        <Navbar className="nav-items" light expand="md">
          <NavbarBrand className="logo" href="/">
            CYF Library
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {catList}
              {dropdownList}
            </Nav>
            <div className="modal-btn-container">
              <FormModalWindow receiverHeader={receiver} />
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
