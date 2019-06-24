import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'unistore/react';
import Actions from '~/state/Actions';

import axios from 'axios';

import API from '../../api';

class Posts extends Component {
  state = {
    form: {
      title: '',
      body: '',
    }
  }

  setResult = (result) => {
    this.setState({ result });
  }

  getPost = (path) => {
    axios.get(path).then((response) => {
      this.setResult(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.props.loadData();
  }

  deletePost = (id, index) => {
    this.props.deleteOneData(id);
  }

  addPost = (e) => {
    e.preventDefault();
    const { title, body } = this.state.form;
    this.setState({ form: {title: '', body: ''} });
    this.props.addOneData(this.state.form);
    
  }

  setFieldTitle = ({ target: { value } }) => {
    const form = {
      title: value,
      body: this.state.form.body
    };
    this.setState({ form });
  }
  setFieldBody = ({ target: { value } }) => {
    const form = {
      title: this.state.form.title,
      body: value
    };
    this.setState({ form });
  }

  render() {
    const { isLoading } = this.props;
    const { data = [] } = this.props;
    const { title, body } = this.state.form;

    if (isLoading) {
      return (
        <h1>
          Loading...
        </h1>
      );
    }

    return (
      <div>
        <fieldset>
          <legend>Добавление поста</legend>
          <div className="form-item">
            <label>
              Title:
              <input type="text" value={title} onChange={this.setFieldTitle}/>
            </label>
          </div>
          <div className="form-item">
            <label>
              Body:
              <input type="text" value={body} onChange={this.setFieldBody}/>
            </label>
          </div>
          <div className="form-item is-buttons">
            <button className="is-small button" onClick={this.addPost}>Add post</button>
          </div>
        </fieldset>
        <div className="is-width-large is-center">
        <ul className="is-row is-unstyled is-stack-20">
          {data.map(({ id, title, body }, index) => 
            <li key={id} className="is-col is-30 is-shadow-2 x-list-item">
              <div className="is-buttons">
                <button className="is-small button is-destructive is-tertiary" onClick={() => { this.deletePost(id, index) }}>Delete</button>
                <div className="label is-secondary">{id}</div>
              </div>
              <h2>
                <Link to={`/post/${id}`}>{title}</Link>
              </h2>
              <p>{body}</p>
              <div className="is-buttons">
                <Link to={`/post/${id}?edit`} className="button is-secondary is-small ">Edit</Link>
              </div>
            </li>
          )}
        </ul>
        </div>
      </div>
    );
  }
}

// export default Posts;
export default connect(
  state => state,
  Actions
)(Posts);
