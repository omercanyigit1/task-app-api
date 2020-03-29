const express = require('express');
const router = new express.Router();
const User = require('./../models/user');
const auth = require('../middleware/auth');

//Auth Register
router.post('/users/register', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e)
    }
});

//Auth Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        //it clears the data such as password or tokens
        res.send({user: user.getPublicProfile(), token});
    } catch (e) {
        res.status(400).send(e)
    }
});

//Auth Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.send();

    } catch (e) {
        res.status(500).send(e)
    }
});

//User Profile
router.get('/user/profile', auth, async (req, res) => {
    res.send(req.user);
});

//Selected User Edit
router.patch('/user/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        //const user = await User.findById(req.params.id);

        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e)
    }
});

//Selected User Delete
router.delete('/user/profile', auth, async (req, res) => {
    try {

        /**const user = await User.findByIdAndDelete(req.user._id);

        if (!user) {
            return res.status(404).send()
        } **/

        await req.user.remove();
        res.send(req.user);

    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
