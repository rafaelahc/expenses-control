// const updateTotalDisplay = (totalContext) => {
//     mainTotal = 0;
//     mainTotalGroceryWithPercentage = 0;
//     switch (totalContext) {
//         case INFLOW:
//             arrayInflowsItems.forEach(item => {
//                 mainTotal += parseFloat(item.value);
//             })
//             totalDisplayInflows.value = mainTotal.toFixed(2);

//             if(mainTotal > 0) {
//                 balanceWarningInflows.textContent = 'Entrou na conta este mês';
//             }
//             break;
//         case FIXED:
//             arrayFixedItems.forEach(item => {
//                 mainTotal += parseFloat(item.value);
//             })
//             totalDisplayFixed.value = mainTotal.toFixed(2);

//             if(mainTotal > 0) {
//                 balanceWarningFixed.textContent = 'A pagar';
//             }
//             break;

//         case GROCERY:
//             arrayGroceryItems.forEach(item => {
//                 mainTotalGroceryWithPercentage += parseFloat(item.value); 
//                 // mainTotal -= parseFloat(item.value);  
//                 console.log("Soma das linhas", mainTotalGroceryWithPercentage);
//                 // console.log("Total do input", totalDisplayGrocery.value);
//             })
//             console.log("Total do input atualizado", mainTotal = totalDisplayGrocery.value - mainTotalGroceryWithPercentage);
//             totalDisplayGrocery.value = mainTotal.toFixed(2);
//             console.log("GROCERY TOTAL DISPLAUY", totalDisplayGrocery.value);

//             if(mainTotal > 0) {
//                 balanceWarningGrocery.textContent = 'Disponível';
//             }
//             localStorage.setItem('totalGrocery', JSON.stringify(mainTotal));
//             break;

//         case ENTERTAINMENT:
//             arrayEntertainmentItems.forEach(item => {
//                 mainTotal -= parseFloat(item.value);
//             })
//             totalDisplayEntertainment.value = mainTotal.toFixed(2);
//             if(mainTotal > 0) {
//                 balanceWarningEntertainment.textContent = 'Disponível';
//             }
//             break;                 
//     }
// };


/* Calculate percentage entered */
const calculatePercentage = (percentContext) => {
    switch (percentContext) {
        case GROCERY:
            if(inputGroceryPercentage.value !== null) {
                let convertToPercent = inputGroceryPercentage.value / 100;
                const calculatedTotal = (totalDisplayInflows.value - totalDisplayFixed.value) * convertToPercent;
                mainTotal = calculatedTotal;    
                totalDisplayGrocery.value = mainTotal.toFixed(2);                
                localStorage.setItem('percentageGrocery', JSON.stringify(inputGroceryPercentage.value));
                localStorage.setItem('totalGrocery', JSON.stringify(totalDisplayGrocery.value));
            }
            break;

        case ENTERTAINMENT:
            if(inputEntertainmentPercentage.value !== null) {
                let convertToPercent = inputEntertainmentPercentage.value / 100;
                const calculatedTotal = (totalDisplayInflows.value - totalDisplayFixed.value) * convertToPercent;
                mainTotal = calculatedTotal;    
                totalDisplayEntertainment.value = mainTotal.toFixed(2);
                localStorage.setItem('percentageEntertainment', JSON.stringify(inputEntertainmentPercentage.value));
            }
            break;        
    }    
};




const calculatePercentage = (percentContext) => {
    switch (percentContext) {
        case GROCERY:
            if(inputGroceryPercentage.value !== null) {
                let convertedToDecimal = inputGroceryPercentage.value / 100;
                const calcBase = totalDisplayInflows.value - totalDisplayFixed.value;
                const calculatedGroceryTotalWithPercentage = calcBase * convertedToDecimal;
                mainTotal = calculatedGroceryTotalWithPercentage;    
                totalDisplayGrocery.value = mainTotal.toFixed(2);
                totalEntertainmentGrocery.value = calcBase - totalDisplayGrocery.value;
                localStorage.setItem('percentageGrocery', JSON.stringify(inputGroceryPercentage.value));
                localStorage.setItem('totalGrocery', JSON.stringify(totalDisplayGrocery.value));
            }
            break;

        case ENTERTAINMENT:
            if(inputEntertainmentPercentage.value !== null) {
                let convertToPercent = inputEntertainmentPercentage.value / 100;
                const calculatedTotal = (totalDisplayInflows.value - totalDisplayFixed.value) * convertToPercent;
                mainTotal = calculatedTotal;    
                totalDisplayEntertainment.value = mainTotal.toFixed(2);
                localStorage.setItem('percentageEntertainment', JSON.stringify(inputEntertainmentPercentage.value));
            }
            break;        
    }    
};


















/* Click event on the add percentage buttons  */
btnAddGroceryPercentage.addEventListener('click', function () {
    calculatePercentage(GROCERY);
})

btnAddEntertainmentPercentage.addEventListener('click', function () {
    calculatePercentage(ENTERTAINMENT);
})

/* ------------------------------------------------------------------------------------------------------------------------------- */


// const updateCurrency = () => {
//     btnAddCurrencyType.forEach((btn) => {
//         btn.addEventListener("click", () => {
//             btn.addEventListener("click", () => {
//                 btnAddCurrencyType.forEach((btn) => {
//                     btn.classList.remove('active');
//                 });
//                 // Adicionar a classe 'active' apenas ao botão clicado
//                 btn.classList.add('active');
//             switch (btn.id) {
//                 case "eur":
//                     allCurrencies.forEach((symbol) => {
//                         console.log("allCurrencies:", symbol);
//                         symbol.innerHTML = "€";
//                     });
//                     break;
//                 case "brl":
//                     allCurrencies.forEach((symbol) => {
//                         console.log("Real antes:", symbol);
//                         symbol.innerHTML = "R$";
//                         // console.log("Real depois:", symbol.innerHTML);   
//                     });
//                     break;
//                 case "gbp":
//                     allCurrencies.forEach((symbol) => {
//                         symbol.innerHTML = "£";
//                     });
//                     break;
//                 case "usd":
//                     allCurrencies.forEach((symbol) => {
//                         symbol.innerHTML = "$";
//                     });
//                     break;
//             }

//             const totalCurrencyValueInflow = document.querySelector('#total-currency-inflows').innerHTML;
//             //const totalCurrencyValueFixed = document.querySelector('#total-currency-fixed').innerHTML
            
//             // Salve no localStorage
//             localStorage.setItem('totalCurrency', totalCurrencyValueInflow);
//             //localStorage.setItem('totalCurrencyFixed', totalCurrencyValueFixed);
//         });
//     });

// };



/* Clicar no botão e os inputs ficarem editáveis (retirar o readonly) */
/* Pegar o índice do item que eu quero editar */

// const updateTotalDisplay = (totalContext) => {
//     mainTotal = 0;
//     mainTotalGroceryWithPercentage = 0;
//     switch (totalContext) {
//         case INFLOW:
//             arrayInflowsItems.forEach(item => {
//                 mainTotal += parseFloat(item.value);
//             })
//             totalDisplayInflows.value = mainTotal.toFixed(2);

//             if(mainTotal > 0) {
//                 balanceWarningInflows.textContent = 'Entrou na conta este mês';
//             }
//             break;
//         case FIXED:
//             arrayFixedItems.forEach(item => {
//                 mainTotal += parseFloat(item.value);
//             })
//             totalDisplayFixed.value = mainTotal.toFixed(2);

//             if(mainTotal > 0) {
//                 balanceWarningFixed.textContent = 'A pagar';
//             }
//             break;

//         case GROCERY:
//             arrayGroceryItems.forEach(item => {
//                 mainTotal += parseFloat(item.value);
//             })
//             totalDisplayGrocery.value = mainTotal.toFixed(2);

//             if(mainTotal > 0) {
//                 balanceWarningGrocery.textContent = 'Gastou'; 
//             }
//             break;

//         case ENTERTAINMENT:
//             arrayEntertainmentItems.forEach(item => {
//                 mainTotal += parseFloat(item.value);
//             })
//             totalDisplayEntertainment.value = mainTotal.toFixed(2);

//             if(mainTotal > 0) {
//                 balanceWarningEntertainment.textContent = 'Gastou'; 
//             }
//             break;               
//     }
// };

// const validateInputsAndAddItemsInArray = (inputContext) => {
//     switch (inputContext) {
//         case INFLOW:
//             if(inputAddNewDescriptionInflows.value !== '' && inputAddNewValueInflows.value !== '') {
//                 const newItem = 
//                 {
//                     desc: inputAddNewDescriptionInflows.value,
//                     value: parseFloat(inputAddNewValueInflows.value).toFixed(2)
//                 };
//                 arrayInflowsItems.push(newItem);
//             }
//             break;
        
//         case FIXED:
//             if(inputAddNewDescriptionFixed.value !== '' && inputAddNewValueFixed.value !== '') {
//                 const newItem = 
//                 {
//                     desc: inputAddNewDescriptionFixed.value,
//                     value: parseFloat(inputAddNewValueFixed.value).toFixed(2)
//                 };
//                 arrayFixedItems.push(newItem);
//             }
//             break;
//         case GROCERY:
//             if(inputAddNewDescriptionGrocery.value !== '' && inputAddNewValueGrocery.value !== '') {
//                 const newItem = 
//                 {
//                     desc: inputAddNewDescriptionGrocery.value,
//                     value: parseFloat(inputAddNewValueGrocery.value).toFixed(2)
//                 };
//                 arrayGroceryItems.push(newItem);
//             }
//             break;
//         case ENTERTAINMENT:
//             if(inputAddNewDescriptionEntertainment.value !== '' && inputAddNewValueEntertainment.value !== '') {
//                 const newItem = 
//                 {
//                     desc: inputAddNewDescriptionEntertainment.value,
//                     value: parseFloat(inputAddNewValueEntertainment.value).toFixed(2)
//                 };
//                 arrayEntertainmentItems.push(newItem);
//             }
//             break;    
//     }
// };

const arrayMap = {
    inflow: arrayInflowsItems,
    fixed: arrayFixedItems,
    grocery: arrayGroceryItems,
    entertainment: arrayEntertainmentItems
};

const editItem = (desc, value, context) => {
        // Encontre o índice do item no array
    const index = arrayMap[context].findIndex(item => item.desc === desc && item.value === value);
    console.log('Posição de cada linha no array:', index);
      
    const container = containerMap[context];
    console.log('Todas as linhas do array:', container);

    const listItem = container.children[index];
    console.log('A linha inteira do array', listItem);

    const editButton = listItem.querySelector('.btn-edit');
    console.log('Edit Button', editButton);
    const deleteButton = listItem.querySelector('.btn-delete');

    const descriptionInput = listItem.querySelector('.description');
    console.log('descrição', descriptionInput);
    const valueInput = listItem.querySelector('.value');

    // Adicionar ouvinte de evento de clique ao botão de edição apenas uma vez  
};


editButton.removeEventListener('click', editButtonClickHandler); // Remover o ouvinte de evento existente
editButton.addEventListener('click', editButtonClickHandler); // Adicionar novo ouvinte de evento 


function editChangeButtonToCheck() {
    console.log("CAIU AQUI AGORA");
    if (editButton.innerHTML === '<i class="fas fa-pencil-alt"></i>') {
        editButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        deleteButton.style.visibility = 'hidden';

        descriptionInput.removeAttribute('readonly');
        valueInput.removeAttribute('readonly');
        valueInput.focus();
    } else {
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        deleteButton.style.visibility = 'visible';
        descriptionInput.setAttribute("readonly", "readonly");
        valueInput.setAttribute("readonly", "readonly");

        // Atualizar o valor do item no array
        arrayMap[context][index].value = parseFloat(valueInput.value).toFixed(2);
        // Atualizar a interface do usuário e o armazenamento
    }
}









const checkBtnFixed = document.querySelector('.btn-check');

let isChecked = false;

const checkFixed = () => {
    if (!isChecked) {
        inputListDescription.style.cssText = "text-decoration:  line-through;" + "color: #808080;" + "font-style: italic";
        inputListValue.style.cssText = "text-decoration:  line-through;" + "color: #808080;" + "font-style: italic";
        checkBtnFixed.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
        mainTotal -= parseFloat(item.value);
        editButton.style.visibility = 'hidden';
        deleteButton.style.visibility = 'hidden';
    
        if (mainTotal === 0) {
            balanceWarningFixed.textContent = "Contas pagas!";
        }
    } else {
        inputListDescription.style.removeProperty("text-decoration");
        inputListDescription.style.removeProperty("color");
        inputListDescription.style.removeProperty("font-style");
        inputListValue.style.removeProperty("text-decoration");
        inputListValue.style.removeProperty("color");
        inputListValue.style.removeProperty("font-style");
        checkBtnFixed.innerHTML = '<i class="fa-regular fa-circle"></i>';
        deleteButton.style.visibility = 'visible';
        editButton.style.visibility = 'visible';
        mainTotal += parseFloat(item.value);
    
        if (mainTotal > 0) {
            balanceWarningFixed.textContent = "A pagar";
        }
    }
}

checkBtnFixed.addEventListener('click', checkFixed);

