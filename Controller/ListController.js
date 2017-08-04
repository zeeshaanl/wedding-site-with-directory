const Guest = require('../Model/Guest');
const Mailer = require('../utils/Mailer');
const sendErrorMail = Mailer.sendErrorMail;

const listAction = async (request, response) => {
    const data = request.body;

    if (Object.keys(data).length && data.password && data.password === process.env.GUESTLIST_PASS) {
        let yesCount = 0;
        let noCount = 0;

        // current guest meal preference
        let vegetarian = 0;
        let nonVegetarian = 0;

        // total guests meal preference count
        let vegCount = 0;
        let nonVegCount = 0;
        const guestList = [];
        try {
            const users = await Guest.find();
            users.forEach(function (arrayItem) {
                const name = arrayItem.name || '';
                const rsvp = arrayItem.rsvp || '';
                const isComing = rsvp === 'Yes';
                vegetarian = arrayItem.vegetarian || '';
                nonVegetarian = arrayItem.nonVegetarian || '';
                guestList.push({ name, rsvp, vegetarian, nonVegetarian, isComing });
                if (arrayItem.rsvp === "Yes") {
                    yesCount++;
                    vegCount = vegCount + parseInt(arrayItem.vegetarian);
                    nonVegCount = nonVegCount + parseInt(arrayItem.nonVegetarian);
                }
                if (arrayItem.rsvp === "No") {
                    noCount++;
                }
            });
            response.render('guestList', {
                guestList,
                yesCount,
                noCount,
                vegCount,
                nonVegCount,
                vegetarian,
                nonVegetarian
            });
        } catch (error) {
            sendErrorMail(error);
            throw(error);
        }

    } else {
        const passwordMessage = (Object.keys(data).length && data.password !== process.env.GUESTLIST_PASS) ? 'Incorrect Password' : '';
        response.render('signIn', { passwordMessage })
    }
};

module.exports = listAction;