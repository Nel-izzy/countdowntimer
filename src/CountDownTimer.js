import React, { Component } from "react";

export default class CountDownTimer extends Component {
  constructor(props) {
    super(props);
    const t = this.getTimeRemaining(this.props.date);
    this.state = {
      days: t.days,
      hours: t.hours,
      minutes: t.minutes,
      seconds: t.seconds,
    };
  }

  getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }
  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes, hours, days } = this.state;
      if (seconds > 0) {
        this.setState((currState) => ({
          seconds: currState.seconds - 1,
        }));
      }
      if (minutes > 0 && seconds === 0) {
        this.setState((currState) => ({
          minutes: currState.minutes - 1,
          seconds: 59,
        }));
      }

      if (hours > 0 && minutes === 0 && seconds === 0) {
        this.setState((currState) => ({
          hours: currState.hours - 1,
          minutes: 59,
        }));
      }
      if (days > 0 && hours === 0 && minutes === 0 && seconds === 0) {
        this.setState((currState) => ({ days: currState.days - 1, hours: 23 }));
      }
    }, 1000);
    console.log(this.state);
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds, hours, days } = this.state;
    return (
      <div>
        {minutes === 0 && seconds === 0 && days === 0 && hours === 0 ? (
          <h1>Countdown Finished!</h1>
        ) : (
          <h1>
            Time Remaining: {days} days {hours} hours {minutes} mins{" "}
            {seconds < 10 ? `0${seconds} Sec` : `${seconds} Sec`}
          </h1>
        )}
      </div>
    );
  }
}
