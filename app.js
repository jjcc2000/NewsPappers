const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "ab54ab48a23acab74f6d2cd83db43a27-us12",
  server: "us12",
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const listId = "5e91e2cc8a";

  const subscribingUser = {
    firstName: req.body.inputFName,
    lastName: req.body.inputLName,
    email: req.body.inputEmail,
  };

  try {
    async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      console.log(
        //The code run well if it's in the console
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
    }
    run();
    //if it got to this point means that is good
    res.sendFile(__dirname + "/success.html");
  } catch (error) {
    //this run if something went wrong
    //the cacht should be display in the console
    console.log(error.status);
    res.sendFile(__dirname + "/failure.html");
  }
});

app.listen(3000, function () {
  console.log("Is running in the 3000 Port");
});

//ab54ab48a23acab74f6d2cd83db43a27-us12

// l
