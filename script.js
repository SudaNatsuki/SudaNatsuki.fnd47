"use strict";

const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");
const titleInput = document.getElementById("titleInput");
const uploadModal = document.getElementById("uploadModal");
const fileList = document.getElementById("fileList");
const favoriteButton = document.getElementById("favoriteButton");
const likeBadge = document.getElementById("likeBadge");

const categoryButtons = document.querySelectorAll(".category-button");
const tabButtons = document.querySelectorAll(".tab-button");
const uploadSlider = document.getElementById("uploadSlider");

let selectedCategory = "animal";
let showingFavorites = false;
let likeCount = 0;

function updateLikeBadge() {
  likeBadge.innerText = likeCount;

  if (likeCount > 0) {
    favoriteButton.firstChild.textContent = "❤️";
  } else {
    favoriteButton.firstChild.textContent = "🤍";
  }
}

// モーダルを開く
openModalButton.addEventListener("click", function () {
  uploadModal.classList.add("active");
});

// 閉じる
closeModalButton.addEventListener("click", function () {
  uploadModal.classList.remove("active");
});

// モーダル内のカテゴリーを選択
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    categoryButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    selectedCategory = button.dataset.category;
  });
});

// メイン画面のタブの切り替え
tabButtons.forEach(function (tab) {
  tab.addEventListener("click", function () {
    showingFavorites = false;

    tabButtons.forEach(function (button) {
      button.classList.remove("active");
    });

    tab.classList.add("active");

    const filter = tab.dataset.filter;
    const fileCards = document.querySelectorAll(".file-card");

    fileCards.forEach(function (card) {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// アップロード
uploadButton.addEventListener("click", function () {
  const title = titleInput.value;
  const file = fileInput.files[0];

  if (title === "" || file === undefined) {
    alert("タイトルと画像を入力してください");
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  const fileCard = document.createElement("div");
  fileCard.classList.add("file-card");
  fileCard.dataset.category = selectedCategory;
  fileCard.dataset.liked = "false";

  const img = document.createElement("img");
  img.src = imageUrl;

  const cardBottom = document.createElement("div");
  cardBottom.classList.add("card-bottom");

  const fileTitle = document.createElement("p");
  fileTitle.classList.add("file-title");
  fileTitle.innerText = title;

  const likeButton = document.createElement("button");
  likeButton.classList.add("card-like-button");
  likeButton.innerText = "🤍";

  likeButton.addEventListener("click", function () {
    if (fileCard.dataset.liked === "false") {
      fileCard.dataset.liked = "true";
      likeButton.innerText = "❤️";
      likeCount++;
    } else {
      fileCard.dataset.liked = "false";
      likeButton.innerText = "🤍";
      likeCount--;
    }

    updateLikeBadge();
  });

  cardBottom.appendChild(fileTitle);
  cardBottom.appendChild(likeButton);

  fileCard.appendChild(img);
  fileCard.appendChild(cardBottom);
  fileList.appendChild(fileCard);

  const sliderItem = document.createElement("div");
  sliderItem.classList.add("slider-item");

  const sliderImg = document.createElement("img");
  sliderImg.src = imageUrl;

  sliderItem.appendChild(sliderImg);
  uploadSlider.appendChild(sliderItem);

  titleInput.value = "";
  fileInput.value = "";

  uploadModal.classList.remove("active");
});

// ヘッダーのハートをクリックしたら、いいねした画像だけ表示
favoriteButton.addEventListener("click", function () {
  showingFavorites = !showingFavorites;

  const fileCards = document.querySelectorAll(".file-card");

  fileCards.forEach(function (card) {
    if (showingFavorites) {
      if (card.dataset.liked === "true") {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    } else {
      card.style.display = "block";
    }
  });
});
