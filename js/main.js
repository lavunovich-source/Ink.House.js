document.querySelectorAll('.catalog__input').forEach((input) => {
  input.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    
    document.querySelectorAll('.cell').forEach((card) => {
      if (selectedCategory === 'All' || card.dataset.category === selectedCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});




const inner = document.querySelector('.homework');
const cellsContainer = inner.querySelector('.add__cells-container');
const addButton = inner.querySelector('.input__btn_action_add');
const resetButton = inner.querySelector('.input__btn_action_reset');
const noCellsElement = inner.querySelector('.add__no-cells');

function renderHasCells() {
  resetButton.removeAttribute('disabled');
  resetButton.classList.remove('input__btn_disabled');
  noCellsElement.classList.add('add__no-cells_hidden');
}

function renderNoCells() {
  resetButton.setAttribute('disabled', true);
  resetButton.classList.add('input__btn_disabled');
  noCellsElement.classList.remove('add__no-cells_hidden');
}

function addCell(imgValue, authorValue, nameValue, fabricValue, costValue) {
  const cellTemplate = document.querySelector('#cell-template').content;
  const cellElement = cellTemplate.querySelector('.cell').cloneNode(true);

  cellElement.querySelector('.cell__img').src = imgValue;
  cellElement.querySelector('.cell__author').textContent = authorValue;
  cellElement.querySelector('.cell__name').textContent = nameValue;
  cellElement.querySelector('.cell__fabric').textContent = fabricValue;
  cellElement.querySelector('.cell__cost').textContent = costValue;

  cellElement.querySelector('.cell__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cell__like_active');
  });

  cellsContainer.append(cellElement); 
}

addButton.addEventListener('click', function () {
  const imgInput = document.querySelector('.input__text_type_img');
  const author = document.querySelector('.input__text_type_author');
  const name = document.querySelector('.input__text_type_name');
  const fabric = document.querySelector('.input__text_type_fabric');
  const cost = document.querySelector('.input__text_type_cost');

  const file = imgInput.files[0];
  const imgURL = file ? URL.createObjectURL(file) : '';

  addCell(imgURL, author.value, name.value, fabric.value, cost.value);
  renderHasCells();

  author.value = '';
  name.value = '';
  fabric.value = '';
  cost.value = '';
});

resetButton.addEventListener('click', function () {
  const cells = document.querySelectorAll('.template__cell')

  for (let i = 0; i < cells.length; i++) {
    cells[i].remove();
  }

  renderNoCells();
});

document.querySelector('.input__file').addEventListener('change', function() {
  const fileName = this.files[0].name;
  document.querySelector('.input__file-label').innerText = fileName;
});

document.body.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('cell__cross')) {
    const cell = evt.target.closest('.template__cell');
    if (cell) {
      cell.remove();
    }
  }
});

