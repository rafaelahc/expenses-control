/* DOM */

/* Headers */
const cardHeader = document.querySelectorAll('.card-header');

/* List that will be add */
const containerListInflows= document.querySelector('#list-inflows');
const containerListFixed = document.querySelector('#list-fixed');
const containerListGrocery= document.querySelector('#list-grocery');
const containerListEntertainment= document.querySelector('#list-entertainment');


/* Inputs main total */
const totalDisplayInflows = document.querySelector('#total-display-inflows');
const totalDisplayFixed = document.querySelector('#total-display-fixed');
const totalDisplayGrocery = document.querySelector('#total-display-grocery');
const totalDisplayEntertainment = document.querySelector('#total-display-entertainment');

/* All Total Display */
const totalDisplay =  document.querySelectorAll('.total-display');

/* Balance Warnings */
const balanceWarningInflows = document.querySelector('#warning-inflows');
const balanceWarningFixed = document.querySelector('#warning-fixed');
const balanceWarningGrocery = document.querySelector('#warning-grocery');
const balanceWarningEntertainment = document.querySelector('#warning-entertainment');

/* Inputs buttons */
const btnAddListInflows = document.querySelector('#btn-add-inflows');
const btnAddListFixed = document.querySelector('#btn-add-fixed');
const btnAddListGrocery = document.querySelector('#btn-add-grocery');
const btnAddListEntertainment = document.querySelector('#btn-add-entertainment');


/* Inputs description and values from new list */
const inputListDescription = document.querySelector('.description');
const inputListValue = document.querySelector('.value');


/* Inputs that will receive new value to add to new list*/
const inputAddNewDescriptionInflows = document.querySelector('#input-add-description-inflows');
const inputAddNewValueInflows = document.querySelector('#input-add-value-inflows');
const inputAddNewDescriptionFixed = document.querySelector('#input-add-description-fixed');
const inputAddNewValueFixed = document.querySelector('#input-add-value-fixed');
const inputAddNewDescriptionGrocery = document.querySelector('#input-add-description-grocery');
const inputAddNewValueGrocery = document.querySelector('#input-add-value-grocery');
const inputAddNewDescriptionEntertainment = document.querySelector('#input-add-description-entertainment');
const inputAddNewValueEntertainment = document.querySelector('#input-add-value-entertainment');

/* values */
const INFLOW = "inflow";
const FIXED = "fixed";
const GROCERY = "grocery";
const ENTERTAINMENT = "entertainment";
const CURRENCY = "currency";
const PERCENTAGE = "percentage";

/* Arrays that will storage the new items */
let arrayInflowsItems = [];
let arrayFixedItems = [];
let arrayGroceryItems = [];
let arrayEntertainmentItems = [];

/* Grocery and Entertainment Percentage */
const inputGroceryPercentage = document.querySelector('#grocery-percentage-entered');
const inputEntertainmentPercentage = document.querySelector('#entertainment-percentage-entered');
const btnAddGroceryPercentage = document.querySelector('#grocery-percentage-btn');
const btnAddEntertainmentPercentage = document.querySelector('#entertainment-percentage-btn');

// /* Currency */
let allCurrencies = document.querySelectorAll('.currency-symbol');
const btnAddCurrencyType = document.querySelectorAll('.currency-type-btn');


const checkBtnFixed = document.querySelector('.btn-check');

let isChecked = false;

/* -------------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------------- */
/* FUNCTIONS */

/* TOTAL DISPLAY DYNAMIC INPUT SIZE */
// const InputDynamicSize = () => {
//     totalDisplay.setAttribute('size', totalDisplay.value.length -1);
// }

// document.querySelectorAll('.total-display').addEventListener('input',InputDynamicSize);

/* EXPAND CONTENT WHEN BEING ON DISPLAY UNTIL 768PX */
cardHeader.forEach(expandContent => {
    expandContent.addEventListener('click', function () {
        expandContent.classList.toggle('open');
        const icon = expandContent.querySelector('.fa-solid');
        if (expandContent.classList.contains('open')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    })
})

/* Currency area */
const spanCurrencyInflows = document.querySelector('#total-currency-inflows');
const spanCurrencyFixed = document.querySelector('#total-currency-fixed');
const spanCurrencyGrocery = document.querySelector('#total-currency-grocery');
const spanCurrencyEntertainment = document.querySelector('#total-currency-entertainment');


/* GET ITEMS FROM LOCAL STORAGE CURRENCY */
const totalCurrency = localStorage.getItem('totalCurrency'); //Recuperando o valor do local Storage

// Verifique se o valor existe no localStorage antes de atualizar o elemento HTML
if (totalCurrency) {
    spanCurrencyInflows.innerHTML = totalCurrency
    spanCurrencyFixed.innerHTML = totalCurrency;
    spanCurrencyGrocery.innerHTML = totalCurrency;
    spanCurrencyEntertainment.innerHTML = totalCurrency;

}

/* GetCurrency from localStorage */
const currencyStorage = localStorage.getItem('totalCurrency') || "€";

const defaultCurrency = () => {
    allCurrencies = document.querySelectorAll('.currency-symbol'); //span

    if (currencyStorage === '€') {
        allCurrencies.forEach(symbol => {
            symbol.innerHTML = currencyStorage;
        })
    }
};


const updateCurrency = () => {
    btnAddCurrencyType.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remover a classe 'active' de todos os botões
            btnAddCurrencyType.forEach((btn) => {
                btn.classList.remove('active');
            });
            // Adicionar a classe 'active' apenas ao botão clicado
            btn.classList.add('active');

            let currencySymbol = "";
            switch (btn.id) {
                case "eur":
                    currencySymbol = "€";
                    break;
                case "brl":
                    currencySymbol = "R$";
                    break;
                case "gbp":
                    currencySymbol = "£";
                    break;
                case "usd":
                    currencySymbol = "$";
                    break;
            }

            // Atualizar símbolos de moeda nos elementos HTML
            allCurrencies.forEach((symbol) => {
                symbol.innerHTML = currencySymbol;
            });

            // Atualizar símbolos de moeda nos inputs de valores
            document.querySelectorAll('.currency-symbol').forEach((input) => {
                input.innerHTML = currencySymbol;
            });

            // Atualizar total de moeda no localStorage
            localStorage.setItem('totalCurrency', currencySymbol);
        });
    });
};



/* Create a new list with values received on inputs */
const containerMap = {
    inflow: containerListInflows,
    fixed: containerListFixed,
    grocery: containerListGrocery,
    entertainment: containerListEntertainment
};

const createNewList = (context) => {
    const arrayMap = {
        inflow: arrayInflowsItems,
        fixed: arrayFixedItems,
        grocery: arrayGroceryItems,
        entertainment: arrayEntertainmentItems
    }


    const container = containerMap[context];
    const itemsArray = arrayMap[context];


    container.innerHTML = '';

    itemsArray.forEach(list => {
        let newListItems = document.createElement('div');
        newListItems.classList.add('card-list-items');

        switch (context) {
            case INFLOW:
                newListItems.innerHTML = `
                    <input type="text" class="description" value=${list.desc} readonly>
                    <span class="currency-symbol">${currencyStorage}</span>
                    <input type="text" class="value" value=${list.value} readonly>
                    <div class="btn-group">
                        <button onclick="editItem('${list.desc}', '${list.value}', '${INFLOW}')" class="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                        <button onclick="deleteItem('${itemsArray.indexOf(list)}', '${INFLOW}')" class="btn-delete"><i class="fa-solid fa-trash"></i></button> 
                    </div>
                `;
                //defaultCurrency(); 
                setStorage(INFLOW);    
                updateTotalDisplay(INFLOW);                 
                break;
            case FIXED:
                newListItems.innerHTML = `
                    <button class="btn-check"><i class="fa-regular fa-circle"></i></button>
                    <input type="text" class="description" value=${list.desc} readonly>
                    <span class="currency-symbol">${currencyStorage}</span>
                    <input type="text" class="value" value=${list.value} readonly>
                    <div class="btn-group">
                        <button onclick="editItem('${list.desc}', '${list.value}', '${FIXED}')" class="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                        <button onclick="deleteItem('${itemsArray.indexOf(list)}', '${FIXED}')" class="btn-delete"><i class="fa-solid fa-trash"></i></button>   
                    </div>
                `;

               updateTotalDisplay(FIXED);
                setStorage(FIXED);  
                break;
            case GROCERY:
                newListItems.innerHTML = `
                <input type="text" class="description" value=${list.desc} readonly>
                <span class="currency-symbol">${currencyStorage}</span>
                <input type="text" class="value" value=${list.value} readonly>
                    <div class="btn-group">
                        <button onclick="editItem('${list.desc}', '${list.value}', '${GROCERY}')" class="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                        <button onclick="deleteItem('${itemsArray.indexOf(list)}', '${GROCERY}')"class="btn-delete"><i class="fa-solid fa-trash"></i></button> 
                    </div>
                `;
                updateTotalDisplay(GROCERY);
                setStorage(GROCERY);
                break;
            case ENTERTAINMENT:
                newListItems.innerHTML = `
                <input type="text" class="description" value=${list.desc} readonly>
                <span class="currency-symbol">${currencyStorage}</span>
                <input type="text" class="value" value=${list.value} readonly>
                    <div class="btn-group">
                        <button onclick="editItem('${list.desc}', '${list.value}', '${ENTERTAINMENT}')" class="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                        <button onclick="deleteItem('${itemsArray.indexOf(list)}', '${ENTERTAINMENT}')" class="btn-delete"><i class="fa-solid fa-trash"></i></button> 
                    </div>
                `;
                updateTotalDisplay(ENTERTAINMENT);
                setStorage(ENTERTAINMENT);    
                break;
        }
        
        container.appendChild(newListItems);
              

    })

}; 



/* Add the new list created on createNewList() through the click event on he add button */
const addNewListCreated = (context) => {
    switch (context) {
        case INFLOW:
            validateInputsAndAddItemsInArray(INFLOW);
            createNewList(INFLOW);
            calculatePercentage(GROCERY);
            // calculatePercentage(ENTERTAINMENT);
            clearInputs(INFLOW);
            break;
        case FIXED:
            validateInputsAndAddItemsInArray(FIXED);
            createNewList(FIXED);
            clearInputs(FIXED);
            setStorage(FIXED);
            break;    
        case GROCERY:
            validateInputsAndAddItemsInArray(GROCERY);
            createNewList(GROCERY);
            clearInputs(GROCERY);
            setStorage(GROCERY);
            break; 
        case ENTERTAINMENT:
            validateInputsAndAddItemsInArray(ENTERTAINMENT);
            createNewList(ENTERTAINMENT);
            clearInputs(ENTERTAINMENT);
            setStorage(ENTERTAINMENT);
            break;     
    }
};

const calculatePercentage = (percentContext) => {
    switch (percentContext) {
        case GROCERY:
            if(inputGroceryPercentage.value !== null && inputGroceryPercentage.value !== undefined && !isNaN(inputGroceryPercentage.value)) {
                let convertedToDecimal = inputGroceryPercentage.value / 100;
                const calcBase = totalDisplayInflows.value - totalDisplayFixed.value;
                const calculatedGroceryTotalWithPercentage = calcBase * convertedToDecimal;
                mainTotal = calculatedGroceryTotalWithPercentage;    
                totalDisplayGrocery.value = mainTotal.toFixed(2);
                totalDisplayEntertainment.value = calcBase - totalDisplayGrocery.value;
                localStorage.setItem('percentageGrocery', JSON.stringify(inputGroceryPercentage.value));
                localStorage.setItem('totalGrocery', JSON.stringify(totalDisplayGrocery.value));
            }
            break;

        case ENTERTAINMENT:
            if(inputEntertainmentPercentage.value !== null && inputEntertainmentPercentage.value !== undefined && !isNaN(inputEntertainmentPercentage.value)) {
                let convertedToDecimal = inputEntertainmentPercentage.value / 100;
                const calcBase = totalDisplayInflows.value - totalDisplayFixed.value;
                const calculatedEntertainmentTotalWithPercentage = calcBase * convertedToDecimal;
                mainTotal = calculatedEntertainmentTotalWithPercentage;    
                totalDisplayEntertainment.value = mainTotal.toFixed(2);
                totalDisplayGrocery.value = calcBase - totalDisplayEntertainment.value;
                localStorage.setItem('percentageGrocery', JSON.stringify(inputGroceryPercentage.value));
                localStorage.setItem('totalGrocery', JSON.stringify(totalDisplayGrocery.value));
            }
            break;        
    }    
};

btnAddGroceryPercentage.addEventListener('click', function () {
    calculatePercentage(GROCERY);
})

btnAddEntertainmentPercentage.addEventListener('click', function () {
    calculatePercentage(ENTERTAINMENT);
})
/* Push items in an array and validation  */


/* Update the main total */
let mainTotal = 0;
let mainTotalGroceryWithPercentage = 0;

const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const formatNumber = (number) => formatter.format(number);

const validateInputsAndAddItemsInArray = (inputContext) => {
    switch (inputContext) {
        case INFLOW:
            if(inputAddNewDescriptionInflows.value !== '' && inputAddNewValueInflows.value !== '') {
                const newItem = 
                {
                    desc: inputAddNewDescriptionInflows.value,
                    value: formatNumber(parseFloat(inputAddNewValueInflows.value))
                };
                arrayInflowsItems.push(newItem);
            }
            break;
        
        case FIXED:
            if(inputAddNewDescriptionFixed.value !== '' && inputAddNewValueFixed.value !== '') {
                const newItem = 
                {
                    desc: inputAddNewDescriptionFixed.value,
                    value: formatNumber(parseFloat(inputAddNewValueFixed.value))
                };
                arrayFixedItems.push(newItem);
            }
            break;
        case GROCERY:
            if(inputAddNewDescriptionGrocery.value !== '' && inputAddNewValueGrocery.value !== '') {
                const newItem = 
                {
                    desc: inputAddNewDescriptionGrocery.value,
                    value: formatNumber(parseFloat(inputAddNewValueGrocery.value))
                };
                arrayGroceryItems.push(newItem);
            }
            break;
        case ENTERTAINMENT:
            if(inputAddNewDescriptionEntertainment.value !== '' && inputAddNewValueEntertainment.value !== '') {
                const newItem = 
                {
                    desc: inputAddNewDescriptionEntertainment.value,
                    value: formatNumber(parseFloat(inputAddNewValueEntertainment.value))
                };
                arrayEntertainmentItems.push(newItem);
            }
            break;    
    }
};

const updateTotalDisplay = (totalContext) => {
    let mainTotal = 0;
    switch (totalContext) {
        case INFLOW:
            arrayInflowsItems.forEach(item => {
                mainTotal += parseFloat(item.value.replace(/\./g, '').replace(',', '.'));
            })
            // totalDisplayInflows.value = formatNumber(mainTotal);
            totalDisplayInflows.value = mainTotal;

            if(mainTotal > 0) {
                balanceWarningInflows.textContent = 'Entrou na conta este mês';
            }
            break;
        case FIXED:
            arrayFixedItems.forEach(item => {
                mainTotal += parseFloat(item.value.replace(/\./g, '').replace(',', '.'));
            })
            // totalDisplayFixed.value = formatNumber(mainTotal);
            totalDisplayFixed.value = mainTotal;

            if(mainTotal > 0) {
                balanceWarningFixed.textContent = 'A pagar';
            }
            break;

        case GROCERY:
            arrayGroceryItems.forEach(item => {
                mainTotal += parseFloat(item.value.replace(/\./g, '').replace(',', '.'));
            })
            // totalDisplayGrocery.value = formatNumber(mainTotal);
            totalDisplayGrocery.value = mainTotal;

            if(mainTotal > 0) {
                balanceWarningGrocery.textContent = 'Gastou'; 
            }
            break;

        case ENTERTAINMENT:
            arrayEntertainmentItems.forEach(item => {
                mainTotal += parseFloat(item.value.replace(/\./g, '').replace(',', '.'));
            })
            // totalDisplayEntertainment.value = formatNumber(mainTotal);
            totalDisplayEntertainment.value = mainTotal;

            if(mainTotal > 0) {
                balanceWarningEntertainment.textContent = 'Gastou'; 
            }
            break;               
    }
};



/* Clear Inputs after add */
const clearInputs = (context) => {
    switch (context) {
        case INFLOW:
            inputAddNewDescriptionInflows.value = '';
            inputAddNewValueInflows.value = '';
            break;
        case FIXED:
            inputAddNewDescriptionFixed.value = '';
            inputAddNewValueFixed.value = '';
            break;

        case GROCERY:
            inputAddNewDescriptionGrocery.value = '';
            inputAddNewValueGrocery.value = '';
            break;

        case ENTERTAINMENT:
            inputAddNewDescriptionEntertainment.value = '';
            inputAddNewValueEntertainment.value = '';
            break;
    }
}

/* Click event on the add buttons  */

btnAddListInflows.addEventListener('click', function() {
    addNewListCreated(INFLOW);
});

btnAddListFixed.addEventListener('click', function() {
    addNewListCreated(FIXED);
});

btnAddListGrocery.addEventListener('click', function() {
    addNewListCreated(GROCERY);
});

btnAddListEntertainment.addEventListener('click', function() {
    addNewListCreated(ENTERTAINMENT);
});

/* Delete Items*/

const deleteItem = (index, context) => {
    switch (context) {
        case INFLOW:
            arrayInflowsItems.splice(index, 1);
            setStorage(INFLOW);
            removeStorage();
            createNewList(INFLOW);
            updateTotalDisplay(INFLOW)
            updateDeleteBalanceWarnings('INFLOW');
            break;
        case FIXED:
            arrayFixedItems.splice(index, 1);
            setStorage(FIXED);
            removeStorage();
            createNewList(FIXED);
            updateTotalDisplay(FIXED)
            updateDeleteBalanceWarnings('FIXED');
            break;
        case GROCERY:
            arrayGroceryItems.splice(index, 1);
            setStorage(GROCERY);
            removeStorage();
            createNewList(GROCERY);
            updateTotalDisplay(GROCERY)
            updateDeleteBalanceWarnings('GROCERY');
            break;
        case ENTERTAINMENT:
            arrayEntertainmentItems.splice(index, 1);
            setStorage(ENTERTAINMENT);
            removeStorage();
            createNewList(ENTERTAINMENT);
            updateTotalDisplay(ENTERTAINMENT)
            updateDeleteBalanceWarnings('ENTERTAINMENT');
            break;
    }
};

/* Update Balance Warnings if <= 0  */
const updateDeleteBalanceWarnings = (context) => {
    const balanceMap = {
        INFLOW: balanceWarningInflows,
        FIXED: balanceWarningFixed,
        GROCERY: balanceWarningGrocery,
        ENTERTAINMENT: balanceWarningEntertainment
    };

    if (mainTotal <= 0) {
        balanceMap[context].textContent = " ";
    }

}

/* Edit Items*/

// const editItem = (desc, value, context) => {
//     const arrayMap = {
//         inflow: arrayInflowsItems,
//         fixed: arrayFixedItems,
//         grocery: arrayGroceryItems,
//         entertainment: arrayEntertainmentItems
//     }

//     //Find item index on array
//     const index = arrayMap[context].findIndex(item => item.desc === desc && item.value === value);
      
//     const container = containerMap[context];
//     const listItem = container.children[index];

//     const editButton = listItem.querySelector('.btn-edit');
//     const deleteButton = listItem.querySelector('.btn-delete');

//     const descriptionInput = listItem.querySelector('.description');
//     const valueInput = listItem.querySelector('.value');

//     editButton.addEventListener('click', () => {
//         if (editButton.innerHTML === '<i class="fas fa-pencil-alt"></i>') {
//             editButton.innerHTML = '<i class="fa-solid fa-check"></i>';
//             deleteButton.style.visibility = 'hidden';
    
//             descriptionInput.removeAttribute('readonly');
//             valueInput.removeAttribute('readonly');
//             valueInput.focus();
    
//             valueInput.addEventListener('change', () => {
//                 arrayMap[context][index].value = parseFloat(valueInput.value).toFixed(2);
    
//                 editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
//                 deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';  

//                 updateTotalAndStorage();                                  
//             });
//         } else {
//             editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
//             deleteButton.style.visibility = 'visible';
//             descriptionInput.setAttribute("readonly", "readonly");
//             valueInput.setAttribute("readonly", "readonly");
//         }

        
//     });

// };

// const editItem = (desc, value, context) => {


//     const arrayMap = {
//         inflow: arrayInflowsItems,
//         fixed: arrayFixedItems,
//         grocery: arrayGroceryItems,
//         entertainment: arrayEntertainmentItems
//     };
//     console.log('arrayMap',arrayMap);
//     // Encontre o índice do item no array
//     const index = arrayMap[context].findIndex(item => item.desc === desc && item.value === value);
//     console.log('Posição de cada linha no array:', index);
      
//     const container = containerMap[context];
//     console.log('Todas as linhas do array:', container);

//     const listItem = container.children[index];
//     console.log('A linha inteira do array', listItem);

//     const editButton = listItem.querySelector('.btn-edit');
//     console.log('Edit Button', editButton);
//     const deleteButton = listItem.querySelector('.btn-delete');

//     const descriptionInput = listItem.querySelector('.description');
//     console.log('descrição', descriptionInput);
//     const valueInput = listItem.querySelector('.value');

//     // Adicionar ouvinte de evento de clique ao botão de edição apenas uma vez
//     editButton.removeEventListener('click', editButtonClickHandler); // Remover o ouvinte de evento existente
//     editButton.addEventListener('click', editButtonClickHandler); // Adicionar novo ouvinte de evento

//     function editButtonClickHandler() {
//         console.log("CAIU AQUI AGORA");
//         if (editButton.innerHTML === '<i class="fas fa-pencil-alt"></i>') {
//             editButton.innerHTML = '<i class="fa-solid fa-check"></i>';
//             deleteButton.style.visibility = 'hidden';
    
//             descriptionInput.removeAttribute('readonly');
//             valueInput.removeAttribute('readonly');
//             valueInput.focus();
//         } else {
//             editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
//             deleteButton.style.visibility = 'visible';
//             descriptionInput.setAttribute("readonly", "readonly");
//             valueInput.setAttribute("readonly", "readonly");

//             // Atualizar o valor do item no array
//             arrayMap[context][index].value = parseFloat(valueInput.value).toFixed(2);
//             // Atualizar a interface do usuário e o armazenamento
//         }
//     }
// };

const arrayMap = {
    inflow: arrayInflowsItems,
    fixed: arrayFixedItems,
    grocery: arrayGroceryItems,
    entertainment: arrayEntertainmentItems
};

const editItem = (desc, value, context) => {
    const index = arrayMap[context].findIndex(item => item.desc === desc && item.value === value);
    const container = containerMap[context];
    const listItem = container.children[index];
    const editButton = listItem.querySelector('.btn-edit');
    const deleteButton = listItem.querySelector('.btn-delete');
    const descriptionInput = listItem.querySelector('.description');
    const valueInput = listItem.querySelector('.value');

    // Adicionar ouvinte de evento de clique ao botão de edição
    editButton.addEventListener('click', () => {
        if (editButton.innerHTML === '<i class="fa-solid fa-check"></i>') {
            // Confirmar edição
            editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            deleteButton.style.visibility = 'visible';
            descriptionInput.setAttribute("readonly", "readonly");
            valueInput.setAttribute("readonly", "readonly");

            // Atualizar o valor do item no array
            const newValue = parseFloat(valueInput.value).toFixed(2);
            arrayMap[context][index].value = newValue;

            // Atualizar o total
            updateTotalDisplay(context);
        } else {
            // Editar item
            editButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            deleteButton.style.visibility = 'hidden';
            descriptionInput.removeAttribute('readonly');
            valueInput.removeAttribute('readonly');
            valueInput.focus();
        }
    });
};
/* -------------------------------------------------------------------------------------------------------- */
/* LOCAL STORAGE */
/* Send data to localStorage */
const setStorage = (context) => {
    switch (context) {
        case INFLOW:
            localStorage.setItem('inflowsItemsDB', JSON.stringify(arrayInflowsItems));
            break;
        case FIXED:
            localStorage.setItem('fixedItemsDB', JSON.stringify(arrayFixedItems));
            break;
        case GROCERY:
            localStorage.setItem('groceryItemsDB', JSON.stringify(arrayGroceryItems));
            break; 
        case ENTERTAINMENT:
            localStorage.setItem('entertainmentItemsDB', JSON.stringify(arrayEntertainmentItems));
            break;
        /* CURRENCY CONTEXT */           
        case CURRENCY:
            localStorage.setItem('totalCurrencyInflows', totalCurrencyValue);
            localStorage.setItem('totalCurrencyFixed', totalCurrencyValueFixed);
            break;
        
    }
};


/* Get data from localStorage */
const getStorage = () => {
    const inflowsData = localStorage.getItem('inflowsItemsDB');
    const fixedData = localStorage.getItem('fixedItemsDB');
    const groceryData = localStorage.getItem('groceryItemsDB');
    const entertainmentData = localStorage.getItem('entertainmentItemsDB');
    const groceryPercentage = localStorage.getItem('percentageGrocery');
    const entertainmentPercentage = localStorage.getItem('percentageEntertainment');
    const totalGrocery = localStorage.getItem('totalGrocery');

    if(inflowsData) {
        arrayInflowsItems = JSON.parse(inflowsData);
    }

    if(fixedData) {
        arrayFixedItems = JSON.parse(fixedData);
    }

    if(groceryData) {
        arrayGroceryItems = JSON.parse(groceryData);
    }

    if(entertainmentData) {
        arrayEntertainmentItems = JSON.parse(entertainmentData);
    }
    
    if (groceryPercentage) {
        inputGroceryPercentage.value = JSON.parse(groceryPercentage);
    }

    if (entertainmentPercentage) {
        inputEntertainmentPercentage.value = JSON.parse(entertainmentPercentage);
    }

    // if(totalGrocery) {
    //     totalDisplayGrocery.value = JSON.parse(totalGrocery);
    // }

    createNewList(INFLOW);
    createNewList(FIXED);
    createNewList(GROCERY);
    createNewList(ENTERTAINMENT);

    allCurrencies = document.querySelectorAll('.currency-symbol');

};


/* Remove data from localStorage */
const removeStorage = () => {
    window.localStorage.removeItem('inflowsItemsDB');
};


/* CALL FUNCTIONS */
getStorage();
updateCurrency();


