//SERVER.JS
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();

//Netlify addition for front end container
app.use(cors({
  origin: "https://692de1b7aa0805644144ed9f--rococo-florentine-503cb7.netlify.app/",
  credentials: true
}));

// Auth additions
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./models/Users"); 


app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Everything in /public as a static file
//Tells express to serve any file inside public dir
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 2 // 2 hours
    }
  })
);
//use auth routes for all rotues that start with /
app.use("/", authRoutes);

// Make currentUser available in all pages (your part)
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});
//
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

//Routes that will send the correct files
//home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//create survey page
app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create.html'));
});
//view survey page
app.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'list.html'));
});



//Starting up the server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
