import React, { Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import Header from '../Header';
import Footer from '../Footer';

const App = ({ children }) => (
  <Fragment>
    <Header />
    {children}
    <Footer />
  </Fragment>
);

// export default App;
export default connect(
  state => state,
  Actions
)(App);
