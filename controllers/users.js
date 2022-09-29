const UserModel = require("../models/model")

module.exports.registerUser = async( req, res) => {
    await UserModel.create(req.body)
    .then((user)=>{
        user.sayHello()
        res.status(201).json({
            "success": true,
            "message" : "Data Created",
            user
        })
    })
    .catch((e)=>{
        res.status(501).json({
            "success" : false,
            "message" : `Data could not be created because ${e}`

        })
    })
}

module.exports.getAllUsers = async(req, res) => {
    try{
        const id = req.body.id
        const users = await UserModel.find({_id: id})

        if(users){
         res.status(200).json({
             success: "true",
             users
         })
        }
        else if(users.length < 1 ){
         res.status(404).json({
             success: "true",
             message: "no record not found"
         })
        }
     }
     catch(e){
         res.status(501).json({
             success: false,
             error: e.message
         })
     }
}

module.exports.getUser =  async(req, res) => {
    const userID = req.params.id
    try{
       const user = await UserModel.findById(userID)
        user.sayHello()
       if(user){
        res.status(200).json({
            success: true,
            user
        })
       }
       else{
        res.status(404).json({
            success: false,
            message: `no record not found for user with id ${userID} `
        })
       }
    }
    catch(e){
        res.status(501).json({
            success: false,
            error: `Error Occured because ${e.message}`
        })
    }
}

module.exports.updateUser = async (req, res) => {
    const userID = req.params.id
    try{
       let user = await UserModel.findById(userID)

       if(user){
        user = await UserModel.findByIdAndUpdate(userID, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            user
        })
       }
       else{
        res.status(404).json({
            success: false,
            message: `no record not found for user with id ${userID} `
        })
       }
    }
    catch(e){
        res.status(501).json({
            success: false,
            error: `Error Occured because ${e.message}`
        })
    }
}

module.exports.deleteUser = async (req, res) => {
    const userID = req.params.id
    try{
       let user = await UserModel.findById(userID)

       if(user){
        await UserModel.findByIdAndDelete(userID)
        res.status(200).json({
            success: true,
            data: 'Data deleted successfully!'
        })
       }
       else{
        res.status(404).json({
            success: false,
            message: `no record not found for user with id ${userID} `
        })
       }
    }
    catch(e){
        res.status(501).json({
            success: false,
            error: `Error Occured because ${e.message}`
        })
    }
}