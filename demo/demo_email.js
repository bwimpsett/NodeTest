const nodemailer = require('nodemailer');

class EmailInfo {
    constructor(userName, password, emailService, to, subject, text) {
        this.userName = userName;
        this.password = password;
        this.emailService = emailService;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    get from(){
        return this.userName;
    }
    
    sendEmail() {
        var transporter = nodemailer.createTransport({
            service: this.emailService,
            auth: {
                user: this.userName,
                pass: this.password
            }
        });
        
        var mailOptions = {
            from: this.userName,
            to: this.to,
            subject: this.subject,
            text: this.text
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
