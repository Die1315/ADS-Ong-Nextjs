const Message = require("../models/message.model");
const Ong = require("../models/ong.model");

module.exports.addMessage = async (req, res, next) => {
  try {
    // const { to, message="", image="" } = req.body;
    const { from, to, message = "", image = "" } = req.body;
    // const currentOng = req.ong;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      image,
    });

    await Ong.findById(from).then((ong) => {
      ong.messages.push(data._id);
      ong.save();
    });

    await Ong.findById(to).then((ong) => {
      ong.messages.push(data._id);
      ong.save();
    });

    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    // const { to } = req.body;
    const { from, to } = req.body;
    // const currentOng = req.ong;
    const messages = await Message.find({ users: { $all: [from, to] } }).sort({
      updatedAt: 1,
    });

    const usersMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message?.text,
        image: msg.image || "",
      };
    });

    res.json(usersMessages);
  } catch (error) {
    next(error);
  }
};

module.exports.getFollowedUsers = async (req, res, next) => {
  const currentUser = req.ong;
  await Ong.find({
    _id: { $in: currentUser.following.concat(currentUser.followers) },
  })
    .populate("messages", "createdAt")
    // .select(["id", "name", "image", "email"])
    .then((followings) => {
      res.status(200).json(followings);
    })
    .catch(next);
};
module.exports.setAsRead = async (req, res, next) => {
  const { from, to } = req.body;
  // const currentOng = req.ong;
  Message.findOneAndUpdate(
    { users: { $all: [from, to] } },
    { unRead: false },
    { new: true }
  ).then((msgs) => {
    res.status(200), json(msgs);
  });
};
module.exports.areThereUnRead = async (req, res, next) => {
  const { from, to } = req.body;
  Message.find({ users: { $all: [from, to] }, unRead: true }).then((msgs) => {
    res.status(200).json(msgs);
  });
};
