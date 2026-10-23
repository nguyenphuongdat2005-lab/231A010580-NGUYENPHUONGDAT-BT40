
const movieCards = document.querySelectorAll(".movie-card");
const searchInput = document.getElementById("searchInput");
const tabs = document.querySelectorAll(".tab");
const emptyMessage = document.getElementById("emptyMessage");

let currentFilter = "now";

// HIỂN THỊ DANH SÁCH PHIM
function filterMovies() {
    const keyword = searchInput.value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");

    let visibleCount = 0;

    movieCards.forEach(card => {
        const name = card.dataset.name;
        const status = card.dataset.status;

        const matchesName = name.includes(keyword);
        const matchesStatus = status === currentFilter;
        const visible = matchesName && matchesStatus;

        card.style.display = visible ? "" : "none";

        if (visible) visibleCount++;
    });

    emptyMessage.style.display =
        visibleCount === 0 ? "block" : "none";
}

// TÌM KIẾM PHIM
searchInput.addEventListener("input", filterMovies);

// LỌC PHIM
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(item => item.classList.remove("active"));

        tab.classList.add("active");
        currentFilter = tab.dataset.filter;

        filterMovies();
    });
});

// MỞ HỘP THÔNG TIN
function openModal(title, html) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalBody").innerHTML = html;
    document.getElementById("bookingModal").classList.add("show");
}

// NÚT MUA VÉ TRÊN TỪNG PHIM
function buyTicket(movieName) {
    const card = Array.from(movieCards).find(item =>
        item.dataset.name === movieName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .toLowerCase()
    );

    if (card && card.dataset.status === "soon") {
        openModal(
            "Phim sắp chiếu",
            `<p><strong>${movieName}</strong></p>
             <p>Phim hiện chưa mở bán vé trên website mô phỏng này.</p>`
        );
        return;
    }

    document.getElementById("movieSelect").value = movieName;

    document.getElementById("schedule").scrollIntoView({
        behavior: "smooth"
    });

    openModal(
        "Đặt vé xem phim",
        `<p>Bạn đã chọn phim <strong>${movieName}</strong>.</p>
         <p>Hãy chọn rạp, ngày xem và suất chiếu ở phần Đặt vé nhanh chóng.</p>`
    );
}

// XÁC NHẬN SUẤT CHIẾU
function confirmBooking() {
    const cinema = document.getElementById("cinema").value;
    const movie = document.getElementById("movieSelect").value;
    const date = document.getElementById("showDate").value;
    const time = document.getElementById("showTime").value;

    if (!cinema) {
        alert("Vui lòng chọn rạp chiếu phim!");
        return;
    }

    if (!date) {
        alert("Vui lòng chọn ngày xem!");
        return;
    }

    const selectedDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert("Ngày xem không được ở trong quá khứ!");
        return;
    }

    const formattedDate = selectedDate.toLocaleDateString("vi-VN");

    openModal(
        "Thông tin suất chiếu",
        `<p><strong>Phim:</strong> ${movie}</p>
         <p><strong>Rạp:</strong> ${cinema}</p>
         <p><strong>Ngày xem:</strong> ${formattedDate}</p>
         <p><strong>Suất chiếu:</strong> ${time}</p>
         <p style="color:#e31837;margin-top:12px">
         Đây là bản demo giao diện. Chưa có hệ thống giữ ghế,
         thanh toán hoặc phát hành vé thật.</p>`
    );
}

// ĐĂNG NHẬP DEMO
function login() {
    openModal(
        "Đăng nhập tài khoản",
        `<p>Chức năng đăng nhập hiện là bản mô phỏng.</p>
         <p>Để đăng nhập thật cần xây dựng hệ thống tài khoản và máy chủ.</p>`
    );
}

// ĐÓNG HỘP THOẠI
function closeModal() {
    document.getElementById("bookingModal").classList.remove("show");
}

// ĐÓNG KHI BẤM RA NGOÀI HỘP THOẠI
document.getElementById("bookingModal").addEventListener("click", event => {
    if (event.target.id === "bookingModal") {
        closeModal();
    }
});

// ĐÓNG BẰNG PHÍM ESC
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// MẶC ĐỊNH NGÀY XEM LÀ HÔM NAY
const dateInput = document.getElementById("showDate");
const todayString = new Date();
const localDate = new Date(
    todayString.getTime() - todayString.getTimezoneOffset() * 60000
).toISOString().slice(0, 10);

dateInput.min = localDate;
dateInput.value = localDate;

// KHỞI TẠO
filterMovies();










