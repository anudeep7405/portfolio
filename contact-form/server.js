// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to serve the contact form (optional if you're using HTML locally)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission and send the email
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter using your email service settings
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
            user: 'anudeep7405@gmail.com', // Replace with your email
            pass: 'Email@123',  // Replace with your email password
        },
    });

    // Email options (customize the email content)
    let mailOptions = {
        from: email, // Sender's email (the one submitted in the form)
        to: 'anudeep7405@gmail.com', // Recipient's email (where you want to receive messages)
        subject: `Message from ${name}`, // Email subject
        text: message, // Email body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).send('Error sending message');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
