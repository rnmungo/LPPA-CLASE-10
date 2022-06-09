const NUMBER_REGEXP = /[0-9\/]+/;
const KEYCODES = Object.freeze({
  BACKSPACE: 8,
  TAB: 9,
  MAYUS: 16,
  ARROW_RIGHT: 37,
  ARROW_LEFT: 39,
  DELETE: 46,
});

const validateHeight = height => {
  if (height === '') throw new Error('Debe ingresar la altura');
  if (height === '0') throw new Error('La altura no puede ser cero');
  const number = Number(height);
  if (number > 272) throw new Error('La altura no puede ser mayor a 272cm');
  if (number < 10) throw new Error('La altura no puede ser menor a 10cm');
};

const validateWeight = weight => {
  if (weight === '') throw new Error('Debe ingresar el peso');
  if (weight === '0') throw new Error('El peso no puede ser cero');
  const number = Number(weight);
  if (number > 544) throw new Error('El peso no puede ser mayor a 544kg');
  if (number < 2) throw new Error('El peso no puede ser menor a 2kg');
};

const getRow = (composition, imc) => `
  <tr class="bg-white">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          ${composition}
      </th>
      <td class="px-6 py-4">
          ${imc}
      </td>
  </tr>
`;

const getRowByIMC = imc => {
  if (imc < 18.5) {
    return getRow('Peso inferior al normal', 'Menos de 18.5');
  } else if (imc >= 18.5 && imc <= 24.9) {
    return getRow('Normal', '18.5 - 24.9');
  } else if (imc >= 25 && imc <= 29.9) {
    return getRow('Peso superior al normal', '25.0 - 29.9');
  } else {
    return getRow('Obesidad', 'Más de 30.0');
  }
};

const hideTable = () => {
  const imcContent = document.getElementById('imcContent');
  imcContent.classList.add('hidden');
};

const showTable = () => {
  const imcContent = document.getElementById('imcContent');
  console.log(imcContent);
  imcContent.classList.remove('hidden');
  console.log('visualiza')
};

const bindTable = imc => {
  const tableContent = document.getElementById('tableContent');
  const row = getRowByIMC(imc);
  tableContent.innerHTML = row;
}

const onChangeHandler = event => {
  if (!Object.values(KEYCODES).includes(event.keyCode)) {
    if (!NUMBER_REGEXP.test(event.key)) {
      event.preventDefault();
      alert('Debe ingresar solo números');
    }
  }
};

const onClickHandler = event => {
  event.stopPropagation();
  event.preventDefault();
  const height = document.getElementById('tbHeight').value;
  const weight = document.getElementById('tbWeight').value;
  const tbResult = document.getElementById('tbResult');
  tbResult.value = '';
  hideTable();
  try {
    validateHeight(height);
    validateWeight(weight);
    const heightCm = Number(height) / 100;
    const imc = Number(weight) / (heightCm ** 2);
    const imcRounded = Math.round((imc + Number.EPSILON) * 100) / 100;
    tbResult.value = imcRounded;
    bindTable(imcRounded);
    showTable();
  } catch (e) {
    alert(e.message);
  }
};

const onLoadHandler = () => {
  const tbHeight = document.getElementById('tbHeight');
  const tbWeight = document.getElementById('tbWeight');
  const btnCalculate = document.getElementById('btnCalculate');
  tbHeight.addEventListener('keydown', onChangeHandler);
  tbWeight.addEventListener('keydown', onChangeHandler);
  btnCalculate.addEventListener('click', onClickHandler);
};

window.addEventListener('load', onLoadHandler);
