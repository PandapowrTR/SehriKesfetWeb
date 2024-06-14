function toggleTheme() {
  element = document.querySelector(".theme-changer");
  theme = "theme-light";
  if (element.classList.contains("theme-light")) {
    theme = "theme-dark";
  }
  setTheme(theme);
}
function setTheme(theme) {
  if (!["theme-dark", "theme-light"].includes(theme)) {
    console.error("Unknown theme " + theme.toString());
    return;
  }
  elements = document.querySelectorAll(".theme-changer");
  for (const e of elements) {
    if (theme == "theme-light") {
      e.classList.remove("theme-dark");
      e.classList.add("theme-light");
      document.documentElement.style.setProperty('--colorDynamicText', '#212529');
      document.documentElement.style.setProperty('--colorDynamicBackground', '#ffffff');
    } else {
      e.classList.remove("theme-light");
      e.classList.add("theme-dark");
      document.documentElement.style.setProperty('--colorDynamicText', '#ffffff');
      document.documentElement.style.setProperty('--colorDynamicBackground', '#212529');
    }
  }
  localStorage.setItem("theme", theme);
}
function loadThemeFromLS() {
  theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
  } else {
    localStorage.setItem("theme", "theme-dark");
    setTheme("theme-dark");
  }
}
