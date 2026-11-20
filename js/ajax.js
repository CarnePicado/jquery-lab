$(document).ready(function () {
  console.log("Этап 5: AJAX");

  // Загрузка публикаций через $.ajax()
  $("#loadPostsBtn").click(function () {
    var $container = $("#posts-container");

    $container.html("<p>Загрузка публикаций...</p>");

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts?_limit=5",
      method: "GET",
      dataType: "json",

      success: function (posts) {
        $container.empty();

        posts.forEach(function (post) {
          var $post = $("<article>", {
            class: "ajax-post",
          });

          $("<h3>").text(post.title).appendTo($post);
          $("<p>").text(post.body).appendTo($post);

          $container.append($post);
        });
      },

      error: function () {
        $container.html("<p>Не удалось загрузить публикации.</p>");
      },
    });
  });

  // Загрузка пользователей через $.get()
  $("#loadUsersBtn").click(function () {
    var $container = $("#users-container");

    $container.html("<p>Загрузка пользователей...</p>");

    $.get("https://jsonplaceholder.typicode.com/users", function (users) {
      $container.empty();

      users.forEach(function (user) {
        var $user = $("<article>", {
          class: "ajax-user",
        });

        $("<h3>").text(user.name).appendTo($user);
        $("<p>")
          .text("Email: " + user.email)
          .appendTo($user);
        $("<p>")
          .text("Город: " + user.address.city)
          .appendTo($user);

        $container.append($user);
      });
    });
  });
});
