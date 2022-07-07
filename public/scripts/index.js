const getUser = async () => {
  const response = await fetch("/api/user");
  console.log(response);
  return await response.json();
};

window.addEventListener("load", async () => {
  const user = await getUser();
  if (!user.nickname) return;
  const element = document.querySelector(".login-navigation-container");
  element.innerHTML = `<div class="flex-between items-center content-padding text-gray h-full"><img class="h-full" src="/images/profile.png" alt="profile" srcset=""><div class="text-lg"> 안녕하세요 ${user.nickname}님</div><div class="flex-center"><span class="text-lg"> &gt;</span></div></div>`;
});
