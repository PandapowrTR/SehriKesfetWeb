document.addEventListener("DOMContentLoaded", function () {
  setAnimations();
});

function setAnimations() {
  const userAgent = navigator.userAgent;
  const mobileDevices = ["Android", "iPhone", "iPad", "iPod"];
  const isMobile = mobileDevices.some((device) => userAgent.includes(device));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      let animate =
        entry.target.classList.contains("no-scroll-anim-mobile") && isMobile;
      if (animate) {
        entry.target.style.transition = "none";
      }
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-anim-show");
      } else if (entry.target.classList.contains("scroll-anim-replay")) {
        entry.target.classList.remove("scroll-anim-show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".scroll-anim");
  hiddenElements.forEach((el) => observer.observe(el));
}
