// ===================== BACK TO TOP BUTTON =====================
const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.innerHTML = "↑";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== COMPONENT LOADER =====================
function loadComponent(selector, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to fetch ${file}`);
      return response.text();
    })
  
    .then(data => {
      const target = document.querySelector(selector);
      if (target) target.innerHTML = data;
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#navbar-placeholder", "/components/navbar.html");
  loadComponent("#footer-placeholder", "/components/footer.html");
});