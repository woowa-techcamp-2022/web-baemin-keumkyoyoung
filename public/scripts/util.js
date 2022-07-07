export function CustomInput(inputID, { format, validate, onChange }) {
  const inputControl = document.querySelector(
    '[data-input-id="' + inputID + '"]'
  );

  const inputElement = inputControl.querySelector("input");
  const checkIcon = inputControl.querySelector(".check-icon");
  const xIcon = inputControl.querySelector(".x-icon");
  let isValid = false;

  const toggleActiveIcon = (icon, isValid) => {
    icon.classList.toggle("active", isValid);
  };

  const handleInputValue = (value) => {
    const formattedValue = format ? format(value) : value;
    inputElement.value = formattedValue;
    isValid = validate(formattedValue);
    onChange && onChange(isValid);
    toggleActiveIcon(checkIcon, isValid);
    toggleActiveIcon(xIcon, inputElement.value !== 0);
  };

  xIcon.addEventListener("click", () => {
    console.log(inputElement.value);
    inputElement.value = "";
    toggleActiveIcon(xIcon, false);
    toggleActiveIcon(checkIcon, false);
    isValid = false;
    onChange && onChange(isValid);
  });

  inputElement.addEventListener("input", ({ target }) => {
    handleInputValue(target.value);
  });

  const state = {
    getIsValid: () => {
      console.log("hihi");
      console.log({ isValid });
      return isValid;
    },
    setValue: (value) => {
      handleInputValue(value);
    },
  };

  state.getIsValid();
  return state;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const renderComponent = (htmlSrc, target) => {
  const component = document.createElement("div");
  component.innerHTML = htmlSrc;
  target.append(component);
  return component;
};

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
