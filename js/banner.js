window.addEventListener("load", function () {
 // 1. banner.json 호출하고 성공하면
 fetch("api/banner.json")
  .then((response) => {
   return response.json();
  })
  .then((data) => {
   const result = makeHtmlTag(data);
   return result;
  })
  .then((result) => {
   // Swiper 만들기
   makeSwiper();
  })
  .catch((error) => {
   console.log(error);
  });

 // 2. html 태그 생성 함수
 const makeHtmlTag = (data) => {
  // html 태그 글자
  let tag = "";
  // 이미지 경로
  const path = "./images";
  data.forEach((item) => {
   const tempTag = `
    <div class="swiper-slide">
        <div class="banner-content" data-id="${item.id}" style="background: url('${path}/${item.imgpath}') no-repeat center;
        background-size: cover;">
            <a href="${item.link}"></a>
        </div>
    </div>`;

   tag += tempTag;
  });

  // html 배치
  const swBannerElement = document.querySelector(".swBanner .swiper-wrapper");
  swBannerElement.innerHTML = tag;
  return swBannerElement;
 };

 // 3. Swiper 생성 함수
 const makeSwiper = () => {
  // 메인 배너 슬라이드
  const swBanner = new Swiper(".swBanner", {
   speed: 1000,
   loop: true,
   autoplay: {
    delay: 2500,
    disableOnInteraction: false,
   },
   pagination: {
    el: ".swiper-pagination",
    clickable: true,
   },
  });
  // 마우스오버가 되면 stop
  const swBannerTag = document.querySelector(".swBanner");
  swBannerTag.addEventListener("mouseover", function () {
   swBanner.autoplay.stop();
  });
  // 마우스아웃 되면 play
  swBannerTag.addEventListener("mouseout", function () {
   swBanner.autoplay.start();
  });
 };
});
