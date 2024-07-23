window.addEventListener("load", function () {
 // 1. news.json 호출하고 성공하면
 fetch("api/crews.json")
  .then((response) => {
   return response.json();
  })
  .then((data) => {
   const result = makeHtmlTag(data);
   return result;
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
    <a href="${item.link}" class="content-list-link" data-id="${item.id}">
        <div class="content-list-img">
           <div class="content-list-thumb" style="background: url('${path}/${item.imgpath}') no-repeat center;
            background-size: cover;"></div>
        </div>
        <div class="content-list-txt">
           <span class="content-list-cate" style="color: ${item.txtcolor};">
            <img src="${path}/icon/${item.icon}" alt="${item.category}" />
            ${item.category}
           </span>
           <h4 class="content-list-title">${item.title}</h4>
           <span class="content-list-date">${item.day}</span>
        </div>
    </a>`;

   tag += tempTag;
  });

  // html 배치
  const crewElement = document.querySelector(".crew-list");
  crewElement.innerHTML = tag;
  return crewElement;
 };
});
