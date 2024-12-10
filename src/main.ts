import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(
    ".featured__container"
  ) as HTMLElement;
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  container.addEventListener("mousedown", (e: MouseEvent) => {
    isDown = true;
    container.classList.add("active");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = "grabbing";
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("active");
    container.style.cursor = "grab";
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("active");
    container.style.cursor = "grab";
  });

  container.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) / 2;
    container.scrollLeft = scrollLeft - walk;
  });
});
