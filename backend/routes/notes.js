const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');;
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//http://localhost:5000/api/notes/fetchnotes fetch all notes of a particular user
router.get('/fetchnotes', fetchuser,
async(req, res) => {
    try{
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    }
    catch{
        console.log(error.message);
      res.status(500).send("Some error occured");
    }
   
});


//http://localhost:5000/api/notes/addnote for adding a note to the dtabase for a perticular user

router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Enter a valid description').isLength({ min: 5 })
]
,async(req, res) => {
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }


    const notes=await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id
    });

    

    res.json(notes);
    }
    catch{
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
    
});

//http://localhost:5000/api/notes/updatenotes:id for updating a note to the database for a particular user

router.put('/updatenotes/:id', fetchuser,
async(req,res)=>{
    try{
    const notes= Notes({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        
    });

    const newNote = {};

    if(notes.title){
        newNote.title = notes.title;
    }
    if(notes.description){
        newNote.description = notes.description;
    }
    if(notes.tag){
        newNote.tag = notes.tag;
    }

    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Stop there you Hacker");
    }

    
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    }
    catch{
        console.log(error.message);
        res.status(500).send("Some error occured");
    }


}

);

//http://localhost:5000/api/notes/deletenotes:id for deleting a note to the database for a particular user

router.delete('/deletenotes/:id', fetchuser,
async(req,res)=>{
    try{
        const notes= Notes({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            
        });
    
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Stop there you Hacker");
        }
    
        
            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({"Success":"Note has been deleted", note: note});
    }
    catch{
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
   
}

)

module.exports = router;