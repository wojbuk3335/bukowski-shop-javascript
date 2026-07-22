const product1={price:10}
const product2={price:'20'}
const discount = 10

if(isNaN(product1.price) || isNaN(product2.price)){
    console.log("Podano niepoprawny typ danych")
}

let total = Number(product1.price) + Number(product2.price);
const totalWithDoscount=total-10


console.log(`Cena przed zniżką: ${total}`)
console.log(`Cena po zniżce: ${totalWithDoscount}`)
