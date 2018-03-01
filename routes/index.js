var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.error_profil){
        erorprofil=req.session.error_profil;
        req.session.error_profil=null;
        rusers = null;
        Mr = null;
        id_Mr = null;
    }else{
        erorprofil=null;
        rusers = req.session.id_users;
        Mr = req.session.name_users;
        id_Mr = req.session.id_users;
    }

  res.render('index', {
      title: 'index',
      erorprofil : erorprofil,
      Mr : Mr,
      id_Mr :id_Mr,
      rusers :rusers,
      role_Mr : null ,
      path : '../'

   });
});

router.post('/',function (req,res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa'+email)
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa'+password)
    db.UsersModel.findOne({
        email : email,
        password : password
    },function (err,users) {

        if (err){
            res.send(err);
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa'+users)
        }
        else {
            if(users){
                if (users._id !== null && users.email !== null && users.password !==null) {
                    req.session.id_users = users._id;
                    req.session.email = users.email;
                    req.session.name_users = users.name;
                    res.redirect('/compte');
                }else {
                    req.session.error_profil = "Invalid email or password!";
                    res.redirect("/");
                }
            }else{
                req.session.error_profil = "Invalid email or password!";
                res.redirect("/");
            }

        }


    })
    
});

module.exports = router;
