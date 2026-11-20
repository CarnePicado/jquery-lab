$(document).ready(function () {
  console.log("jQuery загружен! Версия: " + $.fn.jquery);
  console.log("jQuery UI загружен!");

  // Этап 2. Работа с DOM

  var $items = $(".item");
  var $firstItem = $(".item:first");
  var $lastItem = $(".item:last");
  var $navLinks = $("#nav-menu a");

  console.log("Все элементы:", $items.length);
  console.log("Первый элемент:", $firstItem.text());
  console.log("Последний элемент:", $lastItem.text());
  console.log("Ссылки меню:", $navLinks.length);

  $("#nav-menu li:first a").text("Домой");

  if ($.fn.highlight) {
    $(".item:even").highlight("#eee8f7");
  }

  var $newItem = $("<div>", {
    class: "item",
    "data-id": "4",
    text: "Элемент 4",
  });

  $("#content").append($newItem);

  $(".item:last").remove();

  $(".item").each(function () {
    console.log("ID элемента: " + $(this).data("id"));
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

      if ($.fn.highlight) {
        $item.highlight("#eee8f7");
      }

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

  // Этап 3. Обработка событий

  $("#showBtn").click(function () {
    $("#demoBox").stop(true, true).fadeIn(300);
  });

  $("#hideBtn").click(function () {
    $("#demoBox").stop(true, true).fadeOut(300);
  });

  $("#toggleBtn").click(function () {
    $("#demoBox").stop(true, true).fadeToggle(300);
  });

  $("#demoBox").dblclick(function () {
    $(this).css("background", "#e53935");
  });

  // Наведение мыши

  $("#content").on("mouseenter", ".item", function () {
    $(this).css("background", "#fff0b3");
  });

  $("#content").on("mouseleave", ".item", function () {
    $(this).css("background", "#eee8f7");
  });

  // Изменение поля ввода

  $('input[name="name"]').on("input", function () {
    var value = $(this).val();

    if (value.length > 0) {
      $(this).css("border-color", "green");
    } else {
      $(this).css("border-color", "red");
    }
  });

  // Отправка формы

  $("#myForm").submit(function (e) {
    e.preventDefault();

    alert("Форма отправлена!");
    $(this).find("input").val("");
  });

  // Обработка Escape

  $(document).keydown(function (e) {
    if (e.key === "Escape") {
      $("#demoBox").stop(true, true).fadeOut(300);
    }
  });

  // Делегирование событий

  $(document).on("click", ".dynamic-item", function () {
    console.log("Динамический элемент кликнут");
    $(this).css("background", "#e8d5ff");
  });

  // Создание динамических элементов

  $("#addDynamicBtn").click(function () {
    var $item = $("<div>", {
      class: "dynamic-item",
      text: "Новый динамический элемент " + Date.now(),
    });

    $("#dynamic-container").append($item);
  });

  // Этап 4. Анимация и эффекты

  $("#fadeInBtn").click(function () {
    $("#effectsBox").stop(true, true).fadeIn(500);
  });

  $("#fadeOutBtn").click(function () {
    $("#effectsBox").stop(true, true).fadeOut(500);
  });

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
          left: "0px",
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
      .animate({ left: "0px" }, 500)
      .animate({ top: "0px" }, 500);
  });

  // Этап 5. AJAX

  // Загрузка публикаций

  $("#loadPostsBtn").click(function () {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts?_limit=5",
      method: "GET",
      dataType: "json",

      success: function (posts) {
        $("#posts-container").empty();

        posts.forEach(function (post) {
          var $post = $("<div>", {
            class: "ajax-post",
          });

          $("<h3>").text(post.title).appendTo($post);
          $("<p>").text(post.body).appendTo($post);

          $("#posts-container").append($post);
        });

        // Применяем плагин после загрузки публикаций
        if ($.fn.makeBig) {
          $(".ajax-post").makeBig();
        }
      },

      error: function () {
        $("#posts-container").text("Ошибка загрузки публикаций");
      },
    });
  });

  // Загрузка пользователей

  $("#loadUsersBtn").click(function () {
    $.get("https://jsonplaceholder.typicode.com/users", function (users) {
      $("#users-container").empty();

      users.forEach(function (user) {
        var $user = $("<div>", {
          class: "ajax-user",
        });

        $("<h3>").text(user.name).appendTo($user);
        $("<p>").text(user.email).appendTo($user);

        $("#users-container").append($user);
      });
    });
  });

  // Этап 6. Собственные jQuery-плагины

  if ($.fn.highlight) {
    $(".item").highlight("#e8d5ff");
  } else {
    console.error("Плагин highlight не подключён");
  }

  if (!$.fn.makeBig) {
    console.error("Плагин makeBig не подключён");
  }
});
