$(document).ready(function () {
  console.log("Этап 3: Обработка событий");

  // Показать элемент
  $("#showBtn").click(function () {
    $("#demoBox").stop(true, true).fadeIn(400);
  });

  // Скрыть элемент
  $("#hideBtn").click(function () {
    $("#demoBox").stop(true, true).fadeOut(400);
  });

  // Переключить видимость
  $("#toggleBtn").click(function () {
    $("#demoBox").stop(true, true).fadeToggle(400);
  });

  // Изменение цвета при двойном клике
  var colors = ["#e53935", "#43a047", "#1e88e5", "#8e24aa"];
  var colorIndex = 0;

  $("#demoBox").dblclick(function () {
    colorIndex = (colorIndex + 1) % colors.length;
    $(this).css("background-color", colors[colorIndex]);
  });

  // Скрытие элемента клавишей Escape
  $(document).keydown(function (e) {
    if (e.key === "Escape") {
      $("#demoBox").stop(true, true).fadeOut(400);
    }
  });

  // Добавление динамических элементов
  var itemNumber = 0;

  $("#addDynamicBtn").click(function () {
    itemNumber++;

    var $item = $("<div>", {
      class: "dynamic-item",
      text: "Динамический элемент " + itemNumber,
    });

    $("#dynamic-container").append($item);
  });

  // Обработка клика по динамическим элементам
  $("#dynamic-container").on("click", ".dynamic-item", function () {
    $(this).css("background-color", "#e8d5ff");
  });

  // Изменение рамки поля ввода
  $("#nameInput").on("input", function () {
    if ($(this).val().length > 0) {
      $(this).css("border-color", "green");
    } else {
      $(this).css("border-color", "");
    }
  });
});
