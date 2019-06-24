import React, { Component } from 'react';

import { connect } from 'unistore/react';
import Actions from '~/state/Actions';

import { Link } from 'react-router-dom';
import axios from 'axios';

import API from '../../api';

class Post extends Component {
  constructor(props){
    super(props);
    // console.log(this.props);
    this.state = {
      data: {
        title: '',
        body: '',
      },
    }
  }

  getPost = (path) => {
    axios.get(path).then((response) => {
      this.setState({ data: response.data });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount(){
    const id = +this.props.match.params.id || '';
    this.getPost(`${API.HOST}${API.POSTS}/${id}`);
    if(!this.props.data) this.props.loadData(); // redux action
  }

  backPage = () => {
    this.props.history.go(-1);
  }

  setFieldTitle = ({ target: { value }}) => {
    const data = {
      id: this.state.data.id,
      title: value,
      body: this.state.data.body
    };
    this.setState({ data });
  }
  setFieldBody = ({ target: { value }}) => {
    const data = {
      id: this.state.data.id,
      title: this.state.data.title,
      body: value
    };
    this.setState({ data });
  }

  editPost = (post) => {
    this.props.editOneData(post); // redux action
  }

  render() {
    const { isLoading } = this.props;
    const { search } = this.props.location;
    const { data } = this.state;
    // console.log(this.props.location);
    
    
    if (isLoading) {
      return (
        <h1>
          Loading...
        </h1>
      );
    }

    if(search === '?edit'){
      return (
        <div className="is-row is-width-medium ">
          <div className="is-col is-100 x-body"><Link to={`/posts`} className="is-small button is-secondary">Back</Link></div>
          <div className="is-col is-70 x-body">
          <fieldset>
            <legend>Редактирование поста</legend>
            <div className="form-item">
              <label>Title</label>
              <input type="text" value={data.title} onChange={this.setFieldTitle}/>
            </div>
            <div className="form-item">
              <label htmlFor="t1">Body</label>
              <textarea id="t1" rows="6" value={data.body} onChange={this.setFieldBody}></textarea>
            </div>
            <button className="is-small button" onClick={() => this.editPost(data)}>Edit</button>
          </fieldset>
          </div>
        </div>
      );
    }

    return (
      <div className="is-row is-width-medium ">
        <div className="is-col is-100 x-body"><button onClick={this.backPage} className="is-small button is-secondary">Back</button></div>
        <div className="is-col is-70 x-body">
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      </div>
    );
  }
}

// export default Post;
export default connect(
  state => state,
  Actions
)(Post);