// ====================
// Menu Toggle: Mengubah tampilan menu dan header
// ====================
let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () => {
  menu.classList.toggle('fa-times'); // Menambahkan atau menghapus kelas 'fa-times' untuk ikon menu
  header.classList.toggle('active'); // Menambahkan atau menghapus kelas 'active' pada header
};

// ====================
// Scroll to Top Button: Menampilkan tombol "scroll to top" saat halaman digulir lebih dari 1000px
// ====================
let scrollTop = document.querySelector('.gotop');
window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('gotop-active', window.scrollY >= 1000); // Aktifkan tombol jika scrollY >= 1000
});

// ====================
// Section Highlight: Menyorot tautan menu yang sesuai dengan bagian halaman yang sedang aktif
// ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header .navbar a');

window.addEventListener('scroll', () => {
  let current = ''; // Menyimpan ID section yang sedang aktif

  // Periksa setiap section untuk menentukan posisi scroll
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Menyesuaikan jarak dengan tinggi header
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id'); // Ambil ID section yang aktif
    }
  });

  // Sorot tautan menu yang sesuai dengan section aktif
  navLinks.forEach((link) => {
    link.classList.remove('active'); // Hapus kelas 'active' dari semua tautan
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active'); // Tambahkan kelas 'active' ke tautan yang sesuai
    }
  });
});





// contact

(function () {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function getFormData(form) {
    var elements = form.elements;
    var fields = Object.keys(elements)
      .filter(function (k) {
        return elements[k].name !== undefined;
      })
      .map(function (k) {
        return elements[k].name;
      });

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];
      formData[name] = element.value;
    });

    return formData;
  }

  function handleFormSubmit(event) {
    event.preventDefault(); // Mencegah pengiriman form secara default

    var form = event.target;
    var data = getFormData(form);

    // Validasi email
    if (data.email && !validEmail(data.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Buat email menggunakan mailto
    var recipientEmail = form.dataset.email || 'wahyudi.tech.99.com'; // Email tujuan
    var subject = encodeURIComponent('New Message from ' + (data.name || 'Unknown'));
    var body = encodeURIComponent(
      `Name: ${data.name || 'N/A'}\n` +
      `Email: ${data.email || 'N/A'}\n` +
      `Phone: ${data.phone || 'N/A'}\n\n` +
      `Message:\n${data.message || 'No message provided.'}`
    );

    var mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Buka mailto link
    window.location.href = mailtoLink;

    // Tampilkan pesan "Thanks for contacting us!"
    var thankYouMessage = form.querySelector('.thankyou_message');
    if (thankYouMessage) {
      thankYouMessage.style.display = 'block';
    }
  }

  function loaded() {
    console.log('Contact form handler loaded successfully.');
    var forms = document.querySelectorAll('form.gform');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', handleFormSubmit, false);
    }
  }

  document.addEventListener('DOMContentLoaded', loaded, false);
})();

