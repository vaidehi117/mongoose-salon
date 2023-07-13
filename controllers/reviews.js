// Import our  model in order to talk to the salons collection in mongodb
const SalonModel = require('../models/salon');

module.exports = {
    create,
    delete: deleteReview,
    // edit,
    update: updateReview
};

// async function edit(req, res,)

async function updateReview(req, res,) {
    try{
        //Find the appointment with review 
        const salonDoc = await SalonModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});

        //Find the review subdoc using the id method on mongoose arrays
        const reviewSubdoc = salonDoc.reviews.id(req.params.id);

        //Make user the review was created by the logged in user 
        if(!reviewSubdoc.reviews.user.equals(req.user.id)) return res.redirect(`/salons/${salon.id}`);

        //update the text of the review 
        reviewSubdoc.Content = req.body.Content;
        //save the updated book 
        salonDoc.save();
        
        //redirect back to the salon's show page 
        res.redirect(`/salons/${salon._id}`);

    } catch(err){
        res.send(err)
    }
}

async function deleteReview(req, res, next) {

    try{
        //Find the appointment with the review
        const salonDoc = await SalonModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});

        //A user that is not logged in
        if(!salonDoc) return res.redirect('/salons');

        //Remove the review from the salon salon.review array
        //remove takes the id of the review
        salonDoc.reviews.remove(req.params.id);
        //Muted the salonDoc reviews array so we need to tell mongodb to update the database
        await salonDoc.save();
    
        //tells the client to make a request to this route 
        res.redirect(`/salons/${salonDoc._id}`);

    }catch(err){
        res.send(err)
    }
}

async function create(req,res) {
    console.log(req.body);

    try {

        const salonFromTheDatabase = await SalonModel.findById(req.params.id);
        //Add the logged in user property to req,body
        req.body.user = req.user._id;
        req.body.userName = req.user.Name;
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