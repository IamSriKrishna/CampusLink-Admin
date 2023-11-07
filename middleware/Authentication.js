const jwt = require("jsonwebtoken");
const User = require("../src/Model/Student");


const verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (token) {
        jwt.verify(token, "passwordKey", async (err, user) => {
            if (err) res.status(403).json("Invalid token");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are restricted from perfoming this operation");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You have limited access");
        }
    });
};


const verifyTokenAndAgent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAgent || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are restricted from perfoming this operation");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndAgent };
