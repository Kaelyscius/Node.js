$(document).ready( function() {
   
     $('.cat-btn-delete').on('click', function(event) {
        event.preventDefault();
        var elem = $(this);
        var remove = confirm('are you sure you want to delete poor cute Category ?');
        if (remove) {
            var catId = elem.data('id');
            // nous envoyons une requette HTTP 'verb' DELETE
            $.ajax( {
                url: "/categories/" + catId,
                type: 'DELETE' 
            }).done(function(result) {
                if (result) {
                    elem.removeClass('btn-danger').addClass('btn-success');
                    elem.find('i').removeClass('fa-times').addClass('fa-check');
                    elem.append('<span> Deleted! </span>');
                    // window.location='/categories';
                }
            });
        }
    });
    
    $('.prod-btn-add').on('click', function(event) {
        event.preventDefault();
        var elem = $(this);
        var catId = elem.data('id');
        // nous envoyons une requette HTTP 'verb' DELETE
        $.ajax( {
            url: "/products/" + catId + "/addToCart",
            type: 'POST' 
        }).done(function(result) {
            if (result) {
                elem.removeClass('btn-login').addClass('btn-success');
                elem.find('i').removeClass('fa-plus').addClass('fa-check');
                elem.append('<span> added! </span>');
                // window.location='/categories';
            }
        });
    });
    
    $('.prod-btn-delete').on('click', function(event) {
        event.preventDefault();
        var elem = $(this);
        var remove = confirm('are you sure you want to delete fantastic Product ?');
        if (remove) {
            var catId = elem.data('id');
            // nous envoyons une requette HTTP 'verb' DELETE
            $.ajax( {
                url: "/products/" + catId,
                type: 'DELETE' 
            }).done(function(result) {
                if (result) {
                    elem.removeClass('btn-danger').addClass('btn-success');
                    elem.find('i').removeClass('fa-times').addClass('fa-check');
                    elem.append('<span> Deleted! </span>');
                    // window.location='/categories';
                }
            });
        }
    });
});