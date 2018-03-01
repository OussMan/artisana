/**
 * Created by ouss on 04/09/2016.
 */
$(function () {
        var id = "";
        $('.supart').click(function () {

                id= $(this).parent().parent().parent().find('.supartid').val();

            alert(id)

            $.get('/compte/supprimerleproduits/'+id ,id,function (retour) {
               window.location.href='/compte/lesproduits/1';
                //alert(retour)
            });

        });


});