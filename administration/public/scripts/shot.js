$(document).ready(function () {

  var WinnerBox = function () {

    this.setErrorBox = function (errorBox) {
      this.errorBox = errorBox;
    };

    this.show = function () {
      $('.winner-form').show();
      $('.winner').prop('disabled', false);
      this.errorBox.hide();
    };

    this.hide = function () {
      $('.winner-form').hide();
      $('.winner').prop('disabled', true);
      $('input[name="is_winner"]').prop('checked', false);
    };
  };

  var ErrorBox = function () {


    this.setWinnerBox = function (winnerBox) {
      this.winnerBox = winnerBox;
    };

    this.show = function () {
      $('.error-form').show();
      $('.error').prop('disabled', false);
      this.winnerBox.hide();
    };

    this.hide = function () {
      $('.error-form').hide();
      $('.error').prop('disabled', true);
      $('input[name="is_error"]').prop('checked', false);
    };
  };

  var winnerBox = new WinnerBox();
  var errorBox = new ErrorBox();
  winnerBox.setErrorBox(errorBox);
  errorBox.setWinnerBox(winnerBox);

  winnerBox.hide();
  errorBox.hide();

  $('input[name="is_error"]').change(function () {

    if ($(this).prop('checked')) {
      errorBox.show();

    } else {
      errorBox.hide();
    }
  });

  $('input[name="is_winner"]').change(function () {
      if ($(this).prop('checked')) {
        winnerBox.show();

      } else {
        winnerBox.hide();
      }
  });

});