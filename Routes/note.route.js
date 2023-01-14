const express = require('express')
const noteRouter = express.Router()
const {Notemodel} = require('../model/note.model')
const {authenticate} = require('../middleware/authorization.middleware')

noteRouter.get('/',async(req,res)=>{
    try {
        const note = await Notemodel.find({})
        res.send(note)

    } catch (error) {
        res.status(500).send("Error")
    }
})

noteRouter.use(authenticate)
noteRouter.post('/create',async(req,res)=>{
    const payload = req.body
    try {
        const note = new Notemodel(payload)
        const datas = await note.save()
        res.status(200).send(datas)
    } catch (error) {
        res.status(500).send("Error:",error)
        
    }
})

// {
//     "title":"Test2",
//     "note":"Test2pass",
//     "category":"sample2"
//   }

noteRouter.patch('/update/:id',async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    const note = await Notemodel.findOne({_id:ID})
    const userID_in_notes = note.userID
    const userID_in_req = req.body.userID
    try {
        if(userID_in_notes != userID_in_req){
            res.status(500).send("You're not authorized")
        }
        else{

            await Notemodel.findByIdAndUpdate({_id:ID},payload)
            res.status(200).send("Updated")
        }
    } catch (error) {
        res.status(500).send("something went wrong",error)
    }
})
noteRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id
    const note = await Notemodel.findOne({_id:ID})
    const userID_in_notes = note.userID
    const userID_in_req = req.body.userID
    try {
        if(userID_in_notes != userID_in_req){
            res.send("You're not authorized")
        }
        else{

            await Notemodel.findByIdAndDelete({_id:ID})
            res.send("Deleted")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports={
    noteRouter
}