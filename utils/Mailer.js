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

const sendErrorMail = (error) => {
    transporter.sendMail({
        from: `"Sheznat Wedding" <sheznat.wedding@gmail.com>`, // sender address
        to: 'zeeshaanl@gmail.com', // list of receivers
        subject: `Error on Sheznat`, // Subject line
        text: `
            ${error}
        `, // html body
    });
};

const sendMail = (name, rsvp, nonVegetarian, vegetarian) => {
    return new Promise((resolve, reject) => {
        // send mail with defined transport object
        transporter.sendMail(generateMail(name, rsvp, nonVegetarian, vegetarian), (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
};

const generateMail = (name, rsvp, nonVegetarian, vegetarian) => {
    const rsvpColor = {
        Yes: 'green',
        No: 'red'
    };

    let mealPreference = '';

    if (rsvp === 'Yes') {
        mealPreference = `
            <br /><br />
        🍖 Non-Vegetarian: <b>${nonVegetarian}</b><br /><br />
        🍅 Vegetarian : <b>${vegetarian}</b>`
    }

    return {
        from: `"Sheznat Wedding" <sheznat.wedding@gmail.com>`, // sender address
        to: 'lakdawala2018@gmail.com', // list of receivers
        subject: `RSVP Notification - ${name} - ${rsvp}`, // Subject line
        text: `Hi Natasha and Shezad,
                ${name} has responded with a ${rsvp}.
                ${mealPreference}
                
                <br /><br />From: Your Wedding Site️ ❤`, // html body

        html: `Hi Natasha and Shezad,
            <br /><br />
            <b>${name}</b> has responded with a <b style="color:${rsvpColor[ rsvp ]}">${rsvp}</b>.
            ${mealPreference}
            
        <br /><br />From: Your Wedding Site️ ❤`, // plain text body
    };
};

module.exports = {
    sendMail,
    sendErrorMail
};