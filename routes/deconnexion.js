var express = require('express')
var router = express.Router()

router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.get('/',function (req , res) {
    req.session.destroy()
    res.redirect("/");

})

module.exports = router ;