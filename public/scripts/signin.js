// TODO 구현해야됨
import { postData } from "./util.js";
const signin = async (data) => {
  await postData("/api/login", data);
};

const isEmptyValue = (string) => string === "";

const hideErrorMsg = (input) => {
  input.closest("div").nextElementSibling.style.visibility = "hidden";
  input.classList.remove("error-input");
};

const showErrorMsg = (input) => {
  input.closest("div").nextElementSibling.style.visibility = "visible";
  input.classList.add("error-input");
};

const validate = (...inputElements) => {
  let result = true;

  inputElements.forEach((inputElement) => {
    if (isEmptyValue(inputElement.value)) {
      showErrorMsg(inputElement);
      result = false;
    } else {
      hideErrorMsg(inputElement);
    }
  });

  return result;
};

const onSubmitHandler = async (event) => {
  event.preventDefault();

  const { id, password } = event.target.elements;

  if (!validate(id, password)) {
    return;
  }

  // TODO 에러 핸들링
  // 1. 로그인 성공시 '/'여기로 이동
  // 2. 실패시 다시 입력..?!
  // validate통과 못하면 error message

  try {
    const result = await signin({ email: id.value, password: password.value });
    alert(result);
    window.location.replace("/");
  } catch (error) {}
  // signup
  console.log(error);
};

const activateValidator = (formElement) => {
  formElement.addEventListener("submit", onSubmitHandler);
  formElement.addEventListener("input", (e) => {
    hideErrorMsg(e.target);
  });
};

window.addEventListener("load", () => {
  const loginForm = document.querySelector(".submit-form");
  activateValidator(loginForm);
});
