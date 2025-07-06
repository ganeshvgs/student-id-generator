function generateID() {
  document.getElementById('displayName').textContent = document.getElementById('name').value;
  document.getElementById('displayRoll').textContent = document.getElementById('roll').value;
  document.getElementById('displayClass').textContent = document.getElementById('class').value;
  document.getElementById('displayFather').textContent = document.getElementById('father').value;
  document.getElementById('displayMother').textContent = document.getElementById('mother').value;
  document.getElementById('displayMobile').textContent = document.getElementById('mobile').value;
  document.getElementById('displayBlood').textContent = document.getElementById('blood').value;
  document.getElementById('displayAddress').textContent = document.getElementById('address').value;
}

document.getElementById('photoInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById('photoPreview');
    preview.style.backgroundImage = `url(${e.target.result})`;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
  };
  reader.readAsDataURL(file);
});

function downloadPDF() {
  const front = document.getElementById("idCardFront");
  const back = document.getElementById("idCardBack");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  html2canvas(front, { scale: 3 }).then(canvasFront => {
    const imgDataFront = canvasFront.toDataURL("image/png");
    const pdfWidth = 180;
    const pdfHeightFront = (canvasFront.height * pdfWidth) / canvasFront.width;

    pdf.addImage(imgDataFront, "PNG", 15, 10, pdfWidth, pdfHeightFront);

    html2canvas(back, { scale: 3 }).then(canvasBack => {
      const imgDataBack = canvasBack.toDataURL("image/png");
      const pdfHeightBack = (canvasBack.height * pdfWidth) / canvasBack.width;

      pdf.addPage();
      pdf.addImage(imgDataBack, "PNG", 15, 10, pdfWidth, pdfHeightBack);

      pdf.save("student-id-card.pdf");
    });
  });
}
