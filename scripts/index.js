let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const totalSlides = slides.length;
let autoSlideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % totalSlides;
  showSlide(next);
  resetAutoSlide();
}

function prevSlide() {
  let prev = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(prev);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000); // 5s chuyển slide
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  startAutoSlide();
});
// hero section background images
const heroSilder = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg"];
// Product Data
const products = [
  {
    name: "TOYOTA RAIZE CROSS",
    price: "1.850.000.000đ",
    image: "xe1.jpg",
  },
  {
    name: "TOYOTA YARIS CROSS",
    price: "1.650.000.000đ",
    image: "xe2.jpg",
  },
  {
    name: "TOYOTA VELOZ CROSS",
    price: "1.650.000.000đ",
    image: "xe3.png",
  },
  {
    name: "TOYOTA VIOS CROSS",
    price: "1.650.000.000đ",
    image: "xe4.png",
  },
  {
    name: "TOYOTA YARIS CROSS",
    price: "1.650.000.000đ",
    image: "xe5.jpg",
  },
  {
    name: "TOYOTA YARIS CROSS",
    price: "1.650.000.000đ",
    image: "xe6.png",
  },
  {
    name: "TOYOTA LAND CRUISER",
    price: "1.850.000.000đ",
    image: "xe7.jpg",
  },
  {
    name: "TOYOTA YARIS CROSS",
    price: "1.650.000.000đ",
    image: "xe8.jpg",
  },
  {
    name: "TOYOTA VELOZ CROSS",
    price: "1.650.000.000đ",
    image: "xe9.jpg",
  },
  {
    name: "TOYOTA ALPHARD CROSS",
    price: "1.850.000.000đ",
    image: "xe11.jpg",
  },
];

// Generate Product Cards
function generateProducts() {
  const grid = document.getElementById("productsGrid");
  const select = document.getElementById("carModel");
  const quoteCard = document.querySelector(".quote-card");
  grid.innerHTML = ""; // Clear existing

  select.innerHTML = '<option value=""> Xe muốn mua </option>'; // Clear existing

  products.forEach((product, index) => {
    const card = `
                    <div class="product-card" onclick="showProductDetail(${index})">
                        <div class="product-image">
                            <img src="img/${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-price">${product.price}</p>
                            <div class="product-actions">
                                <button class="btn-quote" onclick="scrollToQuote(event, '${product.name}')">BÁO GIÁ LĂNG BÁNH</button>
                                <button class="btn-detail" onclick="showProductDetail(${index})">XEM XE</button>
                            </div>
                        </div>
                    </div>
                `;
    grid.insertAdjacentHTML("beforeend", card);

    // Add to select
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    select.appendChild(option);
  });
  grid.appendChild(quoteCard); // Keep quote card at the end
}

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

// Show Product Detail Modal
function showProductDetail(index) {
  const product = products[index];
  const modal = document.getElementById("productModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
                <h2>${product.name}</h2>
                <div style="text-align: center; margin: 30px 0;">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect fill='%23f5f5f5' width='600' height='400'/%3E%3Cpath fill='%23666' d='M100 180h400v120H100z'/%3E%3Ccircle fill='%23333' cx='220' cy='300' r='40'/%3E%3Ccircle fill='%23333' cx='380' cy='300' r='40'/%3E%3Cpath fill='%23888' d='M150 120h300l-30 60H180z'/%3E%3C/svg%3E" style="max-width: 100%; height: auto;">
                </div>
                <p style="font-size: 24px; color: #eb0a1e; font-weight: 600; margin: 20px 0;">Giá: ${product.price}</p>
                <h3>Thông số kỹ thuật:</h3>
                <ul style="line-height: 2; margin: 20px 0;">
                    <li>Động cơ: 2.0L VVT-i</li>
                    <li>Công suất: 143 mã lực</li>
                    <li>Hộp số: Tự động CVT</li>
                    <li>Nhiên liệu: Xăng</li>
                    <li>Dẫn động: 2 cầu (AWD)</li>
                </ul>
                <button class="submit-btn" onclick="scrollToQuote(event, '${product.name}'); closeModal();">ĐĂNG KÝ LÁI THỬ</button>
            `;

  modal.classList.add("active");
}

// Close Modal
function closeModal() {
  document.getElementById("productModal").classList.remove("active");
}

// Toggle Mobile Menu
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

// Scroll to Quote Section
function scrollToQuote(event, carName) {
  event.stopPropagation();
  document.getElementById("carModel").value = carName;
  document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
}

// Handle Form Submit
document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    purpose: document.querySelector('input[name="purpose"]:checked').value,
    carModel: document.getElementById("carModel").value,
    fullName: document.getElementById("fullName").value,
    location: document.getElementById("location").value,
  };
  console.log("Form Data Submitted:", formData);
  // Show success message
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.add("show");
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 3000);
  // Reset form
  this.reset();
});
// Initialize
generateProducts();
generateGallery();
