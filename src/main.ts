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
});
