window.addEventListener("load", function () {
 const iconMore = document.querySelector(".icon-more");
 const mbMenu = document.querySelector(".mb-menu");
 const mbInner = document.querySelector(".mb-inner");

 // 사용자 연속 버튼 클릭 막기
 // isClick이 true이면 클릭 가능
 // isClick이 false이면 클릭 불가능
 let isClick = true;

 iconMore.addEventListener("click", function (e) {
  // a태그 기본동작 방지
  e.preventDefault();

  if (isClick === false) {
   return;
  }
  isClick = false;

  // 모바일 메뉴 보이기, 숨기기 적용
  const isOpen = mbMenu.classList.contains("active");

  if (isOpen) {
   // 메뉴가 줄어들고
   mbInner.classList.remove("active");
   iconMore.classList.remove("active");

   // 배경이 사라진다
   setTimeout(() => {
    mbMenu.classList.remove("active");
    isClick = true;
   }, 500);
  } else {
   // 배경이 보이고
   mbMenu.classList.add("active");
   // 메뉴가 펼쳐짐
   mbInner.classList.add("active");
   // 아이콘 교체
   iconMore.classList.add("active");
   isClick = true;
  }
 });

 // 배경 클릭 시 메뉴 숨기기
 mbMenu.addEventListener("click", function (e) {
  // mbInner 클릭 시 이벤트가 버블링 되어 배경 클릭 이벤트도 실행되는 것을 방지
  if (e.target === this) {
   mbInner.classList.remove("active");
   iconMore.classList.remove("active");
   setTimeout(() => {
    mbMenu.classList.remove("active");
    isClick = true;
   }, 500);
  }
 });

 // mbInner 클릭 시 이벤트 버블링 방지
 //  mbInner.addEventListener("click", function (e) {
 //   e.stopPropagation();
 //  });

 // 큰 해상도에서는 모바일 메뉴가 안보임
 // 큰 해상도에서는 active 클래스가 제거되어야 함
 // 작은 행상도에서는 정상적으로 보이거나 숨겨져야 함
 // 그래서 해상도를 체크해서 기능을 실행하도록 하자
 window.addEventListener("resize", function () {
  //   console.log(innerWidth);

  if (innerWidth > 1024) {
   mbMenu.classList.remove("active");
   mbInner.classList.remove("active");
   iconMore.classList.remove("active");
  }
 });

 // 로고 Swiper 적용
 const swHeaderLogo = new Swiper(".sw-logo", {
  effect: "fade",
  speed: 500,
  autoplay: {
   delay: 300,
   disableOnInteraction: false,
  },
 });

 // 마우스오버가 되면 play 하기
 const swLogoTag = document.querySelector(".logo");

 swLogoTag.addEventListener("mouseover", function () {
  //   console.log("over");
  swHeaderLogo.autoplay.start();
 });
 swLogoTag.addEventListener("mouseout", function () {
  swHeaderLogo.autoplay.stop();
  swHeaderLogo.slideTo(0);
 });
 // 처음에는 멈춰둔다.
 swHeaderLogo.autoplay.stop();
});
