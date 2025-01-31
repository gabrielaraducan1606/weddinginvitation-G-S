const express = require("express");
const Invite = require("../models/invite");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newInvite = new Invite(req.body);
        await newInvite.save();
        res.status(201).send(newInvite);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/", async (req, res) => {
    const invites = await Invite.find();
    res.send(invites);
});

module.exports = router;
