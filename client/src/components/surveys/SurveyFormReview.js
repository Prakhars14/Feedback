import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter, useHistory } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const history = useHistory();
  return (
    <div style={{ margin: "12%" }}>
      <h5>Please confirm your entries</h5>
      <div style={{ marginTop: "20px" }}>
        <div>
          <label>Survey Title</label>
          <div>{formValues.title}</div>
        </div>
        <div>
          <label>Subject Subject</label>
          <div>{formValues.subject}</div>
        </div>
        <div>
          <label>Survey Question/Body</label>
          <div>{formValues.body}</div>
        </div>
        <div>
          <label>Recipient List (Email IDs)</label>
          <div>{formValues.recipients}</div>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button
          className="green white-text btn-flat"
          onClick={() => submitSurvey(formValues, history)}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
