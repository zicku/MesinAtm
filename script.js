function tarikUang(total) {
  const pecahan = [100, 10, 5, 1];
  const stok = {
    100: 7,
    10: 8,
    5: 8,
    1: 10,
  };
  const hasil = {};
  let sisa = total;

  for (let i = 0; i < pecahan.length; i++) {
    const p = pecahan[i];
    const maxAmbil = Math.min(Math.floor(sisa / p), stok[p]);
    hasil[p] = maxAmbil;
    sisa -= maxAmbil * p;
  }

  const output = document.getElementById("output");
  const container = document.getElementById("uang-container");
  container.innerHTML = ""; // reset lembar uang visual

  if (sisa > 0) {
    output.textContent = "❌ Gagal! Stok tidak mencukupi.";
  } else {
    let result = "✅ Uang Yang Dikeluarkan Mesin ATM:\n";
    let delay = 0;

    pecahan.forEach((p) => {
      if (hasil[p] > 0) {
        result += `${hasil[p]} lembar Rp. ${p},-\n`;

        for (let i = 0; i < hasil[p]; i++) {
          setTimeout(() => {
            const uang = document.createElement("div");
            uang.className = "uang";
            uang.textContent = `Rp ${p},-`;
            uang.style.animationDelay = "0s";
            container.appendChild(uang);

            // Hapus otomatis setelah 3 detik
            setTimeout(() => uang.remove(), 3000);
          }, delay);
          delay += 300; // delay antar uang
        }
      }
    });

    output.textContent = result;
  }
}

function tarik() {
  const input = document.getElementById("jumlah");
  const total = parseInt(input.value);
  const output = document.getElementById("output");

  if (!input.value || isNaN(total) || total <= 0) {
    output.textContent = "⚠️ masukkan jumlah uang yang valid (lebih dari 0).";
    return;
  }

  tarikUang(total);
}
