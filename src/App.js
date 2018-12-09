import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Tennants from './tennants';
import Tennant from './tennant';

function Home() {
  return (
    <BrowserRouter>
        <div>
          <Route exact path="/" component={Tennants} />
          <Route path="/:tenantName/:tennantId" component={Tennant} />
        </div>
    </BrowserRouter>
  );
}


export default Home;