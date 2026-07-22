const product1={price:990,model:"Sonia czerwona", size:"XL"}
const product2={price:850,model:"Alan czarny", size:"2XL"}
const discount = 10

//String(), Number(), Boolean() !!
if(isNaN(product1.price) || isNaN(product2.price)){
    console.log("Podano niepoprawny typ danych")
}

//dodaj produkty do tabeli
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

addItem(product1)
addItem(product2)

let total = Number(product1.price) + Number(product2.price);
const totalWithDoscount=total-10

//cena całkowita
const price = document.querySelector("#total-price").innerHTML=total
console.log(`price from document ${price}`)

console.log(`Cena przed zniżką: ${total}`)
console.log(`Cena po zniżce: ${totalWithDoscount}`)
