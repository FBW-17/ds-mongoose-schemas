const mongoose = require("mongoose")
const faker = require("faker")

// CREATE A SCHEMA (=> describes structure of a docment)
const userSchema = new mongoose.Schema({
    name: String,
    isAdmin: Boolean    
}, {versionKey: false})

// ATTACH SCHEMA TO A COLLECTION IN MONGODB
const User = mongoose.model("users", userSchema)

// CONNECT TO MONGODB
const connectOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect("mongodb://localhost/users", connectOptions)
.then(() => { // AFTER connection we can not work with collections & their data
    
    console.log("Connected to MongoDB")

	// create three initial records in our database 
	// we also call this "seeding" our database
    for(let i=0; i<5; i++) {
		
		// create a new User document (=record)
        let user = new User({
            name: faker.name.findName(), 
            isAdmin: faker.random.boolean()
        })
		// save the record to the users collection
        user.save()
    }

})

