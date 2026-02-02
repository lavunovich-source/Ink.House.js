


// Выбираем все кнопки для открытия попапов и сами попапы
const dialogOpeners = document.querySelectorAll('.openDialogBtn');
const dialogs = document.querySelectorAll('dialog');

// Функция для открытия попапа и блокировки прокрутки
function openModal(dialog) {
    dialog.showModal();
    document.body.classList.add('scroll-lock');
}

// Функция для закрытия попапа и разблокировки прокрутки
function closeModal(dialog) {
    dialog.close();
    document.body.classList.remove('scroll-lock');
}

// Функция для закрытия попапа по бэкдропу
function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog
  if (isClickedOnBackDrop) {
    closeModal(dialog);
  }
}


// Обработчик событий для каждой кнопки открытия попапа
dialogOpeners.forEach(opener => {
    opener.addEventListener('click', () => {
        const dialogId = opener.getAttribute('aria-controls');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            openModal(dialog);
        }
    });
});

      
// Обработчик событий для каждой кнопки закрытия попапа
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('closeDialogBtn')) {
        const dialog = event.target.closest('.dialog');
        if (dialog) {
            closeModal(dialog);
        }
    }
});

// Обработчик событий для закрытия попапа по бэкдропу
dialogs.forEach(dialog => {
    dialog.addEventListener('click', closeOnBackDropClick);
    });




////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////



const cellsContainer = document.querySelector('.add__cells-container');
const addButton = document.querySelector('.input__btn_action_add');

const formAdd = document.forms.add;
const img = formAdd.elements.img;
const author = formAdd.elements.author;
const pictureName = formAdd.elements.name;
const fabric = formAdd.elements.fabric;
const cost = formAdd.elements.cost;

function addCell(imgValue, authorValue, pictureNameValue, fabricValue, costValue) {
  const cellTemplate = document.querySelector('#cell-template').content;
  const cellElement = cellTemplate.querySelector('.cell').cloneNode(true);

  cellElement.querySelector('.cell__img').src = imgValue;
  cellElement.querySelector('.cell__author').textContent = authorValue;
  cellElement.querySelector('.cell__name').textContent = pictureNameValue;
  cellElement.querySelector('.cell__fabric').textContent = fabricValue;
  cellElement.querySelector('.cell__cost').textContent = costValue;

  cellsContainer.prepend(cellElement);
}


function setSubmitButtonState (isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute('disabled');
    addButton.classList.remove('input__btn_disabled');
  } else{

  addButton.setAttribute('disabled', true);
  addButton.classList.add('input__btn_disabled');
  }
};


formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCell(img.value, author.value, pictureName.value, fabric.value, cost.value);
  formAdd.reset();
  setSubmitButtonState(false);
});

formAdd.addEventListener('input', function(evt) {
  const isValid = img.value.length > 0 && author.value.length > 0 && pictureName.value.length > 0 && fabric.value.length > 0 && cost.value.length > 0;
  console.log(`Form valid: ${isValid}`);
  setSubmitButtonState(isValid);
});

// обработчик кнопки лайка
cellsContainer.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('cell__like')) {
  evt.target.classList.toggle('cell__like_active')};
})

// обработчик кнопки крестика
cellsContainer.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('cell__cross')) {
    evt.target.closest('.template__cell').remove()};
})






//////////////////////////////////////////////////////////////////////

const formEdit = document.forms.edit;
const nameInput = edit.elements.profileName;
const jobInput = edit.elements.job;

function handleFormSubmit() {
    document.querySelector('.homework__acc-author').textContent = nameInput.value;
    document.querySelector('.homework__acc-job').textContent = jobInput.value;
    formEdit.reset();
    setSubmitButtonState(false);
}


formEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (evt.submitter.classList.contains('input__btn_action_add')) {
        handleFormSubmit();
      }
});

formEdit.addEventListener('input', function(evt) {
  const isValid = nameInput.value.length > 0 && jobInput.value.length > 0;
  setSubmitButtonState(isValid) 
});


/////////////////////////////////////////////////////////////////////


const cards = [
  {
    imgValue: '../images/france/1.jpg',
    authorValue: 'Марсель Руссо',
    pictureNameValue: 'Охота Амура', 
    fabricValue: 'Холст, масло (50х80)',
    costValue: '14 500 руб'
  },
  {
    imgValue: '../images/france/2.jpg',
    authorValue: 'Анри Селин',
    pictureNameValue: 'Дама с собачкой', 
    fabricValue: 'Акрил, бумага (50х80)',
    costValue: '16 500 руб'
  },
  {
    imgValue: '../images/france/3.jpg',
    authorValue: 'Франсуа Дюпон',
    pictureNameValue: 'Процедура', 
    fabricValue: 'Цветная литография (40х60)',
    costValue: '20 000 руб'
  },
  {
    imgValue: '../images/france/4.jpg',
    authorValue: 'Луи Детуш',
    pictureNameValue: 'Роза', 
    fabricValue: 'Бумага, акрил (50х80)',
    costValue: '12 000 руб'
  },
  {
    imgValue: '../images/france/5.jpg',
    authorValue: 'Франсуа Дюпон',
    pictureNameValue: 'Птичья трапеза', 
    fabricValue: 'Цветная литография (40х60)',
    costValue: '22 500 руб'
  },
  {
    imgValue: '../images/france/6.jpg',
    authorValue: 'Пьер Моранж',
    pictureNameValue: 'Пейзаж с рыбой', 
    fabricValue: 'Цветная литография (40х60)',
    costValue: '20 000 руб'
  }
];


cards.forEach(card => {
  addCell(card.imgValue, card.authorValue, card.pictureNameValue, card.fabricValue, card.costValue);
})

/////////////////////////////////////////


const dialogImg = document.getElementById('imgDialog');

  cellsContainer.addEventListener('click', function(evt) {
    if (!evt.target.classList.contains('cell__img')) {
        return;
    }
    const card = evt.target.closest('.template__cell');
    const img = card.querySelector('.cell__img').src;
    const name = card.querySelector('.cell__name').textContent;
    const dialogImage = document.querySelector('.dialog__img');
    dialogImage.src = img;
    document.querySelector('.dialog__img-name').textContent = name;
    openModal(dialogImg);
  });

