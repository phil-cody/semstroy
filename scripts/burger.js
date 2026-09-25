document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("burger-menu");
  const header = document.getElementById("header");
  const openBurgerBtn = document.getElementById("open-burger");
  const closeBurgerBtn = document.getElementById("close-burger");

  let isMenuOpen = false;

  function openMenu() {
    menu.classList.add("burger__open");
    header.classList.add("burger__open");

    document.body.classList.add("no-scroll");

    isMenuOpen = true;
  }

  function closeMenu() {
    menu.classList.remove("burger__open");
    header.classList.remove("burger__open");

    document.body.classList.remove("no-scroll");

    isMenuOpen = false;
  }

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (
      isMenuOpen && (!menu.contains(target))
    ) {
      closeMenu();
    } else if (!isMenuOpen && (openBurgerBtn.contains(target) || target.closest("header__open-burger"))) {
      openMenu();
    } else if (isMenuOpen && (closeBurgerBtn.contains(target) || target.closest("burger__close-burger"))) closeMenu();
  });
});
