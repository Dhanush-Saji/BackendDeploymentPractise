const jwt = require('jsonwebtoken')
const token = process.env.token
const authenticate = (req,res,next)=>{
    const key = req.headers.authorization
    if(key){
        const decoded = jwt.verify(key,token) //decode the token
        if(decoded){
            const userID = decoded.userID //here we got the tokenized userID(_id of user midel)
            req.body.userID = userID //added to the request body, so that I can access in notes route.
            next()
        }
        else{
            res.status(500).send("Please login First")
        }
    }
    else{
        res.status(500).send("Please login First")
    }
}
module.exports={
    authenticate
}