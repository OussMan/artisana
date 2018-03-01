/**
 * Created by ouss on 28/08/2016.
 */
var express = require("express");
var db = require('../db/db.js');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended : false}));

router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.get('/',function (req , res){
   db.UsersModel.findOne({_id:req.session.id_users },function (err,user) {
        if(err){
            res.send(err);
        }else{
            res.render('compte',{
                title : 'compte',
                erorprofil : null,
                Mr : req.session.name_users,
                user :user,
                id_Mr :req.session.id_users,
                role_Mr : null ,
                path : '../'
        });
        }
    })

});

router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.get('/deposeproduit',function (req , res) {
            res.render('depose_produit',{
                title : 'depose_produit',
                erorprofil : null,
                Mr : req.session.name_users,
                id_Mr :req.session.id_users,
                role_Mr : null ,
                path : '../'
            });
});
router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.post('/deposeproduit',function (req , res) {

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var titre = fields.titre;
        var Details = fields.Details;
        var categorie = fields.categorie;
        var prix = fields.prix;
        var photo = files.photo.name;
        var oldpath = files.photo.path;
        var newpath = 'C:/Users/LENOVO/Desktop/Projets_Nodejs/artisana/public/image_upload/' + files.photo.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;

            var produit = new db.ProduitModele({
                titre : titre,
                description : Details ,
                prix : prix ,
                user : req.session.id_users,
                categorie :categorie,
                name : photo
            });
            produit.save(function (err, produit) {
                if(err){
                    res.send(err)
                }else{
                    res.redirect('/compte/lesproduits/1');
                }
            })
        });
    });




    //res.send('depose_produit');

    //console.log(titre)
});
router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.post('/lesproduits/1',function (req , res) {
   var id = req.body.idid;
    var titre =req.body.titre;
    var description =req.body.description ;
    var prix = req.body.prix;

   db.ProduitModele.findOne({_id : id},function (err,produit) {
       if(err) res.send(err)
       else{
           produit.titre = titre;
           produit.description = description;
           produit.prix = prix;
           produit.save(function (err , pr) {
               if(err) res.send(err)
               else {
                   res.redirect('/compte/lesproduits/1')
               }

           })

       }

   })


   // res.send('prix '+prix+' description '+description+' titre  '+titre);
})

router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.get('/lesproduits/:pg',function (req , res) {
    var page = parseInt(req.params.pg);
    var lm = 2;
    db.ProduitModele.find({user:req.session.id_users }).skip((page-1)*lm).limit(lm).exec(function (err,produit) {
        if(err) res.send(err)
        else{
            db.ProduitModele.find({user:req.session.id_users }).count().exec(function (err,cnt) {
                if(err) res.send(err)
                else{
                    console.log(produit)
                    res.render('les_produits',{
                        title : 'les_produits',
                        erorprofil : null,
                        Mr : req.session.name_users,
                        id_Mr :req.session.id_users,
                        role_Mr : null ,
                        page : Math.ceil(cnt/lm),
                        active : page,
                        path : '../../',
                        produit : produit
                    });
                }
            })

        }

    })

});
router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.get('/supprimerleproduits/:id',function (req , res) {
    var id = req.params.id;
    db.ProduitModele.findOne({_id : id}).remove().exec(function (err) {
        if(err) res.send(err)
        else{
            res.redirect('/compte/lesproduits/1')
        }
    })
});


router.use(function(req,res,next) {
    if (req.session.id_users !==null && req.session.name_users !== null && req.session.email) next();
    else res.redirect("/");
});
router.post('/modifierprofil',function (req ,res) {
    var name = req.body.name;
    var email= req.body.email;
    var tel = req.body.tel;
    var adress = req.body.adress;
    var ville = req.body.vile;
    var pass = req.body.pass;
    var repass = req.body.repass;

    if(repass===pass){
        db.UsersModel.findOne({_id:req.session.id_users },function (err,user) {
            if(err) {
                res.send(err)
            }else{
                user.name=name;
                user.email = email;
                user.telephone =tel;
                user.adress=adress;
                user.ville=ville;
                user.password = pass;
                user.save(function (err , user) {
                    if(err){
                        res.send(err);
                    }else{
                        res.redirect('/compte');
                    }
                })
            }
        })
    }
});



module.exports = router ;