const android_url = "https://coalline.com/files/apks/coalline.apk"
const ios_url = "https://itunes.apple.com/cn/app/%E7%9F%A5%E7%85%A4/id1265588811?mt=8"
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
