// just a quick 5mins password shower and hidder
const $passwordInput = document.querySelector(".password-input");
const $eyeIcon = document.querySelector(".eye-icon");
$eyeIcon.addEventListener("click", () => showAndHidePassword($passwordInput));
function showAndHidePassword(input) {
  if (input.type == "password") {
    input.type = "text";
    return;
  }
  input.type = "password";
  return;
}
