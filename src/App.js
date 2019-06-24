import React, { Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from './state/Actions';

import Header from './components/Header';
import Footer from './components/Footer';

const App = ({ children }) => {
  return (
    <Fragment>
      <Header/>
        {children}
      <Footer />
    </Fragment>
  );
};

// export default App;
export default connect(
  state => state,
  Actions
)(App);
