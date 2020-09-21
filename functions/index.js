const functions = require("firebase-functions");

//going to build express app and host it in cloud functions

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HSDxVIT8Pbjek6Z171mb2tnsoyeaM2sL50DhErsC7nFUmVdQqCDVDpOUnGuYy9cS7XBzUiuJXqRuMnY74jj0Cil00El7r2i0m"
);

//API

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello JK!"));

app.post("/payments/create", async (request, response) => {
  //We are calling this post request from "Payment.js"
  const total = request.query.total;

  console.log("Payment Request received >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "inr",
  });

  //OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen command
//cloud function
exports.api = functions.https.onRequest(app);

//example endpoint
// http://localhost:5001/challenge-9897b/us-central1/api
