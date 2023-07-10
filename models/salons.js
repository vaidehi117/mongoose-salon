const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//one Appointment
// SCHEMA Defines what structure/shape 
// that the documents created from the Movie Model
// that our stored in the database should look like

const salonSchema = new mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Date: {
        type: Date,
        default: () => new Date(new Date().setFullYear(new Date().getFullYear()+1)),
    },
    AppointmentType: {
        type: String,
        enum: ['Haircut', 'Hair-Color','Hair-Extentions', 'Hair-Straightening', 'Hair-Permimg','Styling'],
        required: trusted
    },
    CorrectInformation: {
        type: Boolean, 
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Salon', salonSchema);