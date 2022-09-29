const express = require("express")
const morgan = require("morgan")
const app = express()
const UserRoute = require('./routers/userRouter')
const mongoose = require('mongoose')
const MyModel = require('./models/model')
mongoose.connect('mongodb://localhost/UserRegisteration')
.then(()=>{console.log('Database Connected')})
.catch((e)=> {console.log(`Database could not connect because of ${e.message}`)})

const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/v1',UserRoute)


app.get('/', (req, res)=>{
    res.json({
        "message" : "Welcome",
        "status" : "Successful",
        "date" : Date.now()
    })

    console.log(req.url)
})

app.get('/user/:id', (req,res)=>{

    const myUsers = ['Tobi', 'Shola', 'Ibrahim', 'Sodiq', 'Ganeeya', 'Mary', 'Gbemi']

    let user = req.params.id

    let presence = false

    for (let i in myUsers){
        if (myUsers[i] == user){
        presence = true
        break
        }
    }

    if(presence){
        res.status(200).json({
            "success" : "true",
            "message" : `Welcome ${user}`
        })
    }

    else{
        res.status(404).json({
            "success" : "false",
            "message" : `No record found for ${user}`
        })
    }
})

const PORT = 9000

app.listen(PORT, ()=>{
    console.log(`Server is runnig on PORT ${PORT}`)

async () => {
    const data = await MyModel.find({age : 16})
    console.log("This",data)
}
})

