$("#about-us-link").click(function() {
  $([document.documentElement, document.body]).animate({
    scrollTop: ($("#about-us").offset().top - 150)
  }, 1500);
});

$("#what-is-scalp-link").click(function() {
  $([document.documentElement, document.body]).animate({
    scrollTop: ($("#what-is-scalp").offset().top - 150)
  }, 1500);
});

$("#pricing-link").click(function() {
  $([document.documentElement, document.body]).animate({
    scrollTop: ($("#pricing").offset().top - 150)
  }, 1500);
});

$("#go-to-top-arrow-icon").click(function() {
  $([document.documentElement, document.body]).animate({
    scrollTop: ($(".mi-header").offset().top - 150)
  }, 1500);
});

jQuery(document).ready(function ($) {
  setInterval(function () {
    moveRight();
  }, 5000);
  
  const slideCount = $('#slider ul li').length;
  const slideWidth = $('#slider ul li').width();
  const slideHeight = $('#slider ul li').height();
  const sliderUlWidth = slideCount * slideWidth;
  
  $('#slider').css({ width: slideWidth, height: slideHeight });
  
  $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
  
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('span.control_prev').click(function () {
      moveLeft();
    });

    $('span.control_next').click(function () {
      moveRight();
    });

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $('.upload-image').on('click', function(e) {
      e.preventDefault();
      $('#uploaded-image').trigger('click');
    });
    $('#uploaded-image').on('change', function(e){
      $('#upload-image-form').submit();
      e.preventDefault();
    });
    $('#upload-image-form').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        url: './image/store',
        method:"POST",
        data: new FormData(this),
        dataType:'JSON',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){
          if(response != 0){
              alert('We will contact you as soon as posible!');
          }else{
              alert('File not uploaded!');
          }
        }
      });
    });
});
