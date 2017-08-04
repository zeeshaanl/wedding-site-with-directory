var mongoose = require('mongoose');
var GuestSchema = new mongoose.Schema({
    name: String,
    rsvp: String,
    vegetarian: String,
    nonVegetarian: String,
    created_at: Date
});
mongoose.model('Guest', GuestSchema);

module.exports = mongoose.model('Guest');
