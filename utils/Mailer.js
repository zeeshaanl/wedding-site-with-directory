const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'sheznat.wedding@gmail.com',
        pass: process.env.MAILER_PASS
    }
});

const sendMail = (name, rsvp, meal) => {
    return new Promise((resolve, reject) => {
        // send mail with defined transport object
        transporter.sendMail(generateMail(name, rsvp, meal), (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(info.response);
        });
    });
};

const generateMail = (name, rsvp, meal) => {
    const rsvpColor = {
        Yes: 'green',
        No: 'red'
    };
    const mealUnicode = {
        Vegetarian: '🍅',
        'Non-Vegetarian': '🍖'
    };

    const mealPreference = rsvp === 'Yes' ? `Their meal preference is <b>${meal}</b> ${mealUnicode[meal]}<br /><br />` : '';

    return {
        from: `"Sheznat Wedding" <sheznat.wedding@gmail.com>`, // sender address
        to: 'sheznat.wedding@gmail.com', // list of receivers
        subject: `RSVP Notification - ${name} - ${rsvp}`, // Subject line
        text: `Hi Natasha and Shezad,
                ${name} has responded with a ${rsvp}
                Their meal preference is ${meal}
                
                - With Love From Your Wedding Site ❤️`, // html body

        html: `Hi Natasha and Shezad,
            <br /><br />
            <b>${name}</b> has responded with a <b style="color:${rsvpColor[rsvp]}">${rsvp}</b>
            <br /><br />
            ${mealPreference}
        - With ❤ From Your Wedding Site️`, // plain text body
    };
};

module.exports = sendMail;