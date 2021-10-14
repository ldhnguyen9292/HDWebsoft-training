const token = JSON.parse(localStorage.getItem("token"));

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
const userInfo = parseJwt(token);
document.getElementById("username").innerHTML = userInfo.username;
document.getElementById("gender").innerHTML = userInfo.profile.gender;
document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./index.html";
});
