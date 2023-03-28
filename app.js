const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "ApiKey here ",
  server: "us12",
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", async function (req, res) {
  const listId = "list_Id Here";

  const subscribingUser = {
    firstName: req.body.inputFName,
    lastName: req.body.inputLName,
    email: req.body.inputEmail,
  };

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
    //This if ran perfectly
    console.log(
      `Successfully added  contact as an audience member. The contact's id is ${response.id}.`
    );
    res.sendFile(__dirname + "/success.html");
  } catch (e) {
    //if there is an error
    console.log("There has been an error:" + e);
    res.sendFile(__dirname + "/failure.html");
  }
});

app.listen(3000, function () {
  console.log("Is running in the 3000 Port");
});

//_Api_: _3adce6a4f617ab26735fe9efe80ad6dc-us12_

//List Id : _5e91e2cc8a_
