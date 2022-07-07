// const { format } = require("morgan")

import { CustomInput, renderComponent, getRandomIntInclusive } from "./util.js";

const activePhoneForm = (form, certificationReceiverBtn, nextNavigation) => {
  const MAX = 10000;
  const MIN = 1000;
  let PhoneInputComponent;
  let CertificationInputComponent;

  const isAllInputsValid = () => {
    const inputs = [PhoneInputComponent, CertificationInputComponent];

    return inputs.every((input) => {
      console.log(input);
      if (!input) return false;
      return input.getIsValid();
    });
  };
  // 각 input마다 validate과 formatting을 객체로 분리
  const inputValidateMethods = {
    phone: {
      format: (value) =>
        value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, ""),

      validate: (value) => {
        const phoneRegex = /^(\d{3})-(\d{4})-(\d{4})$/g;
        return phoneRegex.test(value);
      },

      onChange: (isValid) => {
        // if (!certificationReceiverBtn) return;
        if (certificationReceiverBtn) {
          console.log("btn", isValid);
          certificationReceiverBtn.classList.toggle("active", isValid);
        }
        nextNavigation.disabled = !isAllInputsValid();
      },
    },

    certification: {
      validate: (value) => {
        const numberRegex = /^[0-9]{4}$/;
        return numberRegex.test(value);
      },
      onChange: (value) => {
        nextNavigation.disabled = !isAllInputsValid();
      },
      format: (value) => value.replace(/[^0-9]/g, ""),
    },
  };

  const certificationInnerHTML = `    
  <div class="input-controller" data-input-id="certification"> <label> <div>인증번호</div><input type="text" pattern="[0-9]+" name="certification" maxlength="4" id="certification"></label><div class="check-icon"></div><div class="x-icon"></div></div>
  `;
  const resendInnerHTML = `<div class="resend-container">      <button class="resend">인증번호 다시받기</button></div>`;

  // component
  PhoneInputComponent = CustomInput("phone", {
    ...inputValidateMethods.phone,
  });

  const giveCertificationNumber = () => {
    if (!CertificationInputComponent) return;
    setTimeout(() => {
      const fourDigitString = String(getRandomIntInclusive(MIN, MAX));
      CertificationInputComponent.setValue(fourDigitString);
    }, 2000);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!PhoneInputComponent.getIsValid()) return;

    certificationReceiverBtn.remove();
    renderComponent(certificationInnerHTML, form);
    const resendContainer = renderComponent(
      resendInnerHTML,
      document.querySelector(".wrapper")
    );

    CertificationInputComponent = CustomInput("certification", {
      ...inputValidateMethods.certification,
    });

    giveCertificationNumber();

    resendContainer.querySelector("button").addEventListener("click", () => {
      giveCertificationNumber();
    });

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
  const certificationReceiver = document.querySelector(
    ".certification-receiver"
  );
  activePhoneForm(form, certificationReceiver, nextNavigation);
});
