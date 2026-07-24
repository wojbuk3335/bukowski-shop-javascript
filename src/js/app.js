const product1={price:990,model:"Sonia czerwona", size:"XL"}
const product2={price:850,model:"Alan czarny", size:"2XL"}
const discount = 100
let discountEnabled = false;


    
//Dodanie produktów do tabeli
const itemsContainer= document.querySelector("#items")
let counter=1;
function addItem(item){
    itemsContainer.innerHTML+=`<tr class="tablerows" onclick="markBg()">
        <td class="counter">${counter}</td>
        <td><button class="delete">X</button></td>
        <td>${item.model}</td>
        <td>${item.size}</td>
        <td><input type="number" value="1" class="input" min=0></td>
        <td class="price">${item.price}</td>
    </tr>`
    counter++;
}

//Containery i seelctory
    const discountContainer=document.querySelector("#discount")
    const discountCheckbox=document.querySelector('#add-discount')
    const totalPriceContainer=document.querySelector('#total-price')
    const discountAmountContainer=document.querySelector("#discount-amount")
    const table=document.querySelector(".card-table")


function markBg(){
    if(window.event.target.tagName==="INPUT"){
        window.event.stopPropagation();
    }else{
        window.event.target.closest('tr').classList.toggle('marked')
    }
    
}

//Dodawanie produktów
addItem(product1)
addItem(product2)


//Dodaj zniżkę
function addDiscount(e){
    if(e.target.checked){
        discountContainer.classList.remove('hidden')
        calculatePrice(discount);
    }else{
        discountContainer.classList.add('hidden')
        calculatePrice();
    }
}

//Funkcja do obliczania ceny
function calculatePrice(discount){
    const priceContainer=document.querySelectorAll(".price")

    const total = [...priceContainer].reduce((acc,current)=>{
        return acc+Number(current.innerHTML)
    },0)

    if(!discount){
        totalPriceContainer.innerHTML=total
    }else{
        totalPriceContainer.innerHTML=total-discount
    }
}

function updateDiscountAvailability(){
    const tablerows=document.querySelectorAll('.tablerows')
    if([...tablerows].length==0){
        discountCheckbox.disabled=true
        discountCheckbox.checked=false
        discountContainer.classList.add('hidden')
        totalPriceContainer.innerHTML=0
        return true
    }else{
        discountCheckbox.disabled=false
        return false
    }
}

function deleteRowsIfZero(){
    const input=document.querySelectorAll(".input")

            for(let i=0;i<input.length;i++){
                input[i].addEventListener('click',checkInput)
            }
            function checkInput(e){
            if(e.target.value==0){
                e.target.closest('tr').remove()
            }

            if(updateDiscountAvailability()) return

        calculatePrice(discountCheckbox.checked ? discount : undefined)
    }
}

function deleteRow(e){
    if(e.target.tagName==="BUTTON"){
        e.target.closest("TR").remove();

        if(updateDiscountAvailability()) return

        calculatePrice(discountCheckbox.checked ? discount : undefined)
    }
}

//Wywołanie funkcji
calculatePrice();
deleteRowsIfZero();

//Dodaj zniżkę
discountAmountContainer.innerHTML=discount

//listenery
discountCheckbox.addEventListener('click',addDiscount)
table.addEventListener('click',deleteRow)

//Zaznaczenie checkboxa jeśli została przekazana odpowiedania warotść z index.html
if(Boolean(+discountContainer.dataset.discountShouldBeEnabled)){
    discountCheckbox.click();
}