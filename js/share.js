const android_url = ""
const ios_url = " "
window.onload = function () {
  document.body.addEventListener('touchstart', function () {});
}

function goDownload(num) {
  if (num === 0) {
    window.location.href = android_url
  } else if (num == 1) {
    window.location.href = ios_url
  }
}
