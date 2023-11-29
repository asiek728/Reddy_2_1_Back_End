const bcrypt = require('bcrypt');

const User = require('../models/user');
const Token = require('../models/token');

async function index (req, res) {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.getOneById(id);
        res.json(user);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function register (req, res) {
    try {
        const data = req.body;

        // Generate a salt with a specific cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Hash the password
        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await User.create(data);

        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function login (req, res) {
    const data = req.body;
    try {
        const user = await User.getOneByUsername(data.username);
        console.log("User", user)
        const authenticated = await bcrypt.compare(data.password, user["password"]);
        console.log("Authentificated", authenticated)
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(user.id);
            res.status(200).json({ authenticated: true, token: token.token, isAdmin: user.isAdmin, user_id: user.id }); //Added isAdmin field to login API response, in order to store this flag on front-end side & show/hide certain buttons etc. based on it
        }
        
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const user= await User.getOneById(id);
        const result = await user.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function update(req,res) {
    try {
        const param=req.params.id.split('-')
        const id = parseInt(param[1])
        console.log("param= ",param[0])
        
        const data = req.body
        const userToUpdate = await User.getOneById(id)
        let  updatedUser;
        if (param[0]=="username") {
            updatedUser= await userToUpdate.updateUsername(data)
        }
        else if (param[0]=="email") {
             updatedUser = await userToUpdate.updateEmail(data)
        }
        res.status(200).send(updatedUser)
        
    } catch (err) {
        res.status(404).json({"error": err.message})
        
    }
}

module.exports = {
    register, login, index, destroy, show, update
}                           
