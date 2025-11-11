// simple interactions
function startJourney(){
  // default: pindah ke materi dulu (bisa diupgrade jadi halaman game)
  window.location.hash = "#materi";
  alert("Kamu akan masuk ke materi pertama — nanti di sini game dimulai!");
}

function scrollToMateri(){
  document.querySelector('nav a[href="#materi"]').scrollIntoView({behavior:'smooth'});
}
function reset() {
  document.querySelectorAll("#trapesium [id^='label'], #trapesium line").forEach(e => e.style.opacity = 0);
}

function showSisi() {
  reset();
  document.getElementById("labelSisiAtas").style.opacity = 1;
  document.getElementById("labelSisiBawah").style.opacity = 1;
}

function showDiagonal() {
  reset();
  document.getElementById("diagonal1").style.opacity = 1;
  document.getElementById("diagonal2").style.opacity = 1;
}

function showSudut() {
  reset();
  document.getElementById("labelJumlahSudut").style.opacity = 1;
}

function showSimetri() {
  reset();
  alert("Trapesium tidak memiliki simetri lipat kecuali trapesium sama kaki.");
}

function resetTrapesium() {
  document.querySelectorAll("#trapesium-svg line, #trapesium-svg circle").forEach(el=>{
    el.style.opacity = "0";
    el.classList.remove("show");
  });
}
function showPopup(img) {
  const popup = document.getElementById("popup-container");
  const popupImg = document.getElementById("popup-image");
  popup.style.display = "flex";
  popupImg.src = img.src;
}

function closePopup() {
  document.getElementById("popup-container").style.display = "none";
}
function showPopup(img) {
  const popup = document.getElementById("popup-container");
  const popupImage = document.getElementById("popup-image");
  popup.style.display = "flex";
  popupImage.src = img.src;
}

function closePopup() {
  document.getElementById("popup-container").style.display = "none";
}
/* ====== Data NIS → Nama ====== */
const DATA_SISWA = {
  "230401140138": "Prisma Fajar",
  "230401140139": "Aisyah Rahma",
  "230401140140": "Dimas Aditya"
};

/* ====== Helper localStorage ====== */
function save(key, value) {
  localStorage.setItem(key, value);
}
function load(key) {
  return localStorage.getItem(key);
}
function remove(key) {
  localStorage.removeItem(key);
}

/* ====== Tampilkan sapaan ====== */
function showGreetingIfAny() {
  const nama = load("namaSiswa");
  const nis = load("nisSiswa");
  const greet = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  if (!greet || !logoutBtn) return;

  if (nama && nis) {
    greet.style.display = "block";
    greet.innerText = `👋 Halo, ${nama}!`;
    logoutBtn.style.display = "inline-block";
  } else {
    greet.style.display = "none";
    greet.innerText = "";
    logoutBtn.style.display = "none";
  }
}

/* ====== Login Siswa ====== */
function loginSiswa() {
  const nisInput = document.getElementById("nis");
  if (!nisInput) return;

  const nis = nisInput.value.trim();
  const nama = DATA_SISWA[nis];

  if (!nama) {
    alert("❌ NIS tidak ditemukan. Coba lagi ya!");
    return;
  }

  save("nisSiswa", nis);
  save("namaSiswa", nama);

  const modal = document.getElementById("login-box");
  if (modal) modal.classList.add("modal_hidden");

  showGreetingIfAny();
}

/* ====== Logout Siswa ====== */
function logoutSiswa() {
  remove("nisSiswa");
  remove("namaSiswa");
  showGreetingIfAny();

  const modal = document.getElementById("login-box");
  if (modal) modal.classList.remove("modal_hidden");
}

/* ====== Inisialisasi ====== */
document.addEventListener("DOMContentLoaded", () => {
  const ok = document.getElementById("login-ok");
  if (ok) ok.addEventListener("click", loginSiswa);

  const cancel = document.getElementById("login-cancel");
  if (cancel) cancel.addEventListener("click", () => {
    const m = document.getElementById("login-box");
    if (m) m.classList.add("modal_hidden");
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", logoutSiswa);

  showGreetingIfAny();
});
function cekLKPD(e) {
  e.preventDefault();

  // kunci jawaban benar
  const kunci = {
    j1: "1/3,2/3,3/3,4/3,5/3",
    j2: "1/2,2/3,3/4,4/5,5/6",
    j3: "1/2,2/5,3/5,4/5,3/4",
    j4: "3/4,3/5,2/5,1/2,1/3",
    j5: "5/6,4/5,3/4,2/3,4/8"
  };

  let skor = 0;
  let hasilDetail = "";

  // periksa tiap jawaban
  for (let i = 1; i <= 5; i++) {
    const input = document.getElementById("j" + i);
    const jawab = input.value.trim().replaceAll(" ", "");
    const benar = kunci["j" + i];

    if (jawab === benar) {
      skor += 20;
      hasilDetail += `✅ Soal ${i} benar\n`;
      input.style.border = "2px solid #4CAF50"; // hijau kalau benar
    } else {
      hasilDetail += `❌ Soal ${i} salah\n`;
      input.style.border = "2px solid #E53935"; // merah kalau salah
    }
  }

  let pesan = "";
  if (skor === 100) pesan = "🎉 Hebat! Semua jawaban benar!";
  else if (skor >= 60) pesan = "✨ Cukup baik! Tetap semangat!";
  else pesan = "❌ Masih banyak yang salah, coba lagi ya!";

  // tampilkan hasil ke layar
  const hasilBox = document.getElementById("hasil");
  hasilBox.innerText = hasilDetail + "\nNilai: " + skor + "\n" + pesan;

  // simpan nilai ke localStorage
  localStorage.setItem("nilaiLKPD1", skor);
}

window.onload = function() {
  const nilai = localStorage.getItem("nilaiLKPD1");
  if (nilai) {
    document.getElementById("hasil").innerText = "Nilai terakhir kamu: " + nilai;
  }
};
function cekLKPD2(e) {
  e.preventDefault();

  // kunci jawaban (semua dinilai)
  const kunci2 = {
    s1: ">",   // 3/4 > 2/4
    s2: "<",   // 2/5 < 3/5
    s3: ">"    // 6/7 > 3/7
  };

  let skor2 = 0;
  let hasilDetail2 = "";

  // nilai semua soal (1–3)
  for (let i = 1; i <= 3; i++) {
    const input = document.getElementById("s" + i);
    const jawab = (input.value || "").trim();
    const benar = kunci2["s" + i];

    if (jawab === benar) {
      skor2 += 33.3; // tiga soal → kira-kira 33 poin per soal
      hasilDetail2 += `✅ Soal ${i} benar\n`;
      input.style.border = "2px solid #4CAF50";
    } else {
      hasilDetail2 += `❌ Soal ${i} salah\n`;
      input.style.border = "2px solid #E53935";
    }
  }

  const hasilBox2 = document.getElementById("hasil2");
  const skorAkhir = Math.round(skor2);

  hasilBox2.innerText =
    `${hasilDetail2}\nNilai: ${skorAkhir}\n` +
    (skorAkhir === 100
      ? "🎉 Hebat! Semua benar!"
      : skorAkhir >= 60
      ? "✨ Bagus, masih bisa lebih baik!"
      : "❌ Coba lagi ya!");

  localStorage.setItem("nilaiLKPD2", skorAkhir);
}
function cekLKPD3(e) {
  e.preventDefault();

const kunci = {
  s1a: "1", s1b: "4",
  s2a: "1", s2b: "8",
  s3a: "1", s3b: "16",
  besar: "1", bagianBesar: "4",
  kecil: "3", bagianKecil: "16",
  // bagian perbandingan
  p1a: "1", p1b: "4", "p-simbol1": ">", p2a: "1", p2b: "8",
  p3a: "1", p3b: "8", "p-simbol2": "<", p4a: "1", p4b: "16",
  urutan: "3,2,1"
};

  const inputIDs = Object.keys(kunci);
  let skor = 0;
  let detail = "";

  inputIDs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const jawab = el.value.trim();
    if (jawab === kunci[id]) {
      skor += 100 / inputIDs.length;
      el.style.border = "2px solid #4CAF50";
      detail += `✅ ${id.toUpperCase()} benar\n`;
    } else {
      el.style.border = "2px solid #E53935";
      detail += `❌ ${id.toUpperCase()} salah\n`;
    }
  });

  const hasil = document.getElementById("hasil3");
  const skorAkhir = Math.round(skor);
  hasil.innerText = `${detail}\nNilai: ${skorAkhir}\n` +
    (skorAkhir === 100
      ? "🎉 Hebat! Semua benar!"
      : skorAkhir >= 60
      ? "✨ Sudah bagus, tetap semangat!"
      : "❌ Coba lagi ya!");

  localStorage.setItem("nilaiLKPD3", skorAkhir);
}
function cekKeliling(event) {
  event.preventDefault();
  
  const kunci = [33, 48, 46, 52]; // misal contoh nilai keliling (kamu bisa ubah)
  let benar = 0;
  let hasilTeks = "";

  for (let i = 1; i <= 4; i++) {
    const jawaban = parseFloat(document.getElementById(`k${i}`).value);
    if (jawaban === kunci[i - 1]) {
      benar++;
      hasilTeks += `✅ Soal ${i} benar<br>`;
    } else {
      hasilTeks += `❌ Soal ${i} salah (jawaban: ${kunci[i - 1]} cm)<br>`;
    }
  }

  const nilai = (benar / 4) * 100;
  document.getElementById("hasilKeliling").innerHTML =
    `${hasilTeks}<br><b>Nilai kamu: ${nilai}</b>`;
}
function cekLuas(event) {
  event.preventDefault();

  // kunci contoh (ubah sesuai ukuran di gambar kamu)
  const kunci = [48, 35, 56, 40];  
  let benar = 0;
  let hasil = "";

  for (let i = 1; i <= 4; i++) {
    const j = parseFloat(document.getElementById("l" + i).value);
    if (j === kunci[i - 1]) {
      hasil += `✅ Soal ${i} benar<br>`;
      benar++;
    } else {
      hasil += `❌ Soal ${i} salah (jawaban: ${kunci[i - 1]} cm²)<br>`;
    }
  }

  const nilai = (benar / 4) * 100;
  document.getElementById("hasilLuas").innerHTML =
    `${hasil}<br><b>Nilai kamu: ${nilai}</b>`;
}
function cekCerita(event) {
  event.preventDefault();

  // kunci jawaban (contoh, bisa kamu sesuaikan)
  const kunci = [64, 80, 32, 60];
  let benar = 0;
  let hasil = "";

  for (let i = 1; i <= 4; i++) {
    const j = parseFloat(document.getElementById("c" + i).value);
    if (j === kunci[i - 1]) {
      hasil += `✅ Soal ${i} benar<br>`;
      benar++;
    } else {
      hasil += `❌ Soal ${i} salah (jawaban: ${kunci[i - 1]})<br>`;
    }
  }

  const nilai = (benar / 4) * 100;
  document.getElementById("hasilCerita").innerHTML = `${hasil}<br><b>Nilai kamu: ${nilai}</b>`;
}
// toggle daftar pustaka
document.getElementById("dapusToggle")?.addEventListener("click", function() {
  const content = document.getElementById("dapusContent");
  content.classList.toggle("collapsed");
});

// buka modal login
document.getElementById("loginBtn")?.addEventListener("click", function() {
  document.getElementById("modalLogin").classList.remove("hidden");
});

// buka modal pengaturan
document.getElementById("settingsBtn")?.addEventListener("click", function() {
  document.getElementById("modalSettings").classList.remove("hidden");
});

// tutup modal
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}



