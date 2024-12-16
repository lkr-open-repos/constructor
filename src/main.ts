import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const featuredItems = document.querySelector(
    ".featured__items"
  ) as HTMLElement;
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  featuredItems.addEventListener("mousedown", (e: MouseEvent) => {
    isDown = true;
    featuredItems.classList.add("active");
    startX = e.pageX - featuredItems.offsetLeft;
    scrollLeft = featuredItems.scrollLeft;
    featuredItems.style.cursor = "grabbing";
  });

  featuredItems.addEventListener("mouseleave", () => {
    isDown = false;
    featuredItems.classList.remove("active");
    featuredItems.style.cursor = "grab";
  });

  featuredItems.addEventListener("mouseup", () => {
    isDown = false;
    featuredItems.classList.remove("active");
    featuredItems.style.cursor = "grab";
  });

  featuredItems.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - featuredItems.offsetLeft;
    const walk = (x - startX) / 2;
    featuredItems.scrollLeft = scrollLeft - walk;
  });

  /*============================= TESTIMONIAL CAROUSEL =============================*/

  const leftArrow = document.querySelector(
    ".testimonial__arrow--left"
  ) as HTMLButtonElement;
  const rightArrow = document.querySelector(
    ".testimonial__arrow--right"
  ) as HTMLButtonElement;
  const testimonialItems = document.querySelectorAll(
    ".testimonial__track__item"
  );
  const testimonialItemsImage = document.querySelectorAll(
    ".testimonial__track__item-image"
  );
  const testimonialTexts = document.querySelectorAll(".testimonial__text");

  let currentIndex = 0;

  // Function to update the active image
  const updateActiveItem = (index: number) => {
    testimonialItems.forEach((item) =>
      item.classList.remove("testimonial__track__item--active")
    );
    testimonialItemsImage.forEach((item) =>
      item.classList.remove("testimonial__track__item-image--active")
    );

    testimonialItems[index].classList.add("testimonial__track__item--active");
    testimonialItemsImage[index].classList.add(
      "testimonial__track__item-image--active"
    );
  };

  // Function to update the active text
  const updateActiveText = (index: number) => {
    // Remove active class from all texts
    testimonialTexts.forEach((text) =>
      text.classList.remove("testimonial__text--active")
    );
    // Add active class to the corresponding text
    testimonialTexts[index].classList.add("testimonial__text--active");
  };

  // Function to go to the next testimonial
  const nextTestimonial = () => {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateActiveItem(currentIndex);
    updateActiveText(currentIndex);
  };

  // Left arrow event
  leftArrow.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateActiveItem(currentIndex);
    updateActiveText(currentIndex);
  });

  // Right arrow event
  rightArrow.addEventListener("click", nextTestimonial);

  // Initial setup
  updateActiveItem(currentIndex);
  updateActiveText(currentIndex);

  // Autoplay functionality
  const autoplayInterval = 3000; // Change this value to adjust the autoplay interval (in milliseconds)
  const autoplay = setInterval(nextTestimonial, autoplayInterval);

  // Optional: Pause autoplay on hover
  testimonialItems.forEach((item) => {
    item.addEventListener("mouseover", () => clearInterval(autoplay));
    item.addEventListener("mouseout", () =>
      setInterval(nextTestimonial, autoplayInterval)
    );
  });
});
