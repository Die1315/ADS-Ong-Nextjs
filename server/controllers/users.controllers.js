const User = require('../models/user.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');


module.exports.create = async (req, res, next) => {
    // console.log(req.body);
    await User.create({
        ...req.body,
        active: false
    })
        .then((user) => {
            res.json(user);
        })
        .catch(next);
};


module.exports.profile = (req, res, next) => {
    res.json(req.user);
};

module.exports.validate = (req, res, next) => {

    User.findByIdAndUpdate(req.params.id, { active: true }, { new: true, runValidators: true, useFindAndModify: false })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                next(createError(404, "user not found"));
            }
        })
        .catch(next);
};


module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email, active: true })
        .then((user) => {
            if (user) {
                user.checkPassword(password)
                    .then(match => {
                        if (match) {
                            const token = jwt.sign(
                                { sub: user.id, exp: Date.now() / 1000 + 3600 },
                                "*key secret token*"
                            );

                            res.json({ token });
                        } else {
                            next(createError(401, 'Wrong credentials'));
                        }
                    });

            } else {
                next(createError(400, 'User not found'));
            }
        })
        .catch(next);
}