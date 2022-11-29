const { Room, Type, Countrie, Rent, Owner } = require("../db")

module.exports = {
    getRoomInfo: async function() {
        let rooms = await Room.findAll({
            include: {
                model: Type
            }
        })
        return rooms
    },
    postRoomInfo: async function(beds, description, image, bathroom, price, observation, typeId) {
        if(!beds || !description || !image || !bathroom || !price || !observation || !typeId) {
            return "Faltan ingresar datos"
        }
        else {
            let newBed = await Room.create({
                beds, description, image, bathroom, price, observation,typeId,
            })
            return newBed
            
        }
    },
    getCountries: async function(){
        let countries = await Countrie.findAll()
        return countries
    },
    postOwner: async function(data){
        const {name, lastName, user, hostelName, city ,
               country, zip, instagram, facebook, twitter, 
               mail, aboutUs, chooseUs, extra} = data
        let owner = await Owner.findAll()
        if (!owner.length){
            let newOwner = await Owner.create({
                name, 
                lastName, 
                user, 
                hostelName, 
                city,
                country, 
                zip, 
                instagram, 
                facebook, 
                twitter,
                mail,
                aboutUs,
                chooseUs,
                extra
             })
             return newOwner
        }else{
            let updateOwner = await Owner.findByPk(1)
            await updateOwner.update({
               name:name, 
               lastName:lastName, 
               user:user, 
               hostelName:hostelName, 
               city:city,
               country:country, 
               zip:zip, 
               instagram:instagram, 
               facebook:facebook, 
               twitter:twitter,
               mail:mail,
               aboutUs:aboutUs,
               chooseUs:chooseUs,
               extra:extra
            })
            await updateOwner.save()
            return updateOwner
        }
    },
    getOwner: async function(){
        let dataOwner = await Owner.findAll()
        
        return dataOwner[0]
    },
    getOwnerHome: async function(){
        let dataOwner = await Owner.findAll()
        let dataHome = {}
        if (dataOwner.length){
            let{hostelName, instagram, facebook, twitter, mail, aboutUs, chooseUs, extra} = dataOwner[0]
            dataHome = {hostelName, 
                            instagram, 
                            facebook, 
                            twitter, 
                            mail, 
                            aboutUs, 
                            chooseUs, 
                            extra}            
        }
        return dataHome
    },
    getRentsInfo: async function() {
        let rents = await Rent.findAll({})
        return rents
    },
  
    updateRent: async function(id) {
        console.log(id)
        let updateRent = await Rent.findByPk(id)
        await updateRent.update({ status: true })
        await updateRent.save()
        return updateRent
    }
 

}