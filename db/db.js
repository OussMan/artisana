var mongoose = require('mongoose');

var CategorieSchema = new mongoose.Schema({
   numero : String ,
    nom : String
});
var ProduitSchema = new mongoose.Schema({
    titre : String,
    description : String ,
    prix : String ,
    user :{
        type : mongoose.Schema.ObjectId,
        ref : 'users'
    },
    categorie :String,
    name : String
});

var UsersSchema = new mongoose.Schema({
    name : String ,
    ville : String ,
    telephone : String ,
    adress : String ,
    email : String,
    password : String
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/artisana');

var CategorieModel = mongoose.model('categories',CategorieSchema);
var UsersModel = mongoose.model('users',UsersSchema);
var ProduitModele =  mongoose.model('produit',ProduitSchema);

module.exports.CategorieModel = CategorieModel;
module.exports.UsersModel = UsersModel;
module.exports.ProduitModele =  ProduitModele;