/**
 * Created by ouss on 27/08/2016.
 */
var express = require('express');
var router = express.Router();
var db = require('../db/db.js')

/* GET home page. */
router.get('/:cat/:pg', function(req, res, next) {
    if(req.session.error_profil){
        req.session.error_profil=null;
        rusers = null;
        Mr = null;
        id_Mr = null;
    }else{
        rusers = req.session.id_users;
        Mr = req.session.name_users;
        id_Mr = req.session.id_users;
    }
    var lm = 3;
    var page = parseInt(req.params.pg);
    var cat = parseInt(req.params.cat)%6;
    if(cat == 0){
        cat = 6
    }
    var liste = [1,2,3,4,5,6]
    if(liste.includes(cat)){
       db.ProduitModele.find({categorie : cat}).populate('user').skip((page-1)*lm).limit(lm).exec(function (err , listproduit) {
           if(err) res.send(err)
           else{
               db.ProduitModele.find({categorie:cat}).populate('use').count().exec(function (err,cnt) {
                   if(err) res.send(err)
                   else{
                       res.render('produit', {
                           title: 'produit' ,
                           erorprofil : null,
                           Mr : Mr,
                           id_Mr :id_Mr,
                           cat : cat,
                           page : Math.ceil(cnt/lm),
                           active : page,
                           role_Mr : null ,
                           listproduit : listproduit,
                           path : '../../'
                       });
                   }

               })

           }
       })
    }else {
        res.redirect("/");
    }

});



module.exports = router;
