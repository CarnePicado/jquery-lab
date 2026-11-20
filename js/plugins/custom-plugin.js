(function ($) {
  $.fn.highlight = function (color) {
    return this.each(function () {
      $(this).css({
        background: color || "#eee8f7",
        transition: "background 0.3s",
      });
    });
  };

  $.fn.makeBig = function () {
    return this.each(function () {
      $(this).css({
        fontSize: "22px",
        fontWeight: "bold",
      });
    });
  };
})(jQuery);
