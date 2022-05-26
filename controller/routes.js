const express = require('express');
const user = require('../models/usermodels.js')
const router = express.Router();

router.get('/',(req,res,next)=>{
  res.send({
    method: req.method,
    url: req.url

  })
})

router.get('/sign-in',(req, res, next)=>{
  res.send({
    method: req.method,
    url: req.url

  })
})

router.get('/sign-up',(req, res, next)=>{

res.sendFile("C:\Users\Holard\Desktop\Klassika\views\sign-up.html")
})

router.post('/sign-in',(req, res, next)=>{
  res.send({
    method: req.method,
    url: req.url

  })
})

router.post('/sign-up',async(req, res, next)=>{
try{

}catch(err){
  const newUser = await user.create(req.body);
  console.log(err)
}

res.send(newUser);

})

router.delete('/:id',(req, res, next)=>{
  console.log(req.params.id)
  res.send({
    method: req.method,
    url: req.url

  })
})

module.exports = router;
