import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card darken-3">
          <div className="card-content">
            <span className="card-title blue-text">{survey.title}</span>
            <p>Subject: {survey.subject}</p>
            <p>Question: {survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a href="#" className="green-text">
              Yes: {survey.yes}
            </a>
            <a href="#" className="red-text">
              No: {survey.no}
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="container">{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
