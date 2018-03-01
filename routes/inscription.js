/**
 * Created by ouss on 27/08/2016.
 */
var express = require('express');
var db = require('../db/db');
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended : false}));

router.get('/',function (req , res) {
   if( req.session.errors != null){
        err = req.session.errors ;
        req.session.errors =null;
    }else{
        err = null;
    }
    if( req.session.success_ajo){
        success = req.session.success_ajo ;
        req.session.success_ajo =null;
    }else{
        success = null;
    }
    if( req.session.error_ajo){
        error_ajo = req.session.error_ajo ;
        req.session.error_ajo =null;
    }else{
        error_ajo = null;
    }
    
    
    
    res.render('inscription', { 
        title : 'inscription',
        error : err ,
        success :success,
        error_ajo : error_ajo,
        erorprofil : null,
        Mr : null,
        id_Mr :null,
        role_Mr : null ,
        path : '../'
        
    });
});

router.post('/',function (req , res) {
    var name = req.body.name ;
    var ville = req.body.ville;
    var tel = req.body.tel;
    var adress =req.body.adress;
    var email = req.body.email;
    var pass = req.body.pass;
    var repass = req.body.repass ;

    if(pass === repass){
        var user = new db.UsersModel({
            email : email,
            password :  pass,
            name : name,
            ville : ville,
            telephone : tel,
            adress : adress
        });
        user.save(function (err,inserted_user) {
            if(err) {
                req.session.error_ajo ='eroor '+err;
                res.redirect('/inscription');
            }
            else{
                req.session.success_ajo ='ajouter avec success Email : '+inserted_user.email+' Password : '+inserted_user.password;
                res.redirect('/');
            }

        })

    }else{
        req.session.errors ='votre password n`est pas identique';
        res.redirect('/inscription');
    }

});

module.exports = router;