const Message = require("../models/message.model");

module.exports.addMessage = async (req, res, next) => {
    try {

        const { from, to, message="", image="" } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
            image
        });

        if (data) return res.json({ msg: "Message added successfully"})
        return res.json({ msg: "Failed to add message to the database" });

    } catch (error) {
        next(error);
    }
};

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({ users: { $all: [from, to] } })
                                      .sort({ updatedAt: 1 });

        const usersMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message?.text,
                image: msg.image || ""
            };
        });

        res.json(usersMessages);
                                      
    } catch (error) {
        next(error);
    }
};