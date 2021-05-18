const express = require('express');
const router = express.Router();

// Item Model
const postInfo = require('../../models/PostInfo');

// GET api/items
router.get('/', (req, res) => {
    postInfo.find()
        .sort({ date: -1 })
        .then(postinfos => res.json(postinfos))
});

// POST api/items
router.post('/', (req, res) => {

    const newPost = new postInfo({
        creator: req.body.creator,
        title: req.body.title,
        description: req.body.description,
        contact: req.body.contact,
        memberdesc: req.body.memberdesc,
        teamdesc: req.body.teamdesc,
        nummembers: req.body.nummembers,
        category: req.body.category,
        picurl: req.body.picurl,
    });
    newPost.save().then((savedItem) => {
        console.log('successfully saved in the database');
        res.json({success: true});
    });
});

// DELETE api/items/:id
router.get('/:id', (req, res) => {
    console.log("received request for " + req.params.id);
    postInfo.findById(req.params.id)
        .then(postinfo =>res.json(postinfo))
        .catch(err => {
            res.status(404).json({message: "ID not found"})
            console.log(err);
        });
});

// DELETE api/items/:id
router.delete('/:id', (req, res) => {
    postInfo.findById(req.params.id)
        .then(postinfo => postinfo.remove().then(() => res.json({success: true})))
        .catch(err => {
            res.status(404).json({message: "ID not found"})
            console.log(err);
        });
});

module.exports = router;
