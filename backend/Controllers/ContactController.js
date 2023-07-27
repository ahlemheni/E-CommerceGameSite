const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like 'SMTP', 'SendGrid', etc.
    auth: {
      user: 'YOUR_GMAIL_USERNAME', // Replace with your Gmail username or email
      pass: 'YOUR_GMAIL_PASSWORD', // Replace with your Gmail password
    },
  });
module.exports.contact = async (req, res) => {
    try {

      const { usernameInput, emailInput,messageInput } = req.body;
  
      const mailOptions = {
        from: senderEmail,
        to: emailInput,
        subject: `Contact Form Message from user ${usernameInput}`,
        text: messageInput,
      };
  

      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Message sent successfully! a reply will be sent to your provided mail...' });
    } 
    catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    }
  };
  