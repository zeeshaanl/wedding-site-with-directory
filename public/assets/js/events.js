var eventsHandler = function () {
  function init() {
    attachListener();
  }
  
  function attachListener() {
    $('#rsvp-form').on('submit',function(e){
      $("#rsvp-form").attr("disabled", true);
      e.preventDefault();
      $('.submit-text').addClass('hidden');
      $('.submit-loader').removeClass('hidden');
      
      $.ajax({
          type     : "POST",
          cache    : false,
          url      : 'http://wedding-site-zeeshaanl699662.codeanyapp.com:8000/rsvp',
          data     : $(this).serialize(),
          success  : function(data) {
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
  }
  return {
    init: init
  }
}();

$(document).ready(function () {
    eventsHandler.init();
});