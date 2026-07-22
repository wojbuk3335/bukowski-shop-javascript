const product1={price:990,model:"Sonia czerwona", size:"XL"}
const product2={price:850,model:"Alan czarny", size:"2XL"}
const discount = 100
let discountEnabled = false;

//Containery
    const discountContainer=document.querySelector("#discount")
    const discountCheckbox=document.querySelector('#add-discount')
    const totalPriceContainer=document.querySelector('#total-price')
    const discountAmountContainer=document.querySelector("#discount-amount")
    
//Dodanie produktów do tabeli
const itemsContainer= document.querySelector("#items")
let counter=1;
function addItem(item){
    itemsContainer.innerHTML+=`<tr>
        <td>${counter}</td>
        <td>${item.model}</td>
        <td>${item.size}</td>
        <td>1</td>
        <td>${item.price}</td>
    </tr>`
    counter++;
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
    let total = Number(product1.price) + Number(product2.price)
    if(!discount){
        totalPriceContainer.innerHTML=total
    }else{
        totalPriceContainer.innerHTML=total-discount
    }
}

calculatePrice();

//Dodaj zniżkę
discountAmountContainer.innerHTML=discount

//listenery
discountCheckbox.addEventListener('click',addDiscount)

//Zaznaczenie checkboxa jeśli została przekazana odpowiedania warotść z index.html
if(Boolean(+discountContainer.dataset.discountShouldBeEnabled)){
    discountCheckbox.click();
}