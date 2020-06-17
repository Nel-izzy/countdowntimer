import React, { Component } from "react";
import CountDownTimer from "./CountDownTimer";
import "./CountDownForm.css";

export default class CountDownForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: "",
      date: "",
      submitted: false,
      error: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { event, date } = this.state;
    if (event !== "" && date !== "") {
      let today = new Date();
      let dd = today.getDate();

      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      if (dd < 10) {
        dd = `0${dd}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }
      today = `${yyyy}-${mm}-${dd}`;

      if (date <= today) {
        this.setState({ error: "Please enter a date in the future!" });
      } else {
        this.setState({
          submitted: true,
          event: "",
          error: "",
        });
      }
    }
  };
  componentDidMount() {
    const today = new Date();
    console.log(today.toDateString());
  }

  render() {
    const display = (
      <form onSubmit={this.handleSubmit} className="form">
        <h2>Register an Event</h2>
        <div className="event">
          <label>Event Name</label>
          <input
            placeholder="Enter memorable event"
            type="text"
            name="event"
            value={this.state.event}
            onChange={this.handleChange}
          />
        </div>
        <div className="date">
          <label>Date</label>
          <input
            placeholder="Enter a memorable date"
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </div>

        <button>Start</button>
      </form>
    );
    return (
      <div>
        {this.state.submitted ? (
          <CountDownTimer date={this.state.date} />
        ) : (
          display
        )}
        <h4 style={{ color: "#ee1000", marginLeft: "3rem" }}>
          {this.state.error}
        </h4>
      </div>
    );
  }
}
