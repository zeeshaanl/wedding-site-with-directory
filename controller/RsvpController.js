const Guest = require('../Model/Guest');
const Mailer = require('../utils/Mailer');

const sendMail = Mailer.sendMail;
const sendErrorMail = Mailer.sendErrorMail;

const rsvpAction = async (request, response) => {
    const data = request.body;
    const { name, rsvp, nonVegetarian, vegetarian } = data;

    const guest = new Guest({
        name: name,
        rsvp: rsvp,
        vegetarian: vegetarian,
        nonVegetarian: nonVegetarian,
        created_at: new Date(),
    });

    try {
        await sendMail(name, rsvp, nonVegetarian, vegetarian);
        response.json({ status: 200 });
        await guest.save();
    }
    catch (error) {
        sendErrorMail(error);
        throw error;
    }
};

module.exports = rsvpAction;