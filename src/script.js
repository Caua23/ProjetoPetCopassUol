document.addEventListener("DOMContentLoaded", function () {
  const categoryItems = document.querySelectorAll(".categories li");

  const menuIcon = document.getElementById("menuH");
  const navMenu = document.getElementById("navMenu");

  menuIcon.addEventListener("click", function () {
    navMenu.classList.toggle("active"); 
  });

  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      categoryItems.forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");
      const token = this.getAttribute("token");
      loadProducts(token === "Random" ? null : token);
    });
  });

  loadProducts();
  loadProfile();
});

function createProfileCard(worker) {
  const card2 = document.createElement("div");
  card2.classList.add("card2");

  card2.innerHTML = `
    <img src="img/${worker.picture}" id="picture" alt="" />
    <p class="name">${worker.name}</p>
    <p class="position">${worker.position}</p>
    <div class="icons">
        <img src="img/X.png" width="24px" height="24px" alt="" />
        <img src="img/linkedin.png" width="24px" height="24px" alt="" />
        <img src="img/bola.png" width="24px" height="24px" alt="" />
    </div>
  `;
  return card2;
}

const profileContainer = document.getElementById("profile");

function loadProfile() {
  fetch("src/worker.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar os perfis.");
      }
      return response.json();
    })
    .then((workers) => {
      profileContainer.innerHTML = "";
      workers.forEach((worker) => {
        const card = createProfileCard(worker);
        profileContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os perfis:", error);
    });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img id="cardImg" src="${product.image}" alt="">
    <div class="CardHead">
      <p>${product.price}</p>
      <img src="img/heart.png" width="30px" height="30px" alt="">
    </div>
    <div class="CardInfo">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
    </div>
    <div class="CardButton">
      <div class="counter">
        <button class="plus">+</button>
        <p class="counterValue">1</p>
        <button class="less">-</button>
      </div>
      <button type="button" class="addToCart">Add to Cart</button>
    </div>
  `;

  const plusBtn = card.querySelector(".plus");
  const lessBtn = card.querySelector(".less");
  const counterValue = card.querySelector(".counterValue");

  plusBtn.addEventListener("click", () => {
    counterValue.innerHTML = parseInt(counterValue.innerHTML) + 1;
  });

  lessBtn.addEventListener("click", () => {
    if (parseInt(counterValue.innerHTML) > 1) {
      counterValue.innerHTML = parseInt(counterValue.innerHTML) - 1;
    } else {
      console.error("Contador não pode ser menor que 1");
    }
  });

  return card;
}

const container = document.getElementById("products");
let allProducts = [];

function loadProducts(categoryToken = null) {
  fetch("src/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar os produtos.");
      }
      return response.json();
    })
    .then((products) => {
      allProducts = products;
      container.innerHTML = "";
      const filteredProducts = categoryToken
        ? products.filter((product) => product.token === categoryToken)
        : products;

      filteredProducts.forEach((product) => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os produtos:", error);
    });
}
function sendEmail(event) {
  event.preventDefault();
  const email = document.getElementById("email2").value;
  const res = document.getElementById("res2");
  const erro = document.getElementById("erro2");
  if (email) {
    erro.innerHTML = "";
    return (res.innerHTML = "Email Salvo com sucesso!");
  }
  if (!email) {
    res.innerHTML = "";
    return (erro.innerHTML = "Preencha o campo email");
  }
}

function sendForm(event) {
  event.preventDefault();

  
  const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    message: document.getElementById("msg"),
    check: document.getElementById("check"),
  };

  const errors = {
    firstName: document.getElementById("erroFirstName"),
    lastName: document.getElementById("erroLastName"),
    email: document.getElementById("erroEmail"),
    message: document.getElementById("erroMsg"),
    check: document.getElementById("erroCheck"),
  };

  const res = document.getElementById("res");

  
  function validateField(field, errorElement, errorMessage) {
    if (!field || !errorElement) return false; 
    if (!field.value.trim()) {
      errorElement.innerHTML = errorMessage;
      return false;
    } else {
      errorElement.innerHTML = "";
      return true;
    }
  }

  
  const isValid = {
    firstName: validateField(fields.firstName, errors.firstName, "First Name is required"),
    lastName: validateField(fields.lastName, errors.lastName, "Last Name is required"),
    email: validateField(fields.email, errors.email, "Email is required"),
    message: validateField(fields.message, errors.message, "Message is required"),
    check: fields.check.checked 
  };

  
  if (!fields.check.checked) {
    errors.check.innerHTML = "Accept the terms and conditions";
    isValid.check = false;
  } else {
    errors.check.innerHTML = "";
  }

  
  if (!Object.values(isValid).every(Boolean)) {
    res.innerHTML = "";
    return;
  }

  
  res.innerHTML = "Form successfully submitted!";
}

