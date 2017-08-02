const eventsHandler = function () {
    const handler = {
        imageContainer: null
    };

    function init() {
        console.log('in init');
        initElements();
        attachListener();
        setImageRotationInterval();
    }

    function initElements() {
        handler.imageContainer = $('.parallax');
    }

    function attachListener() {
        $('#rsvp-form').on('submit', function (e) {
            $("#rsvp-form").attr("disabled", true);
            e.preventDefault();
            $('.submit-text').addClass('hidden');
            $('.submit-success').addClass('hidden');

            $('.submit-loader').removeClass('hidden');
            const url = window.location.href;
            console.log(url + '/rsvp');

            $.ajax({
                type: "POST",
                cache: false,
                url: url + 'rsvp',
                data: $(this).serialize(),
                success: function (data) {
                    $('.submit-loader').addClass('hidden');
                    $('.submit-success').removeClass('hidden');
                    console.log(data);
                }
            });
        });
        $('.rsvp-radio input:radio').click(function () {
            if ($(this).val() === 'Yes') {
                $('.meal-pref').fadeIn('fast');
            } else if ($(this).val() === 'No') {
                $('.meal-pref').fadeOut('fast', function () {
                    $(".meal-pref select option[name='default']").prop('selected', true);
                });
            }
        });
        $('.rsvp-button').click(function () {
            $('html,body').animate({
                scrollTop: $(".inner.medium").offset().top
            });
        })
    }

    function setImageRotationInterval() {
        setTimeout(addRemoveClass, 3000)
    }

    function addRemoveClass() {
        handler.imageContainer.hasClass('show-second') ? handler.imageContainer.removeClass('show-second') : handler.imageContainer.addClass('show-second');
        setImageRotationInterval()
    }

    return {
        init: init
    }
}();

$(document).ready(function () {
    eventsHandler.init();
});