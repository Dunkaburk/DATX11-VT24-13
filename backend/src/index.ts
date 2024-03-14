import { config } from "dotenv";
import express from "express";
import taskRouter from "./routers/taskRouter";
import categoryRouter from "./routers/categoryRouter";
import userRouter from "./routers/userRouter";
import moduleRouter from "./routers/moduleRouter";



const app = express();
config();

app.use("/task", taskRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/module", moduleRouter);


app.get("/:name", (req, res) => {
	const name = req.params.name;
	res.status(200).send(`Hej ${name}`);
});

app.listen(process.env.PORT || 3000, () => { console.log(`Server started on ${process.env.PORT || 3000}`) });



// Setup LTI -----------------------------------------------------
const path = require('path')
const lti = require('ltijs').Provider
const Request = require('../Utils/Request')

lti.setup(process.env.LTI_KEY,
  {
    url: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?authSource=admin',
    connection: { user: process.env.DB_USER, pass: process.env.DB_PASS }
  }, {
    staticPath: path.join(__dirname, './public'), // Path to static files
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    devMode: true // Set DevMode to true if the testing platform is in a different domain and https is not being used
  })

// When receiving successful LTI launch redirects to app
lti.onConnect(async (token:any, req:any, res:any) => {
  return res.sendFile(path.join(__dirname, './public/index.html'))
})

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token:any, req:any, res:any) => {
  return lti.redirect(res, '/deeplink', { newResource: true })
})

// Setting up routes
lti.app.use(routes)