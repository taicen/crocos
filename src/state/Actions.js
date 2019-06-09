import axios from 'axios';
import API from '../api';

const loadData = Store => (state) => {
  if(!state.data){
    Store.setState({ isLoading: true });
    // setTimeout( () => {
      axios.get(`${API.HOST}${API.POSTS}`).then((response) => {
        const { data } = response;
        Store.setState({ data, isLoading: false});
      }).catch((error) => {
        console.log(error);
      });
    // }, 2000);
  } else {
    // const { data, isLoading } = state;
    return { data: state.data, isLoading: false };
  }
};

const addOneData = Store => (state, form) => {
  const { title, body } = form;
  Store.setState({ isLoading: true });
  axios({
    method: 'post',
    url: `${API.HOST}${API.POSTS}`,
    data: {
      title: title,
      body: body,
      userId: 1
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then((response) => {
    console.log(response);
    
    switch(response.status) {
      case 201: 
        const { data } = state;
        data.push(response.data);
        console.log('DATA', data);
        // Store.setState({ data });
        Store.setState({ isLoading: false });
        
        break;
      default: break;
    }  
  }).catch((error) => {
    console.log(error);
  });
};

const deleteOneData = Store => (state, idx) => {

  Store.setState({ isLoading: true });

  axios({
    method: 'delete',
    url: `${API.HOST}${API.POSTS}/${idx}`,
  }).then((response) => {
    console.log(response);
    switch(response.status) {
      case 200: 
        const data = state.data.filter(({id}) => ( id !== idx ));
        Store.setState({ data, isLoading: false });
        break;
      default: break;
    } 
  }).catch((error) => {
    console.log(error);
  });

};

const editOneData = Store => (state, post) => {
  Store.setState({ isLoading: true });
  axios({
      method: 'put',
      url: `${API.HOST}${API.POSTS}/${post.id}`,
      data: {
        title: post.title,
        body: post.body,
        userId: 1
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((response) => {
      console.log(response);
      switch(response.status) {
        case 200: 
          // const { data } = response;
          state.data.map((item) => { 
            if (item.id === post.id) {
              item.title = post.title; 
              item.body = post.body; 
            }
            return item;
          });
          Store.setState({ isLoading: false});
          
          break;
        default: break;
      }  
    }).catch((error) => {
      console.log(error);
    });
};

export default Store => ({
  loadData: loadData(Store),
  editOneData: editOneData(Store),
  deleteOneData: deleteOneData(Store),
  addOneData: addOneData(Store),
});
