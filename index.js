const express=require('express');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const authRoutes=require('./routes/authRoutes');
const billingRoutes=require('./routes/billingRoutes');
const surveyRoutes=require('./routes/surveyRoutes');
const keys=require('./config/keys');
const passport = require('passport');
const bodyParser=require('body-parser');
const path=require('path');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app=express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if(process.env.NODE_ENV==='production'){
//Express will serve up production assets(main.js, main.css)
    app.use(express.static('client/build'));
//Express will serve up index.html file if unrecognized route
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT=process.env.PORT || 5000;

app.listen(PORT);