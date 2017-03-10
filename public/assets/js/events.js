var eventsHandler = function() {
    function init() {
        attachListener();
    }

    function attachListener() {
        $('#rsvp-form').on('submit', function(e) {
            $("#rsvp-form").attr("disabled", true);
            e.preventDefault();
            $('.submit-text').addClass('hidden');
            $('.submit-loader').removeClass('hidden');
            var url = window.location.href;
            console.log(url+ '/rsvp');

            $.ajax({
                type: "POST",
                cache: false,
                url: url+ 'rsvp',
                data: $(this).serialize(),
                success: function(data) {
                    $('.submit-loader').addClass('hidden');
                    $('.submit-success').removeClass('hidden');
                }
            });
        });
        $('.rsvp-radio input:radio').click(function() {
            if ($(this).val() === 'Yes') {
                $('.meal-pref').fadeIn('fast');
            } else if ($(this).val() === 'No') {
                $('.meal-pref').fadeOut('fast');
            }
        });
        $('.rsvp-button').click(function() {
            $('html,body').animate({
                scrollTop: $(".inner.medium").offset().top
            });
        })
    }

    return {
        init: init
    }
}();

$(document).ready(function() {
    eventsHandler.init();
});