const Guest = require('../Model/Guest');

const listAction = async (request, response) => {
    const data = request.body;

    if (Object.keys(data).length && data.password && data.password === process.env.GUESTLIST_PASS) {
        let yesCount = 0;
        let noCount = 0;
        const guestList = [];
        try {
            const users = await Guest.find();
            users.forEach(function (arrayItem) {
                const name = arrayItem.name || '';
                const rsvp = arrayItem.rsvp || '';
                const meal = arrayItem.meal || '';
                guestList.push({ name, rsvp, meal });
                if (arrayItem.rsvp === "Yes") {
                    yesCount++;
                }
                if (arrayItem.rsvp === "No") {
                    noCount++;
                }
            });
            response.render('guestList', {
                layout: false,
                guestList,
                yesCount,
                noCount
            });
        } catch (error) {
            console.log(error);
        }

    } else {
        const passwordMessage = (Object.keys(data).length && data.password !== process.env.GUESTLIST_PASS) ? 'Incorrect Password' : '';
        response.render('signIn', { layout: false, passwordMessage })
    }
};

module.exports = listAction;