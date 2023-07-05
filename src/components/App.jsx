import { Component } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Statistics from './Statistics';
import Notification from './Notification';

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  leaveFeedback = event => {
    const btnName = event.target.name;
    this.setState(prevState => ({
      [btnName]: prevState[btnName] + 1,
    }));
  };

  countTotalFeedback() {
    const arrStateValue = Object.values(this.state);
    return arrStateValue.reduce((total, el) => (total += el));
  }

  countPositiveFeedbackPercentage() {
    const good = this.state.good;
    const totalStateValue = this.countTotalFeedback();
    return totalStateValue > 0 ? Math.round((good / totalStateValue) * 100) : 0;
  }

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const positiveFeedbackPercentage = this.countPositiveFeedbackPercentage();

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            leaveFeedback={this.leaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {totalFeedback ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={positiveFeedbackPercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}
