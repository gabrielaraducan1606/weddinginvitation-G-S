const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    name: String,
    email: String,
    attending: Boolean
});

module.exports = mongoose.model("Invite", InviteSchema);
