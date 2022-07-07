import { CustomInput, renderComponent, formatDate } from "./util.js";

const passwordValidate = (value) => {
  // 10자 이상, 대문자,소문자,숫자, 특수문자중 2종류 조합
  // 같은 숫자 혹은 연속된 숫자를 3개 이상 입력할 수 없음.
  // (예. 111,123,321 불가능)
  const isOverTenLength = (value) => {
    value.length > 10;
  };
  const smallCharRegex = /[a-z]/g;
  const CapitalCharRegex = /[A-Z]/g;
  const digitRegex = /[0-9]/g;
  const specialCharRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

  const validator = [
    isOverTenLength,
    smallCharRegex,
    CapitalCharRegex,
    digitRegex,
    specialCharRegex,
  ];

  const result = validator.filter((validate) => {
    if (validate instanceof RegExp) {
      return value.match(validate);
    }
    return validate(value);
  });

  if (result.length < 2) {
    return false;
  }

  for (let i = 0; i < value.length; ++i) {
    if (
      value.charCodeAt(i) === value.charCodeAt(i + 1) - 1 &&
      value.charCodeAt(i) === value.charCodeAt(i + 2) - 2
    ) {
      return false;
    }
    return true;
  }
};

const birthValidate = (value) => {
  let yourDate = new Date();

  yourDate.toISOString();
};

const activeUserForm = (form, certificationReceiverBtn, nextNavigation) => {
  let isBtnClick = false;
  let emailInputComponent;
  let passwordInputComponent;
  let nicknameInputComponent;
  let birthInputComponent;

  const isAllInputsValid = () => {
    const inputs = [
      emailInputComponent,
      passwordInputComponent,
      nicknameInputComponent,
      birthInputComponent,
    ];

    return inputs.every((input) => {
      if (!input) return false;
      return input.getIsValid();
    });
  };
  // 각 input마다 validate과 formatting을 객체로 분리
  const inputValidateMethods = {
    email: {
      validate: (value) => isBtnClick,
      onChange: (isValid) => {
        // if (!certificationReceiverBtn) return;
        if (certificationReceiverBtn) {
          certificationReceiverBtn.classList.toggle("active", isValid);
        }
        nextNavigation.disabled = !isAllInputsValid();
      },
    },

    password: {
      validate: (value) => {
        return passwordValidate(value);
      },
      onChange: (value) => {
        nextNavigation.disabled = !isAllInputsValid();
      },
    },
    nickname: {
      onChange: (value) => {
        nextNavigation.disabled = !isAllInputsValid();
      },
    },
    birth: {
      format: (value) =>
        value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1.$2.$3")
          .replace(/(\.{1,2})$/g, ""),
      validate: (value) => {
        const birthRegex = /^(\d{4})\.(\d{2})\.(\d{2})$/g;
        const yyyymmdd = value.replace(/\./g, "");
        console.log(yyyymmdd);
        const y = yyyymmdd.substr(0, 4);
        const m = yyyymmdd.substr(4, 2) - 1;
        const d = yyyymmdd.substr(6, 2);
        const newDate = new Date(y, m, d);
        console.log(formatDate(newDate));
        return value.match(birthRegex) && formatDate(newDate) === yyyymmdd;
      },

      onChange: () => {
        nextNavigation.disabled = !isAllInputsValid();
      },
    },
  };

  const renderHTML = `
<div class="input-controller" data-input-id="nickname"> <label> <div>닉네임</div><input id="nickname" type="text" name="nickname"></label><div class="check-icon"></div><div class="x-icon"></div></div>
<div class="input-controller has-error-message" data-input-id="password"> <label> <div>비밀번호</div><input id="password" type="password" name="password" ></label><div class="check-icon"></div><div class="x-icon"></div></div>
<p class="error-msg .js-id-empty-msg">10자 이상, 영어 대문자, 소문자, 숫자, 특수문자, 중 2종류를 조합해야합니다.</p>
<div class="input-controller has-error-message" data-input-id="birth"> <label> <div>생년월일</div><input id="birth" type="text" maxlength="10" name="birth" pattern="[0-9]*"></label><div class="check-icon"></div><div class="x-icon"></div></div>
<p class="error-msg .js-id-empty-msg">생년월일을 올바르게 적어주세요.</p>

`;

  // component
  emailInputComponent = CustomInput("email", {
    ...inputValidateMethods.email,
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isBtnClick || emailInputComponent.getInputValue() === "") return;
    isBtnClick = true;
    emailInputComponent.revalidate();
    if (!emailInputComponent.getIsValid()) return;
    certificationReceiverBtn.classList.toggle("active", true);

    // render
    const renderedComponent = renderComponent(renderHTML, form);
    console.log(renderedComponent);
    // create Component
    passwordInputComponent = CustomInput("password", {
      ...inputValidateMethods.password,
    });
    nicknameInputComponent = CustomInput("nickname", {
      ...inputValidateMethods.nickname,
    });
    birthInputComponent = CustomInput("birth", {
      ...inputValidateMethods.birth,
    });

    // request and server로 전송
    nextNavigation.addEventListener("click", () => {
      if (isAllInputsValid()) {
        window.location.replace("/sign_up/user");
      }
    });
  });
};

window.addEventListener("load", () => {
  const form = document.querySelector("form");
  const nextNavigation = document.querySelector(".next-btn");
  const duplicatedCertificationBtn = document.querySelector(".duplicate-btn");
  activeUserForm(form, duplicatedCertificationBtn, nextNavigation);
});
