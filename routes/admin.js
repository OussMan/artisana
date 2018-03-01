/**
 * Created by ouss on 28/08/2016.
 */

var express = require("express");
var router = express.Router();
var db = require('../db/db.js');




router.get("/:p",function (req ,res) {
    if(req.session.resultat == null){
        resultat = null;
    }else{
        resultat=req.session.resultat;
    }
 var lm =6;
    var page = parseInt(req.params.p);
    db.UsersModel.find({active : 1}).skip((page-1)*lm).limit(lm).exec(function (err,users) {
        if(err) res.send(err);
        else{
            db.UsersModel.find({active : 1}).count().exec(function(err,cnt) {
                res.render('admin',{
                    title : 'admin',
                    erorprofil : null,
                    resultat : resultat,
                    users : users,
                    page : Math.ceil(cnt/lm),
                    active : 1 ,
                    Mr : null,
                    id_Mr :null,
                    role_Mr : null ,
                    path : '../'
                });
            });
        }
        
    })
   
});

/*
router.post("/activer/activer",function (req , res) {
    var ids = req.body.ids ;
    var tab_id = ids.split('/');
    var resultat = [] ;
    for (var i=0;i<tab_id.length;i++){
        db.UsersModel.findOne({_id:tab_id[i]},function (err ,users) {
            if(err){
                res.render('error');
            }else{
                 users.active = 0;
                 users.save(function (err, updateusers) {
                   if(err){
                       resultat.push({'id':tab_id[i],'error':err});
                   }else{
                       resultat.push({'id':tab_id[i],'error':0})
                   }
                     if(i==tab_id.length-1){
                         res.send('resultat');
                     }

                });

            }

        });

    }

});

*/
router.post("/update",function (req , res) {
    var ids = req.body.ids ;
    console.log('id'+ids)
    var tab_id = ids.split('/');
    console.log('solit'+tab_id)
    var resultat=[] ;
    var cnt =0;
    console.log('lenght'+tab_id.length)
    for (var i=0;i<tab_id.length-1;i++) {
        db.UsersModel.findOne({_id: tab_id[i]}, function (err, users) {
            if (err) {
                resultat.push({'id':tab_id[cnt],'error':err});
            } else {
                users.active = 1;
                users.save(function (err, updateusers) {
                    if(err){
                        console.log('err'+tab_id[i])
                        resultat.push({"id":tab_id[cnt],"error":err});
                    }else{
                        cn=cnt;
                        console.log('hhhhh1'+ cnt )
                        resultat.push({"id":tab_id[cn],"error":0});
                        cnt=cnt+1;console.log('oooooo'+resultat[cn].id)
                    }
                    if(cnt === tab_id.length-1){
                        res.send(resultat)
                        console.log(resultat)
                    }
                });
            }
        });
    }
    console.log('cnt '+cnt)
});



router.post("/todesactive",function (req , res) {
    var ids = req.body.ids ;
    console.log('id'+ids)
    var tab_id = ids.split('/');
    console.log('solit'+tab_id)
    var resultat=[] ;
    var cnt =0;
    console.log('lenght'+tab_id.length)
    for (var i=0;i<tab_id.length-1;i++) {
        db.UsersModel.findOne({_id: tab_id[i]}, function (err, users) {
            if (err) {
                resultat.push({'id':tab_id[cnt],'error':err});
            } else {
                users.active = 0;
                users.save(function (err, updateusers) {
                    if(err){
                        console.log('errrrr'+tab_id[i])
                        resultat.push({"id":tab_id[cnt],"error":err});
                    }else{
                        cn=cnt;
                        console.log('hhhheeeeeeeh1'+ cnt )
                        resultat.push({"id":tab_id[cn],"error":0});
                        cnt=cnt+1;console.log('oooooo'+resultat[cn].id)
                    }
                    if(cnt === tab_id.length-1){
                        res.send(resultat)
                        console.log(resultat)
                    }
                });
            }
        });
    }
    console.log('cnt '+cnt)
});

router.get("/desactiver/:p",function (req ,res) {
    var lm =6;
    var page = parseInt(req.params.p);
    db.UsersModel.find({active : 0}).skip((page-1)*lm).limit(lm).exec(function (err,users) {
        if(err) res.send(err);
        else{
            db.UsersModel.find({active : 0}).count().exec(function(err,cnt) {
                res.render('admin',{
                    title : 'admin',
                    erorprofil : null,
                    users : users,
                    page : Math.ceil(cnt/lm),
                    active : 0,
                    Mr : null,
                    id_Mr :null,
                    role_Mr : null ,
                    path : '../../'
                });
            });
        }
    })
});



router.post("/delete/supp/supp",function (req , res) {
    var ids = req.body.ids ;
    console.log('id'+ids)
    var tab_id = ids.split('/');
    console.log('solit'+tab_id)
    var result=[] ;
    var cnt =0;
    console.log('lenght'+tab_id.length)
    for (var i=0;i<tab_id.length-1;i++) {
        db.UsersModel.find({_id:tab_id[i]}).remove().exec(function(err) {
            cnt++;
            if(err) result.push({"id":tab_id[cnt-1],"error":err});
            else result.push({"id":tab_id[cnt-1],"error":0})
            if (cnt == tab_id.length-1)
                res.send(result);
        });
    }
    console.log('cnt '+cnt)
});




module.exports = router ;