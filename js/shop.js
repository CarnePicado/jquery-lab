$(document).ready(function () {
  console.log("Этап 7: Интернет-магазин");

  var products = [];

  var cart = JSON.parse(localStorage.getItem("shopCart")) || [];

  function saveCart() {
    localStorage.setItem("shopCart", JSON.stringify(cart));
  }

  function renderCart() {
    var $container = $("#cart-container");

    $container.empty();

    var total = 0;
    var count = 0;

    if (cart.length === 0) {
      $container.html("<p>Корзина пока пуста.</p>");
    }

    cart.forEach(function (item) {
      total += item.price * item.quantity;
      count += item.quantity;

      var $item = $("<div>", {
        class: "cart-item",
      });

      $("<h3>").text(item.title).appendTo($item);

      $("<p>")
        .text(item.price.toFixed(2) + " $ × " + item.quantity)
        .appendTo($item);

      $("<button>", {
        class: "remove-from-cart",
        text: "Удалить",
      })
        .attr("data-id", item.id)
        .appendTo($item);

      $container.append($item);
    });

    $("#cartCount").text(count);
    $("#cartTotal").text(total.toFixed(2) + " $");
  }

  function addToCart(productId) {
    var product = products.find(function (item) {
      return item.id === productId;
    });

    var cartItem = cart.find(function (item) {
      return item.id === productId;
    });

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    saveCart();
    renderCart();
  }

  renderCart();

  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    dataType: "json",

    success: function (data) {
      products = data;

      renderProducts(products);
      loadCategories(products);
    },

    error: function () {
      $("#products-container").html("<p>Не удалось загрузить товары.</p>");
    },
  });

  // Отображение товаров
  function renderProducts(items) {
    var $container = $("#products-container");

    $container.empty();

    if (items.length === 0) {
      $container.html("<p>Товары не найдены.</p>");
      return;
    }

    items.forEach(function (product) {
      var $card = $("<article>", {
        class: "product-card",
      });

      $("<img>", {
        src: product.image,
        alt: product.title,
      }).appendTo($card);

      $("<h3>").text(product.title).appendTo($card);

      $("<p>", {
        class: "product-category",
        text: product.category,
      }).appendTo($card);

      $("<p>", {
        class: "product-price",
        text: product.price.toFixed(2) + " $",
      }).appendTo($card);

      $("<button>", {
        class: "add-to-cart",
        text: "Добавить в корзину",
      })
        .attr("data-id", product.id)
        .appendTo($card);

      $container.append($card);
    });
  }

  // Загрузка категорий
  function loadCategories(items) {
    var categories = [];

    items.forEach(function (product) {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });

    categories.forEach(function (category) {
      $("<option>", {
        value: category,
        text: category,
      }).appendTo("#categoryFilter");
    });
  }

  // Поиск, фильтрация и сортировка
  function filterProducts() {
    var searchText = $("#searchInput").val().toLowerCase();
    var selectedCategory = $("#categoryFilter").val();
    var sortOrder = $("#sortSelect").val();

    var filteredProducts = products.filter(function (product) {
      var matchesSearch = product.title.toLowerCase().includes(searchText);
      var matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortOrder === "asc") {
      filteredProducts.sort(function (a, b) {
        return a.price - b.price;
      });
    }

    if (sortOrder === "desc") {
      filteredProducts.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    renderProducts(filteredProducts);
  }

  $("#searchInput").on("input", filterProducts);
  $("#categoryFilter").on("change", filterProducts);
  $("#sortSelect").on("change", filterProducts);

  // Добавление товара в корзину
  $("#products-container").on("click", ".add-to-cart", function () {
    var productId = Number($(this).attr("data-id"));

    addToCart(productId);
  });

  // Удаление товара из корзины
  $("#cart-container").on("click", ".remove-from-cart", function () {
    var productId = Number($(this).attr("data-id"));

    cart = cart.filter(function (item) {
      return item.id !== productId;
    });

    saveCart();
    renderCart();
  });

  // Очистка корзины
  $("#clearCartBtn").click(function () {
    cart = [];

    saveCart();
    renderCart();
  });

  // Оформление заказа
  $("#orderForm").submit(function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Корзина пуста!");
      return;
    }

    var order = {
      customer: {
        name: $("#customerName").val(),
        email: $("#customerEmail").val(),
        address: $("#customerAddress").val(),
      },
      products: cart,
      total: cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0),
    };

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(order),

      success: function () {
        alert("Заказ успешно оформлен!");

        cart = [];
        saveCart();
        renderCart();

        $("#orderForm")[0].reset();
      },

      error: function () {
        alert("Не удалось оформить заказ.");
      },
    });
  });
});
