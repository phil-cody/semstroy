const initSlider = (slider, breakpoint = 768) => {
  const cards = Array.from(slider.children).filter(
    (item) => !item.matches("[data-slider-controls]"),
  );

  const section = slider.closest("section") || slider.parentElement;
  const prev = section.querySelector(".button__prev");
  const next = section.querySelector(".button__next");

  if (!cards.length || !prev || !next) return;

  const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

  let isActive = false;

  const getPaddingLeft = () =>
    parseFloat(window.getComputedStyle(slider).paddingLeft) || 0;

  const getMaxScroll = () =>
    Math.max(0, slider.scrollWidth - slider.clientWidth);

  const getContentStart = () =>
    slider.getBoundingClientRect().left + getPaddingLeft();

  const getActiveCardIndex = () => {
    const contentStart = getContentStart();

    let activeIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left - contentStart,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        activeIndex = index;
      }
    });

    return activeIndex;
  };

  const updateButtons = () => {
    const maxScroll = getMaxScroll();

    prev.disabled = slider.scrollLeft <= 4;
    next.disabled = slider.scrollLeft >= maxScroll - 4;
  };

  const scrollToCard = (card) => {
    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const targetScroll =
      slider.scrollLeft +
      cardRect.left -
      (sliderRect.left + getPaddingLeft());

    slider.scrollTo({
      left: Math.max(0, Math.min(targetScroll, getMaxScroll())),
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const activeIndex = getActiveCardIndex();
    const target = cards[activeIndex - 1];

    if (target) {
      scrollToCard(target);
    }
  };

  const handleNext = () => {
    const activeIndex = getActiveCardIndex();
    const target = cards[activeIndex + 1];

    if (target) {
      scrollToCard(target);
    }
  };

  const enable = () => {
    if (isActive) return;

    isActive = true;

    slider.addEventListener("scroll", updateButtons);
    prev.addEventListener("click", handlePrev);
    next.addEventListener("click", handleNext);

    updateButtons();
  };

  const disable = () => {
    if (!isActive) return;

    isActive = false;

    slider.removeEventListener("scroll", updateButtons);
    prev.removeEventListener("click", handlePrev);
    next.removeEventListener("click", handleNext);

    slider.scrollLeft = 0;

    prev.disabled = false;
    next.disabled = false;
  };

  const update = () => {
    if (mediaQuery.matches) {
      enable();
    } else {
      disable();
    }
  };

  mediaQuery.addEventListener("change", update);

  update();
};


document.querySelectorAll(".slider").forEach((slider) => {
  initSlider(slider);
});