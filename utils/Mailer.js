const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendErrorMail = (error) => {
    sgMail.send({
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
        sgMail
            .send(generateMail(name, rsvp, nonVegetarian, vegetarian))
            .then(info => {
                resolve(info.response)
            })
            .catch(error => {
                reject(error);
            })
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
        // to: 'lakdawala2018@gmail.com', // list of receivers
        to: 'zeeshaanl@gmail.com',
        from: `"Sheznat Wedding" <sheznat.wedding@mailer.com>`, // sender address
        subject: `RSVP Notification - ${name} - ${rsvp}`, // Subject line
        text: `Hi Natasha and Shezad,
                ${name} has responded with a ${rsvp}.
                ${mealPreference}
                
                <br /><br />From: Your Wedding Site️ ❤`, // html body

        html: `Hi Natasha and Shezad,
            <br /><br />
            <b>${name}</b> has responded with a <b style="color:${rsvpColor[rsvp]}">${rsvp}</b>.
            ${mealPreference}
            
        <br /><br />From: Your Wedding Site️ ❤`, // plain text body
    };
};

module.exports = {
    sendMail,
    sendErrorMail
};