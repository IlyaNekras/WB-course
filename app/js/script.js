$(document).ready(function () {

  //отправка формы

  $('.form-data').on('submit', function (event) {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
      submit = $('.submit', form),
      data = new FormData(),
      files = $('input[type=file]');


    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled', '');

    data.append('name', $('[name="name"]', form).val());
    data.append('phone', $('[name="phone"]', form).val());
    data.append('tarif', $('[name="tarif"]', form).val());


    files.each(function (key, file) {
      let cont = file.files;
      if (cont) {
        $.each(cont, function (key, value) {
          data.append(key, value);
        });
      }
    });

    $.ajax({
      url: 'mailer/ajax.php',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      xhr: function () {
        let myXhr = $.ajaxSettings.xhr();

        if (myXhr.upload) {
          myXhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
              let percentage = (e.loaded / e.total) * 100;
              percentage = percentage.toFixed(0);
              $('.submit', form)
                .html(percentage + '%');
            }
          }, false);
        }

        return myXhr;
      },
      complete: function () {
        $('.modal__form').fadeOut();
        $('#thanks').fadeIn();
        $('input, textarea', form).removeAttr('disabled', '');
        form.reset();
      }
    });
    return false;
  });


  //ответы на вопросы в FAQ
  $('.info__box').on('click', function () {
    $(this).toggleClass('info__box--active');
  });

  //появление форм
  $('.rates__btn').on('click', function () {
    $('.modal, .modal__form').fadeIn();
    $('body').css({
      'overflow': 'hidden',
      'padding-right': '18px'
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      $('body').css({
        'padding-right': '0px'
      });
    }
  });

  //исчезание при нажатии вне формы
  $('.modal, .modal__exit').on('click', function () {
    $('.modal, #thanks, .modal__form').hide();
    $('body').css({
      'overflow': 'auto',
      'padding-right': '0'
    });
    form.reset();
  });
});