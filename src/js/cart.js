const cart={
    counter:1,
        discount: {
        amount:100,
    },

    items:[
        {id:1, price:990,model:"Sonia czerwona", size:"XL"},
        {id:2, price:850,model:"Alan czarny", size:"2XL"},
        {id:3, price:750,model:"Monika bordowa", size:"3XL"}
    ],

    getTotal(){
        {return this.items.reduce((acc,item)=>acc+item.price,0) }  
    },

    isEmpty(){ return this.items.length===0 },

    addItem(item){
        itemsContainer.innerHTML+=`<tr class="tablerows" data-id="${item.id}" onclick="markBg()">
            <td class="counter">${this.counter}</td>
            <td><button class="delete">X</button></td>
            <td>${item.model}</td>
            <td>${item.size}</td>
            <td><input type="number" value="1" class="input" min=0></td>
            <td class="price">${item.price}</td>
        </tr>`
        this.counter++;
    },

    calculatePrice(discount){
        let total=this.getTotal();

        if(!discount){
            totalPriceContainer.innerHTML=total
        }else{
            totalPriceContainer.innerHTML=total-discount
        }
    },

    removeItem(id){
        this.items=this.items.filter(item=>item.id!==id)
    }
}


//Dodanie produktów do tabeli
const itemsContainer= document.querySelector("#items")

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
for (const item of cart.items){
    cart.addItem(item)
}


//Dodaj zniżkę
function addDiscount(e){
    if(e.target.checked){
        discountContainer.classList.remove('hidden')
        this.calculatePrice(this.discount.amount);
    }else{
        discountContainer.classList.add('hidden')
        this.calculatePrice();
    }
}

function updateDiscountAvailability(){
    if(cart.isEmpty()){
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

function renumberRows(){
    const counterContainer=document.querySelectorAll('.counter')
    counterContainer.forEach((el,index)=>{
        el.innerHTML=index+1
    })
}

function attachInputListeners(){
    const input=document.querySelectorAll(".input")
        for(let i=0;i<input.length;i++){
        input[i].addEventListener('click',checkInput.bind(cart))
    }
}

function checkInput(e){
    if(e.target.value==0){
        const row=e.target.closest('tr')
        const id=Number(row.dataset.id)
        this.removeItem(id)
        row.remove()
        renumberRows()
    }

    if(updateDiscountAvailability()) return

    this.calculatePrice(discountCheckbox.checked ? this.discount.amount : undefined)
}

function deleteRow(e){
    if(e.target.tagName==="BUTTON"){
        const row=e.target.closest("TR")
        const id=Number(row.dataset.id)
        this.removeItem(id)
        row.remove();
        renumberRows()

        if(updateDiscountAvailability()) return

        this.calculatePrice(discountCheckbox.checked ? this.discount.amount : undefined)
    }
}

//Wywołanie funkcji
cart.calculatePrice();
attachInputListeners();

//Dodaj zniżkę
discountAmountContainer.innerHTML=cart.discount.amount

//listenery
discountCheckbox.addEventListener('click',addDiscount.bind(cart))
table.addEventListener('click',deleteRow.bind(cart))

//Zaznaczenie checkboxa jeśli została przekazana odpowiedania warotść z index.html
if(Boolean(+discountContainer.dataset.discountShouldBeEnabled)){
    discountCheckbox.click();
}