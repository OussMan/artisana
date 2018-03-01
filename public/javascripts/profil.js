/**
 * Created by ouss on 26/08/2016.
 */
$(function() {
    $("div .area").click(function(){
        $("div .tri").css("display","block");
        $("div .caré").css("display","block");
    });
    $("div .all").click(function(){
        $("div .tri").css("display","none");
        $("div .caré").css("display","none");
    });
  
/////////////////// produit
    $('a.clik').click(function () {
        //////// recuperation
        $src = $(this).find('.imgarticle').attr("src");
        $artisant=$(this).find('input[name=artisant]').val();
        $description=$(this).find('input[name=description]').val();
        $email=$(this).find('input[name=email]').val();
        $telephone=$(this).find('input[name=telephone]').val();
        $titre = $(this).find('span.titre').text();
        $prix = $(this).find('span.prix').text();
        $ville = $(this).find('span.ville').text();



        $('.popup').modal('show');


        ///////// affectation

       $('.popup').find('#aa').find('.imgarticle1').attr('src',$src);

       $('.popup').find('#aa').find('span.artisant').empty();
       $('.popup').find('#aa').find('span.artisant').append($artisant);



        $('.popup').find('#aa').find('span.email').empty();
        $('.popup').find('#aa').find('span.email').append($email);

        $('.popup').find('#aa').find('span.telephone').empty();
        $('.popup').find('#aa').find('span.telephone').append($telephone);

        $('.popup').find('#aa').find('span.titre').empty();
        $('.popup').find('#aa').find('span.titre').append($titre);

        $('.popup').find('#aa').find('span.ville').empty();
        $('.popup').find('#aa').find('span.ville').append($ville);

        $('.popup').find('#aa').find('span.prix').empty();
        $('.popup').find('#aa').find('span.prix').append($prix);

        $('.popup').find('#aa').find('span.description').empty();
        $('.popup').find('#aa').find('span.description').append($description);

        description
        //alert('ouss '+$sd)

    });
//////////////cat

    $('.id__cat').click(function () {
        $id__cat = $(this).find('span').text();
        window.location.href = "/produit/"+$id__cat+"/1";
    });

       
});