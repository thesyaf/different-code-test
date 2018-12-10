import React, { Component } from 'react';
import './tennant.css';
import axios from 'axios';
import Rent from './components/rent';

class Tennant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tennant: "",
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({isLoading: true})

    axios.get("https://hiring-task-api.herokuapp.com/v1/leases/" + this.props.match.params.tennantId)
    .then(result => this.setState({tennant: result.data, isLoading: false}))
    .catch(error => console.log("error", error))

  }

  render() {
    const { isLoading, tennant } = this.state;
    const { tenantName } = this.props.match.params;

    if (isLoading) {
      return <div className="main">LOADING</div>
    }

    return (
      <div className="App">
        <div className="main">
          <div className="card">
            <div className="tennant">Tennant Name: {tenantName}</div>
            <div className="agreement">Start Date: {tennant.start_date}</div>
            <div className="agreement">End Date: {tennant.end_date}</div>
            <div className="agreement">${tennant.rent} to be paid on {tennant.payment_day} {tennant.frequency}</div>

            <div className="payments">
              <Rent 
                startDate={tennant.start_date} 
                endDate={tennant.end_date} 
                paymentDay={tennant.payment_day} 
                rentAmount={tennant.rent} 
                frequency={tennant.frequency}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Tennant;
