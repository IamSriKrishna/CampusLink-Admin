const express = require("express");
const {updateCredit, resetCredit} = require("../../Handler/Credits/CreditHandler");

// INIT
const CreditRouter = express.Router();

//Update Credit
CreditRouter.put(
    "/students/:id/update-credit",
    async function (req, res) {
        await updateCredit(req,res);
    }
);

// //Reset Credit
// CreditRouter.put("/students/:id/update-credit-zero", async function(req,res) {
//     await resetCredit(req,res);
// });
  
module.exports = CreditRouter;