import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout/layout';
import Events from './components/events/events';

function App() {
  return (
    <div className="App">
      <Layout>
        <Events />
      </Layout>
    </div>
  );
}

export default App;
