const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const User = require("../models/User");
const Survey = require("../models/Survey");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.sendGridKey);
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    //send email
    try {
      const msg = {
        to: survey.recipients, // Change to your recipient
        from: "prakharsingh11111@gmail.com", // Change to your verified sender
        subject: survey.subject,
        html: surveyTemplate(survey),
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
      await survey.save();
      const user = await User.findById(req.user._id);
      console.log(user);
      user.credits -= 1;
      await user.save();
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  });
};
