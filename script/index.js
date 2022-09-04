window.onload = () => {
  const elementsContainer = document.querySelector(".elements");
  const popupFullImage = document.querySelector("#popup-image");

  const toggleModal = (modal) => {
    modal.classList.toggle("popup_opened");
  };

  const createCard = (name, link) => {
    return `
      <article class="element">
        <div class="element__remove-button"></div>
        <img
          class="element__image"
          src=${link}
          alt=${name}
        />
        <div class="element__title-container">
          <h2 class="element__title">${name}</h2>
          <button class="element__like-button" type="button"></button>
        </div>
      </article>
    `;
  };

  const likeCard = (event) => {
    const currentLike = event.target;

    if (currentLike) {
      currentLike.classList.toggle("element__like-button_active");
    }
  };

  const deleteCard = (event) => {
    const currentCard = event.target.parentNode;

    if (currentCard) {
      currentCard.remove();
    }
  };

  const openImagePopup = (event) => {
    const currentCard = event.target.parentNode;
    const currentImageSrc = event.target.src;
    const currentTitle =
      currentCard.querySelector(".element__title").textContent;

    const popupImage = document.querySelector("#full-image");
    const popupCaption = document.querySelector(".popup__image-caption");

    popupImage.src = currentImageSrc;
    popupCaption.textContent = currentTitle;

    toggleModal(popupFullImage);
  };

  const setEventListenersOnCard = (card) => {
    const image = card.querySelector(".element__image");
    const trash = card.querySelector(".element__remove-button");
    const like = card.querySelector(".element__like-button");

    image.addEventListener("click", openImagePopup);
    trash.addEventListener("click", deleteCard);
    like.addEventListener("click", likeCard);
  };

  const profilePopup = () => {
    const editProfileForm = document.querySelector("#edit-profile-form");
    const editProfileClose = document.querySelector("#close-profile-popup");
    const editProfilePopup = document.querySelector("#edit-profile-popup");
    const editProfileButton = document.querySelector(".profile__edit-button");
    const editProfileName = document.querySelector(".profile__name");
    const editProfileRole = document.querySelector(".profile__description");
    const editProfileInputName = editProfileForm.querySelector(
      ".form__input_type_name"
    );
    const editProfileInputRole = editProfileForm.querySelector(
      ".form__input_type_role"
    );

    const setDefaultValuesEditProfileForm = () => {
      editProfileInputName.value = editProfileName.textContent;
      editProfileInputRole.value = editProfileRole.textContent;
    };

    const editFormSubmitHandler = (event) => {
      event.preventDefault();
      const formData = new FormData(editProfileForm);
      editProfileName.textContent = formData.get("name");
      editProfileRole.textContent = formData.get("description");
      toggleModal(editProfilePopup);
    };

    editProfileForm.addEventListener("submit", editFormSubmitHandler);
    editProfileButton.addEventListener("click", () => {
      setDefaultValuesEditProfileForm();
      toggleModal(editProfilePopup);
    });
    editProfileClose.addEventListener("click", () =>
      toggleModal(editProfilePopup)
    );
  };

  const addCardPopup = () => {
    const addCardForm = document.querySelector("#form-card-popup");
    const addCardClose = document.querySelector("#close-card-popup");
    const addCardPopup = document.querySelector("#add-card-popup");
    const addCardButton = document.querySelector(".profile__add-button");
    const addCardInputTitle = addCardForm.querySelector(
      ".form__input_type_title"
    );
    const addCardInputUrl = addCardForm.querySelector(".form__input_type_url");

    const resetAddCardForm = () => {
      addCardInputTitle.value = "";
      addCardInputUrl.value = "";
    };

    const addCardFormSubmitHandler = (event) => {
      event.preventDefault();
      const formData = new FormData(addCardForm);

      elementsContainer.insertAdjacentHTML(
        "afterbegin",
        createCard(formData.get("title"), formData.get("link"))
      );

      setEventListenersOnCard(document.querySelector(".element"));
      toggleModal(addCardPopup);
      resetAddCardForm();
    };

    addCardForm.addEventListener("submit", addCardFormSubmitHandler);
    addCardButton.addEventListener("click", () => toggleModal(addCardPopup));
    addCardClose.addEventListener("click", () => toggleModal(addCardPopup));
  };

  const imageFullPopup = () => {
    const closePopup = document.querySelector("#popup-image-close");
    closePopup.addEventListener("click", () => toggleModal(popupFullImage));
  };

  const renderAddCards = () => {
    const initialCards = [
      {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      },
      {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      },
      {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      },
      {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      },
      {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      },
      {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      },
    ];

    const cards = initialCards.map((card) => {
      return createCard(card.name, card.link);
    });

    cards.forEach((card) => {
      elementsContainer.insertAdjacentHTML("beforeend", card);
    });

    const newCards = document.querySelectorAll(".element");
    newCards.forEach((card) => setEventListenersOnCard(card));
  };

  renderAddCards();
  profilePopup();
  imageFullPopup();
  addCardPopup();
};
