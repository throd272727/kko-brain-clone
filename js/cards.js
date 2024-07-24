window.addEventListener("load", function () {
  // 초기 로딩 시 초깃값
  // 화면의 너비
  let windowWidth = window.innerWidth;
  // Swiper 인스턴스 객체
  let swCards = null;

  // 1. cards.json 호출하고 성공하면
  fetch("api/cards.json")
    .then((resopnse) => {
      return resopnse.json();
    })
    .then((data) => {
      const result = makeHtmlTag(data);
      return result;
    })
    .then((result) => {
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
      // console.log(item);
      const tempTag = `
      <div class="swiper-slide">
           <a href="${item.link}" data-id="${item.id}" class="main-card"
           style="background: url('${path}/${item.imgpath}') no-repeat center;
           background-size: cover;">
               <p class="main-card-cate">
                 ${item.cardname}
                 <span>${item.cardno}</span>
               </p>
           </a>
       </div>`;

      tag += tempTag;
    });

    // html 배치
    const swCardsElement = document.querySelector(".swCards .swiper-wrapper");
    swCardsElement.innerHTML = tag;
    return swCardsElement;
  };

  //   3. Swiper 생성 함수
  const makeSwiper = () => {
    if (windowWidth <= 1024 && swCards === null) {
      swCards = new Swiper(".swCards", {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 15,
      });
    }
    // 화면 리사이징
    window.addEventListener("resize", function () {
      windowWidth = window.innerWidth;
      // console.log(windowWidth);

      if (windowWidth >= 1024) {
        // swiper 제거
        if (swCards !== null) {
          swCards.destroy();
        }
        swCards = null;
      } else {
        // swiper 객체 인스턴스 생성
        if (swCards === null) {
          swCards = new Swiper(".swCards", {
            loop: true,
            slidesPerView: 4,
            spaceBetween: 15,
          });
        }
      }
    });
  };
});
