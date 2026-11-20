$(document).ready(function () {
  console.log("Этап 2: Работа с DOM");

  // Поиск элементов
  var $items = $(".item");
  var $firstItem = $(".item:first");
  var $lastItem = $(".item:last");

  console.log("Количество элементов:", $items.length);
  console.log("Первый элемент:", $firstItem.text());
  console.log("Последний элемент:", $lastItem.text());

  // Изменение содержимого
  $("#nav-menu li:first a").text("Домой");

  // Создание элемента
  var $newItem = $("<div>", {
    class: "item",
    "data-id": "4",
    text: "Элемент 4",
  });

  $("#content").append($newItem);

  // Удаление последнего элемента
  $(".item:last").remove();

  // Чтение атрибутов
  $(".item").each(function () {
    console.log("ID элемента:", $(this).data("id"));
  });

  // Добавление элемента через форму
  $("#addForm").on("submit", function (e) {
    e.preventDefault();

    var text = $("#itemText").val().trim();

    if (text) {
      var $item = $("<div>", {
        class: "item",
        text: text,
      });

      $item.highlight("#eee8f7");

      $("#content").append($item);
      $("#itemText").val("");
    }
  });

  // Удаление элемента по клику
  $("#content").on("click", ".item", function () {
    $(this).fadeOut(300, function () {
      $(this).remove();
    });
  });

  console.log("Работа с DOM завершена");
});
