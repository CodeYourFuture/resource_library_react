import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTitle: '',
      inputDescription: '',
      inputUrl: '',
      categoryNames: [],
      validInput: 'blank',
      isResourcesNotSend: false,
      error: null,
      initalVote: 0,
      resourceType: ''
    };
  }

  componentDidMount() {
    this.getCategoryNames();
  }

  getCategoryNames() {
    fetch('/api/categories')
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          throw new Error('HTTP error');
        }
      })
      .then(res => res.json())
      .then(catList => {
        catList.forEach(cat => {
          this.setState({
            categoryNames: [
              ...this.state.categoryNames,
              {
                category_name: cat.category_name,
                selected: false
              }
            ]
          });
        });
      })
      .catch(err => {
        this.setState({
          error: err.toString()
        });
      });
  }

  handleChange = event => {
    const checkboxArr = this.state.categoryNames;
    if (event.target.type === 'checkbox') {
      checkboxArr.forEach(item => {
        if (item.category_name.toLowerCase() === event.target.name) {
          item.selected = !item.selected;
        }
      });
    }
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
      categoryNames: checkboxArr,
      validInput: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.inputTitle !== '' &&
      this.state.inputDescription !== '' &&
      this.state.inputUrl !== ''
    ) {
      this.setState({
        submitted: true,
        validInput: true,
        inputTitle: '',
        inputDescription: '',
        inputUrl: '',
        resourceType: '',
        initalVote: 0
      });

      let resourceCategories = [];

      this.state.categoryNames.forEach(item => {
        if (item.selected) {
          resourceCategories.push(item.category_name);
        }
      });

      const resourceItem = {
        title: this.state.inputTitle,
        description: this.state.inputDescription,
        url: this.state.inputUrl,
        num_of_votes: this.state.initalVote,
        resource_type: this.state.resourceType,
        categories: resourceCategories
      };

      fetch('/api/resources', {
        method: 'POST',
        body: JSON.stringify(resourceItem),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(body => {
          this.props.receiver(body);
        })
        .catch(err => {
          this.setState({
            isResourcesNotSend: true,
            error: err
          });
        }); // TO DO ADD ERROR MESSAGE TO USER IF SOMETHING WRONG WITH ADD TO DB
    } else {
      this.setState({
        validInput: false
      });
    }
  };

  render() {
    let checkboxes = this.state.categoryNames.map((item, i) => {
      return (
        <label key={i}>
          <input
            type="checkbox"
            onChange={this.handleChange}
            name={item.category_name.toLowerCase()}
          />
          {item.category_name}
        </label>
      );
    });
    return (
      <div className="form">
        <form className="add-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add Your Resource</legend>
            <div>
              <label htmlFor="inputTitle">Resource Title</label>
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.inputTitle}
                id="inputTitle"
                name="inputTitle"
                placeholder=" Type your title..."
              />
            </div>
            <div>
              <label htmlFor="resourceType">Type of Resource</label>
              <select
                value={this.state.resourceType}
                onChange={this.handleChange}
                name="resourceType"
                id="resourceType"
              >
                <option value="">Select</option>
                <option value="Video">Video</option>
                <option value="Article">Article</option>
                <option value="Book">Book</option>
                <option value="Podcast">Podcast</option>
              </select>
            </div>
            <div>
              <label htmlFor="inputDescription">Resource Description</label>
              <textarea
                className="descriptionText"
                onChange={this.handleChange}
                value={this.state.inputDescription}
                id="inputDescription"
                name="inputDescription"
                placeholder=" Type your description..."
              />
            </div>

            <div>
              <label htmlFor="inputUrl">Resource URL</label>
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.inputUrl}
                id="inputUrl"
                name="inputUrl"
                placeholder=" Type your URL..."
              />
            </div>
            <div className="checkbox-container">{checkboxes}</div>
            {this.state.submitted ? (
              <p style={{ color: 'green' }}>
                THANK YOU! Your resource has been added
              </p>
            ) : null}
            <button type="submit">Submit</button>
            <p
              className={
                this.state.validInput !== false ? 'hidden' : 'validation-error'
              }
            >
              Please fill out inputs
            </p>
            <p
              className={
                this.state.isResourcesNotSend !== false ? 'hidden' : 'db-error'
              }
            >
              {this.state.error}
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Form;
