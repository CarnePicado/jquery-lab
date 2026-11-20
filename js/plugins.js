$(document).ready(function () {
  console.log("Этап 6: Собственные jQuery-плагины");

  // Подсветка элементов
  $("#highlightBtn").click(function () {
    $(".plugin-item").highlight("#e8d5ff");
  });

  // Увеличение текста
  $("#makeBigBtn").click(function () {
    $(".plugin-text").makeBig();
  });
});
