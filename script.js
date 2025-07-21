const input = document.getElementById('inputimage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const button = document.getElementById('upscalebtn');

let loadedImage = null;

input.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      loadedImage = img;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

button.addEventListener('click', function () {
  if (!loadedImage) {
    alert("select the image.");
    return;
  }

  const loadingPopup = document.getElementById('loadingPopup');
  loadingPopup.style.display = 'block';

  setTimeout(() => {
    const scale = 2;
    canvas.width = loadedImage.width * scale;
    canvas.height = loadedImage.height * scale;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

    // Otomatis download hasil upscale
    const link = document.createElement('a');
    link.download = 'upscaled-image.png';
    link.href = canvas.toDataURL();
    link.click();

    loadingPopup.style.display = 'none';
  }, 100);
});
