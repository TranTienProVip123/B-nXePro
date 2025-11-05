// Toggle Mobile Menu
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("sidebarOverlay");
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  // prevent body scroll when open
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
}

// close menu helper
function closeMenu() {
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("sidebarOverlay");
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// close when clicking overlay
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("sidebarOverlay");
  if (overlay) overlay.addEventListener("click", closeMenu);

  // close when clicking a link inside navMenu (good UX)
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        // small delay so anchor navigation can happen
        setTimeout(closeMenu, 100);
      });
    });
  }
});

// Generate Gallery
function generateGallery() {
  const gallery = document.getElementById("galleryGrid");
  gallery.innerHTML = "";

  // Danh sách ảnh khách hàng thực tế
  const customers = [
    { name: "Anh Nguyễn Văn Minh", image: "img/khach1.jpg" },
    { name: "Chị Trần Thị Hồng", image: "img/khach2.jpg" },
    { name: "Anh Lê Hoàng Nam", image: "img/khach3.jpg" },
    { name: "Gia đình Anh Phúc", image: "img/khach4.jpg" },
  ];

  // Sinh thẻ gallery
  customers.forEach((c, index) => {
    const item = `
        <div class="gallery-item">
          <img src="${c.image}" alt="${c.name}">
          <div class="gallery-overlay">
            <p>${c.name}</p>
          </div>
        </div>
      `;
    gallery.insertAdjacentHTML("beforeend", item);
  });
}

generateGallery();