const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


// POST: /api/auth/createuser
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
] ,async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    try{
        let user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
    }

    const salt  = bcrypt.genSaltSync(10);
    const secpass = await bcrypt.hashSync(req.body.password, salt);

 user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
    });

    const data = {
        user: {
            id: user.id
        }

    };

    const JWT_SECRET = "twinklejimin";

    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log(authtoken);

    res.json({authtoken}); 
 }
    catch(error){
      console.log(error.message);
      res.status(500).send("Some error occured");
    }


    
});


router.post('/authenticate',[
    body('email','Enter proper email').isEmail(),
    body('password','Password cannot be null').exists()
]
 ,async(req, res) => {
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }



    try{
        let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).json({ errors: [{ msg: 'Login with correct credentials'}]});
        success=false;
    }

    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if(passwordCompare){
        const data = {
            user: {
                id: user.id
            }
    
        };

        const JWT_SECRET = "twinklejimin";
    
        const authtoken = await jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        res.json({success,authtoken});
    }
    else{
        return res.status(400).json({ errors: [{ msg: 'Wrong Password'}]});
        success=false;
    }
    }
    catch(error){
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
    
});


router.post('/getuser',fetchuser, 
async (req, res) => {
    try{
        let userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user)
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some error occured");
      }
}
);







module.exports = router;