import React, { Component } from 'react';



class Rent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentDate: "",
            dayRent: 0,
        }
    }

    formatDate = (d) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        return months[month] + ", " + day + " " + year;
    }

    fullWeeks = (start) => {
        let firstDay = new Date(start);
        let endDay = new Date(start);
        let tableRows = []

        for (let d = 1; d <= this.state.fullCycles; d++ ) {
            firstDay.setDate(firstDay.getDate() + 1)        
            endDay.setDate(firstDay.getDate() + this.state.daysInCycle)
            tableRows.push(
                <tr key={d}>
                    <td>{this.formatDate(firstDay)}</td>
                    <td>{this.formatDate(endDay)}</td>
                    <td>{this.state.daysInCycle}</td>
                    <td>${this.state.daysInCycle * this.state.dayRent}</td>
                </tr>
            );
            firstDay = new Date(endDay);
        }

        return tableRows
    }

    firstPaymentDate = (start, day) => {
        const dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        let firstRentDate = ""

        for(var d = new Date(start); d <= new Date(); d.setDate(d.getDate() + 1)) {
            let thisday = d.getDay()
            if (dayOfWeek[thisday] === day) { 
                firstRentDate = this.formatDate(d)
                break
            }
        }

        return firstRentDate
    }

    lastWeek = () => {
        let { daysInFinalWeek, dayRent, lastDay } = this.state;


        if (!daysInFinalWeek) {
            return null
        }

        let weekStart = new Date(lastDay)

        weekStart.setDate(weekStart.getDate() - daysInFinalWeek)
        return <tr>
                    <td>{this.formatDate(weekStart)}</td>
                    <td>{this.formatDate(lastDay)}</td>
                    <td>{daysInFinalWeek}</td>
                    <td>${daysInFinalWeek*dayRent}</td>
                </tr>
    }

    daysBetween = (dateOne, dateTwo) => {
        let start = Date.parse(dateOne);
        let end = Date.parse(dateTwo);
        let timeDiff = end - start;
        let daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

        return daysDiff
    }

    componentDidMount() {
        let { rentAmount, frequency, startDate, endDate, paymentDay } = this.props;
        let periods = {"weekly": 7, "fortnightly": (7 * 2), "monthly": (7 * 4)};
        let days = ""
        switch (frequency) {
            case "weekly":
                days = periods.weekly;
                break;
            case "fortnightly":
                days = periods.fortnightly;
                break;
            case "monthly":
                days = periods.monthly;
                break;
            default:
        };

        this.setState({
            dayRent:  (rentAmount/days).toFixed(2),
            daysInCycle: days,
            daysInLease: this.daysBetween(this.firstPaymentDate(startDate, paymentDay), endDate),
            daysInFinalWeek: this.daysBetween(this.firstPaymentDate(startDate, paymentDay), endDate) % days,
            fullCycles: Math.floor(this.daysBetween(this.firstPaymentDate(startDate, paymentDay), endDate) / days),
            firstPaymentDate: this.firstPaymentDate(startDate, paymentDay),
            firstDay: new Date(this.props.startDate),
            lastDay: new Date(this.props.endDate),
        })
    }


    render() {
        console.log(this.state)
        let { startDate } = this.props;
        let { firstPaymentDate, firstDay, dayRent } = this.state;

        return (
            <table className="payment-table">
                <tbody>
                    <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Days</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>{this.formatDate(new Date(this.state.firstDay))}</td>
                        <td>{firstPaymentDate}</td>
                        <td>{this.daysBetween(startDate, firstPaymentDate)}</td>
                        <td>${this.daysBetween(startDate, firstPaymentDate)*dayRent}</td>
                    </tr>

                    {this.fullWeeks(firstPaymentDate)}
                    {this.lastWeek()}
                </tbody>
            </table>
        );
    }
}

export default Rent;
