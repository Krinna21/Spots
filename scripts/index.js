// Card Elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardEditButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Form Elements
const editModal = document.querySelector("#edit-modal");
const cardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");

const editForm = editModal.querySelector(".modal__form");
const cardForm = cardModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");

const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// Open Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

// Close Modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

// Close Modal by Escape Key
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

// Close Modal by Clicking Overlay
function closeModalByOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

// Handle Edit Form Submit
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModal.querySelector(
    "#profile-name-input"
  ).value;
  profileDescription.textContent = editModal.querySelector(
    "#profile-description-input"
  ).value;
  closeModal(editModal);
}

// Handle Add Card Submit
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = getCardElement({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });

  cardsList.prepend(newCard);
  closeModal(cardModal);
  cardForm.reset();
  resetForm(cardForm);
}

// Create Card Element
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardImageEl.addEventListener("click", () => {
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    openModal(previewModal);
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

// Populate Initial Cards
initialCards.forEach((item) => {
  const cardEl = getCardElement(item);
  cardsList.append(cardEl);
});

// Event Listeners
profileEditButton.addEventListener("click", () => {
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
  resetForm(editForm);
});

cardEditButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
  resetForm(cardForm);
});

editForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Add Click Listeners for Modals
editModal.addEventListener("mousedown", closeModalByOverlayClick);
cardModal.addEventListener("mousedown", closeModalByOverlayClick);
previewModal.addEventListener("mousedown", closeModalByOverlayClick);

// Initialize Validation
enableValidation();
