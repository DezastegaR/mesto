window.onload = () => {
  const page = document.querySelector(".page");
  const popup = document.querySelector(".popup");
  const popupClose = document.querySelector(".popup__close-button");

  const profileName = document.querySelector(".profile__name");
  const profileRole = document.querySelector(".profile__description");
  const profileEditButton = document.querySelector(".profile__edit-button");

  const form = document.querySelector(".form");
  const inputName = form.querySelector(".form__input_type_name");
  const inputRole = form.querySelector(".form__input_type_role");

  const setDefaultValuesForm = () => {
    inputName.value = profileName.textContent;
    inputRole.value = profileRole.textContent;
  };

  const handleOpenModal = () => {
    setDefaultValuesForm();
    popup.classList.add("popup_opened");
  };

  const handleCloseModal = () => {
    popup.classList.remove("popup_opened");
  };

  const toggleModal = () => {
    const isOpen = popup.classList.contains("popup_opened");

    if (isOpen) {
      handleCloseModal();
    } else {
      handleOpenModal();
    }
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileRole.textContent = inputRole.value;
    toggleModal();
  };

  form.addEventListener("submit", formSubmitHandler);
  profileEditButton.addEventListener("click", toggleModal);
  popupClose.addEventListener("click", toggleModal);
  // popup.addEventListener("click", (evt) => {
  //   evt.stopPropagation();
  //   const closest = evt.target.closest(".popup__container");
    
  //   if (!closest) {
  //     handleCloseModal();
  //   }
  // });
};
