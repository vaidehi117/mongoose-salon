// Import our movie model in order to talk to the movies collection in mongodb
const SalonModel = require('../models/salon');

module.exports = {
    create
};

async function create(req,res) {
    console.log(req.body);

    try {

        const salonFromTheDatabase = await SalonModel.findById(req.params.id);
        //Add the logged in user property to req,body
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        salonFromTheDatabase.reviews.push(req.body);
        // since I changed a document (salonFromTheDb) (I mutated it)
		// I have to tell mongodb that, so we have to save
        await salonFromTheDatabase.save();
        //Then respond to the client
        console.log(salonFromTheDatabase);
        res.redirect(`/salons/${req.params.id}`);
    }catch(err) {
        res.send(err)
    }
}