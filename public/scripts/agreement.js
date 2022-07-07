document.querySelector("form").elements[0].addEventListener("click", (e) => {
  console.log(e.target);
});

const form = document.querySelector("form");
console.log(form);

const ab = [
  { name: "배달의민족 이용약관 동의", required: true ,isDescription:true},
  { name: "전자금융거래 이용약관 동의", required: true ,isDescription:true},
  { name: "개인정보 수집이용 동의", required: true,isDescription:true },
  { name: "개인정보 제3자 제공 동의 (선택)", required: false ,isDescription:true},
  { name: "마케팅 정보 메일, SMS 수신동의 (선택)", required: false ,isDescription:false},
];
const a = [];
