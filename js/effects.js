$(document).ready(function () {
  console.log("Этап 4: Анимации и эффекты");

  // Плавное появление
  $("#fadeInBtn").click(function () {
    $("#effectsBox").stop(true, true).fadeIn(500);
  });

  // Плавное исчезновение
  $("#fadeOutBtn").click(function () {
    $("#effectsBox").stop(true, true).fadeOut(500);
  });

  // Скользящее появление и скрытие
  $("#slideToggleBtn").click(function () {
    $("#effectsBox").stop(true, true).slideToggle(500);
  });

  // Пользовательская анимация
  $("#animateBtn").click(function () {
    $("#animationBox")
      .stop(true, true)
      .css({
        left: 0,
        width: "100px",
        height: "100px",
      })
      .animate(
        {
          left: "200px",
          width: "150px",
          height: "150px",
        },
        700,
      )
      .animate(
        {
          left: 0,
          width: "100px",
          height: "100px",
        },
        700,
      );
  });

  // Последовательная анимация
  $("#queueBtn").click(function () {
    $("#queueBox")
      .stop(true, true)
      .css({
        left: 0,
        top: 0,
      })
      .animate({ left: "200px" }, 500)
      .animate({ top: "50px" }, 500)
      .animate({ left: 0 }, 500)
      .animate({ top: 0 }, 500);
  });
});
