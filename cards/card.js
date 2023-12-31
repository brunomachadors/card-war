const cards = document.querySelectorAll('.card');

cards.forEach(addCardElements);

export function addCardElements(card) {
  const value = card.dataset.value;

  const valueAsNumber = parseInt(value);
  if (isNaN(valueAsNumber)) {
    card.append(createPip());
  } else {
    for (let i = 0; i < valueAsNumber; i++) {
      card.append(createPip());
    }
  }

  card.append(createCornerNumber('top', value));
  card.append(createCornerNumber('bottom', value));
  return card;
}

function createCornerNumber(position, value) {
  const corner = document.createElement('div');
  corner.textContent = value;
  corner.classList.add('corner-number');
  corner.classList.add(position);
  return corner;
}

function createPip() {
  const pip = document.createElement('div');
  pip.classList.add('pip');
  return pip;
}
