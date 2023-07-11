const salon = require("../models/salon");
const SalonModel = require("../models/salon");

module.exports = {
    index,
    show,
    new: newAppointment,
    // index: getAllAppoinments,
    create
};

async function index(req, res) {
    try {
        const salons = await SalonModel.find({});
        // console.log(salons);
        res.render("salons/index",  { title: "All salons", salons: salons });
    } catch (err) {
        console.log(err);
        res.render(err);
    }
}

async function show(req, res) {
    const salon = await SalonModel.findById(req.params.id);
    res.render('salons/show', { title: 'Appointment Details', salon });
}

function newAppointment(req, res) {
    // We'll want to be able to render an
    // errorMsg if the create action fails
    res.render("salons/new", { title: "Add Appointment", errorMsg: "" });
}

// function getAllAppoinments(req, res) {
//     res.render("salons/appointments", { title: "All Appointment", salons: salons  });
// }

async function create(req, res) {
    //convert correct information checkbox of nothing or "on" to boolean
    req.body.CorrectInformation = !!req.body.CorrectInformation;

    //Remove empty properties so that defaults will be applied 
    for (let key in req.body) {
        if (req.body[key] === "") delete req.body[key];
    }
    try {
        const salonFromTheDatabase = await SalonModel.create(req.body);
        console.log(salonFromTheDatabase);
        res.redirect(`salons/${salonFromTheDatabase._id}`);
    } catch (err) {
        console.log(err);
        res.render("salons/new", { errorMsg: err.message });
    }
}