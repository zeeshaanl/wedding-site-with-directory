const Guest = require('../Model/Guest');
const sendMail = require('../utils/Mailer');

const rsvpAction = async (request, response) => {
    const data = request.body;
    const { name, rsvp, meal } = data;

    const guest = new Guest({
        name: name,
        rsvp: rsvp,
        meal: meal,
        created_at: new Date()
    });

    try {
        await sendMail(name, rsvp, meal);
        response.json({ status: 200 });
        await guest.save();
    }
    catch (error) {
        throw error;
    }
};

module.exports = rsvpAction;