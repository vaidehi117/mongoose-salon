const salon = require("../models/salon");
const SalonModel = require("../models/salon");

module.exports = {
    // index,
    show,
    new: newAppointment,
    // updateAppointment,
    create,
    home,
    appointments
};


async function home(req, res) {
    try {
        const salons = await SalonModel.find({});
        // console.log(salons);
        res.render("index");
    } catch (err) {
        console.log(err);
        res.render(err);
    }
}




async function appointments(req, res) {
    try {
        const salons = await SalonModel.find({});
        console.log("Appointment got called");
        res.render("salons/appointments",  { title: "All salons", salons: salons });
    } catch (err) {
        console.log(err);
        res.render(err);
    }
}

async function show(req, res) {
    const salon = await SalonModel.findById(req.params.id);
    // console.log(salon)
    res.render('salons/show', { title: 'Appointment Details', salon });
}

function newAppointment(req, res) {
    // We'll want to be able to render an
    // errorMsg if the create action fails
    res.render("salons/new", { title: "Add Appointment", errorMsg: "" });
}

// async function updateAppointment(req, res) {

//     //retrive the appointmentId and update details from the request body
//     const appointments = await SalonModel.findById({req.params._id})


//     res.render("salons/show", { title: "Update Appointment", errorMsg: "" })
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




{/* <br><br>
<h2>Give Any Suggestions for Your Appointment</h2>

  <form action="/salons" _method="PUT" method="POST">
    <label>Suggestions:</label>
    <textarea name="Content"></textarea>
    <br>  
    <button type="submit">Suggestions</button>
  </form>  */}