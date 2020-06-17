import React, { Component } from "react";
import CountDownTimer from "./CountDownTimer";

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
  //   initializeClock = (endtime) => {
  //     const t = getTimeRemaining(endtime);
  //     this.setState({
  //       seconds: t.seconds,
  //       minutes: t.minutes,
  //     });
  //   };

  handleSubmit = (e) => {
    e.preventDefault();
    const { event, date } = this.state;
    if (event !== "" && date !== "") {
      //const today = new Date();
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
    // const today = new Date();
    // //console.log(today);
    // console.log(today.toLocaleDateString());
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Event Name</label>
            <input
              type="text"
              name="event"
              value={this.state.event}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>

          <button>Start</button>
        </form>
        <h4 style={{ color: "#ee1000" }}>{this.state.error}</h4>
        {this.state.submitted ? (
          <CountDownTimer date={this.state.date} />
        ) : null}
      </div>
    );
  }
}
