
module.exports =(app) => {
    app.post("/file/upload", (req,res) =>{
        console.log(req);
        res.send({name: req.body.name})
    })
}