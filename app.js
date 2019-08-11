const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true}));

//static folder
app.use(express.static(path.join(__dirname, 'public'))); //we wanna look in a currnt directory __ in folder public

//signup route - post request for handaling
app.post('/signup', (req, res) => {
    const { firstName, lastName, email } =req.body;

    //make sure fields are filled
    if (!firstName || !lastName || !email){
        res.redirect('/fail.html');
        return;
    }

    //Construct req date - data we send
    const data = {
        members:[
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    //We send the object as a string
    const postData = JSON.stringify(data);


    //request to mailchimp module
    const options = {
        url: 'https://us3.api.mailchimp.com/3.0/lists/62b67135b7',
        method: 'POST',
        headers: {
            Authorization: 'auth b5439704c0325b9155b2c246155c0e6d-us3'
        },
        body: postData
    };

    request(options, (err, response, body) => {
        if(err) {
            res.redirect('/fail.html');
        } else {
            if(response.statusCode === 200) {
                res.redirect('/success.html');
            } else {
                res.redirect('/fail.html');
            }
          }
        });
      });
    

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
    
