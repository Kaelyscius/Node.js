$(document).ready(function () {
    $('#post-comment').hide();
    $('#btn-comment').on('click', function(event){
        event.preventDefault();
        $('#post-comment').toggleClass('slide-down');
        if ($('#post-comment').hasClass('slide-down')) {
            $('#post-comment').slideDown();
        } else {
            $('#post-comment').slideUp();
        }
    });

    $('#btn-like').on('click', function (event) {
        event.preventDefault();

        // Peut se faire aussi : var imgId = $(this).attr('data-id');

        // Je récupère l'identifiant de l'image associé a ce bouton like
        var imgId = $(this).data('id');
        $.post('/images/' + imgId + '/like').done(function (data) {
            //Mise a jour du compteur de like de l'image dans la page
            $('.likes-count').text(data.likes);
        })
    });

    $('#button-delete').on('click', function (event) {
        event.preventDefault();
        var elem = $(this);
        var remove = confirm('Are you sure you want to delete poor cute cats??');
        if(remove){
            var imgId = elem.data('id');

            //Nous envoyons une requete HTTP DELETE
            $.ajax({
                url:"/images/" + imgId,
                type : 'DELETE'
            }).done(function (result) {
               if(result){
                   elem.removeClass('btn-danger').addClass('btn-success');
                   elem.find('i').removeClass('fa-times').addClass('fa-check');
                   elem.append('<span> Deleted ! </span>');
               }
            });
        }
    });
});