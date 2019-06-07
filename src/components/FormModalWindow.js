import React from 'react';
import Form from './Form';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div className="modalBtn">
        <Button color="success" onClick={this.toggle}>
          UPLOAD
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.modal}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <Form receiver={this.props.receiverHeader} />
          </ModalBody>
          {/* <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
