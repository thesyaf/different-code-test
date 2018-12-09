import React, { Component } from 'react';
import axios from 'axios';
import {  Link } from "react-router-dom";

class Tennants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tennant: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({isLoading: true})

    axios.get("https://hiring-task-api.herokuapp.com/v1/leases/")
    .then(result => this.setState({tennant: result.data, isLoading: false}))
    .catch(error => console.log("error", error))

  }

  render() {
    const { isLoading, tennant } = this.state;

    if (isLoading) {
      return <div className="main">LOADING</div>
    }

    return (
      <div className="App">
        <div className="main">
          <div className="card">
            <div className="tennant">Tennants</div>

            <div className="payments">

              {tennant.map((t) => ( 
                  <div>
                    <Link to={"/" + t.tenant + "/" + t.id} key={t.id} className="tennant">{t.tenant}</Link>
                  </div>
                ) 
              )}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Tennants;
