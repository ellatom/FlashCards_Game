import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import FlashCards from './FlashCards';
import ManageCards from './ManageCards';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={FlashCards} />
          <Route path="/managecards" exact component={ManageCards} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
