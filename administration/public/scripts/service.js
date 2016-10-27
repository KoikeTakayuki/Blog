$(document).ready(function () {

  var IsErrorCheckBox = function () {

    this.setIsWinnerCheckBox = function (isWinnerCheckBox) {
      this.isWinnerCheckBox = isWinnerCheckBox;
    };

    this.check = function () {
      $('form').append($('<input name="is_unforced_error" type="hidden" value="true">'));
      $('form').append($('<input name="error_type_id" type="hidden" value="3">'));
      this.isWinnerCheckBox.uncheck();
    };

    this.uncheck = function () {
      $('input[name="is_unforced_error"]').remove();
      $('input[name="error_type_id"]').remove();
      $('input[name="is_error"]').prop({ checked: false });
    };
  };

  var IsWinnerCheckBox = function () {

    this.setIsErrorCheckBox = function (isErrorCheckBox) {
      this.isErrorCheckBox = isErrorCheckBox;
    };

    this.check = function () {
      $('form').append($('<input name="winner_type_id" type="hidden" value="1">'));
      this.isErrorCheckBox.uncheck();
    };

    this.uncheck = function () {
      $('input[name="winner_type_id"]').remove();
      $('input[name="is_winner"]').prop({ checked: false });
    };
  };

  var isErrorCheckBox = new IsErrorCheckBox();
  var isWinnerCheckBox = new IsWinnerCheckBox();
  isErrorCheckBox.setIsWinnerCheckBox(isWinnerCheckBox);
  isWinnerCheckBox.setIsErrorCheckBox(isErrorCheckBox);

  $('input[name="is_error"]').change(function () {

    if ($(this).prop('checked')) {
      isErrorCheckBox.check();

    } else {
      isErrorCheckBox.uncheck();
    }
  });

  $('input[name="is_winner"]').change(function () {
      if ($(this).prop('checked')) {
        isWinnerCheckBox.check();

      } else {
        isWinnerCheckBox.uncheck();
      }
  });


});
