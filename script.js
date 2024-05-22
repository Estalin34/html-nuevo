document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartIcon = document.querySelector(".container-icon");
  const cartCount = document.querySelector("#contador-productos");
  const cartProductsContainer = document.querySelector(".container-cart-products");
  const totalPagar = document.querySelector(".total-pagar");
  const formularioCompra = document.querySelector("#formulario-compra");
  const mensajeExito = document.querySelector("#mensaje-exito");

  let cart = [];

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const product = cart.find(item => item.name === name);

      if (product) {
        product.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCart();
    });
  });

  cartIcon.addEventListener("click", () => {
    cartProductsContainer.classList.toggle("hidden-cart");
  });

  formularioCompra.addEventListener("submit", (event) => {
    event.preventDefault();
    if (cart.length > 0) {
      mensajeExito.style.display = "block";
      setTimeout(() => {
        mensajeExito.style.display = "none";
      }, 3000);
      cart = [];
      updateCart();
      formularioCompra.reset();
    } else {
      alert("No hay productos en el carrito.");
    }
  });

  function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPagar.textContent = `$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}`;
  }
});
