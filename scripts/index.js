// --- Hero Slider ---
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

// --- Data ---
const heroSilder = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg"];
const products = [
  { name: "TOYOTA RAIZE CROSS", price: "1.850.000.000đ", image: "xe1.jpg" },
  { name: "TOYOTA YARIS CROSS", price: "1.650.000.000đ", image: "xe2.jpg" },
  { name: "TOYOTA VELOZ CROSS", price: "1.650.000.000đ", image: "xe3.png" },
  { name: "TOYOTA VIOS CROSS", price: "1.650.000.000đ", image: "xe4.png" },
  { name: "TOYOTA YARIS CROSS", price: "1.650.000.000đ", image: "xe5.jpg" },
  { name: "TOYOTA YARIS CROSS", price: "1.650.000.000đ", image: "xe6.png" },
  { name: "TOYOTA LAND CRUISER", price: "1.850.000.000đ", image: "xe7.jpg" },
  { name: "TOYOTA YARIS CROSS", price: "1.650.000.000đ", image: "xe8.jpg" },
  { name: "TOYOTA VELOZ CROSS", price: "1.650.000.000đ", image: "xe9.jpg" },
  { name: "TOYOTA ALPHARD CROSS", price: "1.850.000.000đ", image: "xe11.jpg" },
];

// --- Search Functionality ---
function renderSearchResults(results) {
  const searchResultsContainer = document.getElementById('search-results');
  if (!searchResultsContainer) return;

  searchResultsContainer.innerHTML = '';
  if (results.length === 0) {
    searchResultsContainer.innerHTML = '<p style="color: #888; text-align: center; padding: 20px 0;">Không tìm thấy kết quả nào.</p>';
    return;
  }

  results.forEach(car => {
    const item = `
      <a href="#" class="result-item">
        <img src="img/${car.image}" alt="${car.name}">
        <span class="name">${car.name}</span>
        <span class="price">${car.price}</span>
      </a>
    `;
    searchResultsContainer.insertAdjacentHTML('beforeend', item);
  });
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const searchResultsContainer = document.getElementById('search-results');
  if (!searchResultsContainer) return;

  if (!query) {
    searchResultsContainer.innerHTML = '';
    return;
  }

  const filteredCars = products.filter(car => {
    const carName = car.name.toLowerCase();
    // Chuẩn hóa giá để tìm kiếm (loại bỏ "đ" và ".")
    const carPrice = car.price.replace(/[.đ]/g, '');
    const normalizedQuery = query.replace(/[.đ]/g, '');
    
    return carName.includes(query) || carPrice.includes(normalizedQuery);
  });

  renderSearchResults(filteredCars);
}


// --- Page Generation and Interaction ---
function generateProducts() {
  const grid = document.getElementById("productsGrid");
  const select = document.getElementById("carModel");
  const quoteCard = document.querySelector(".quote-card");
  if (grid) grid.innerHTML = "";
  if (select) select.innerHTML = '<option value=""> Xe muốn mua </option>';

  products.forEach((product, index) => {
    if (grid) {
      const card = `
        <div class="product-card" onclick="showProductDetail(${index})">
          <div class="product-image"><img src="img/${product.image}" alt="${product.name}"></div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <div class="product-actions">
              <button class="btn-quote" onclick="scrollToQuote(event, '${product.name}')">BÁO GIÁ LĂN BÁNH</button>
              <button class="btn-detail" onclick="showProductDetail(${index})">XEM XE</button>
            </div>
          </div>
        </div>`;
      grid.insertAdjacentHTML("beforeend", card);
    }
    if (select) {
      const option = document.createElement("option");
      option.value = product.name;
      option.textContent = product.name;
      select.appendChild(option);
    }
  });
  if (grid && quoteCard) grid.appendChild(quoteCard);
}

function generateGallery() {
  const gallery = document.getElementById("galleryGrid");
  if (!gallery) return;
  gallery.innerHTML = "";
  const customers = [
    { name: "Anh Nguyễn Văn Minh", image: "img/khach1.jpg" },
    { name: "Chị Trần Thị Hồng", image: "img/khach2.jpg" },
    { name: "Anh Lê Hoàng Nam", image: "img/khach3.jpg" },
    { name: "Gia đình Anh Phúc", image: "img/khach4.jpg" },
  ];
  customers.forEach(c => {
    const item = `
      <div class="gallery-item">
        <img src="${c.image}" alt="${c.name}">
        <div class="gallery-overlay"><p>${c.name}</p></div>
      </div>`;
    gallery.insertAdjacentHTML("beforeend", item);
  });
}

function showProductDetail(index) {
  const product = products[index];
  const modal = document.getElementById("productModal");
  const modalBody = document.getElementById("modalBody");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h2>${product.name}</h2>
    <div style="text-align: center; margin: 30px 0;"><img src="img/${product.image}" alt="${product.name}"></div>
    <p style="font-size: 24px; color: #eb0a1e; font-weight: 600; margin: 20px 0;">Giá: ${product.price}</p>
    <h3>Thông số kỹ thuật:</h3>
    <ul style="line-height: 2; margin: 20px 0;">
      <li>Động cơ: 2.0L VVT-i</li> <li>Công suất: 143 mã lực</li> <li>Hộp số: Tự động CVT</li>
      <li>Nhiên liệu: Xăng</li> <li>Dẫn động: 2 cầu (AWD)</li>
    </ul>
    <button class="submit-btn" onclick="scrollToQuote(event, '${product.name}'); closeModal();">ĐĂNG KÝ LÁI THỬ</button>`;
  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("active");
}

function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("sidebarOverlay");
  if (!navMenu || !overlay) return;
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
}

function closeMenu() {
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("sidebarOverlay");
  if (navMenu && overlay) {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
  document.body.style.overflow = "";
}

function scrollToQuote(event, carName) {
  event.stopPropagation();
  const carModelSelect = document.getElementById("carModel");
  const quoteSection = document.getElementById("quote");
  if (carModelSelect) carModelSelect.value = carName;
  if (quoteSection) quoteSection.scrollIntoView({ behavior: "smooth" });
}

// --- DOMContentLoaded: Main Event Listener ---
document.addEventListener("DOMContentLoaded", () => {
  // Initialize slider
  if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();
  }

  // Initialize page content
  generateProducts();
  generateGallery();

  // Mobile menu listeners
  const overlay = document.getElementById("sidebarOverlay");
  if (overlay) overlay.addEventListener("click", closeMenu);
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    // Chỉ đóng menu khi click vào link thường, KHÔNG đóng khi click dropdown button
    navMenu.querySelectorAll("a").forEach(a => {
      // Bỏ qua nếu đây là nút dropdown
      if (!a.classList.contains('dropbtn')) {
        a.addEventListener("click", () => setTimeout(closeMenu, 100));
      }
    });
  }

  // Toggle dropdown menu trên mobile
  const dropdownItems = document.querySelectorAll('.nav-menu .dropdown');
  dropdownItems.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    
    if (dropbtn) {
      dropbtn.addEventListener('click', function(e) {
        // Chỉ áp dụng cho màn hình nhỏ
        if (window.innerWidth <= 768) {
          e.preventDefault(); // Ngăn link mặc định
          e.stopPropagation(); // Ngăn event bubbling
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Form submission listener
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const successMessage = document.getElementById("successMessage");
      if (successMessage) {
        successMessage.classList.add("show");
        setTimeout(() => successMessage.classList.remove("show"), 3000);
      }
      this.reset();
    });
  }
  
  // --- Search Event Listeners ---
  const openSearchBtn = document.querySelector('.fa-search');
  const searchOverlay = document.getElementById('search-overlay');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('search-input');

  if (openSearchBtn && searchOverlay) {
    openSearchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
    });
  }

  if (closeSearchBtn && searchOverlay) {
    closeSearchBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));
  }
  
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (event) => {
      if (event.target === searchOverlay) searchOverlay.classList.remove('active');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
});


// Toggle dropdown menu trên mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.nav-menu .dropdown');
    
    dropdownItems.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                // Chỉ áp dụng cho màn hình nhỏ
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Ngăn link mặc định
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
});