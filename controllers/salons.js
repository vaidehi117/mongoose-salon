const SalonModel = require("../models/salon");

module.exports = {
    index
};

async function index(req, res){
    const salons = await SalonModel.find({});
    console.log(salons);
    res.render("salons/index", { title: "All Appointment", salons: salons})
}
