const currentPage = location.pathname;

const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

console.log(currentPage);

const formDelete = document.querySelector("#form-delete");

if (formDelete) {
  currentPage.includes(formDelete.addEventListener("submit", function (event) {
    const confirmation = confirm("Deseja deletar?");
    if (!confirmation) {
      event.preventDefault();
    }
  }));
}
