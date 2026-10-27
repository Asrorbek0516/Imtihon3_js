
const wrapperEl = document.querySelector(".wrapper")
console.log(wrapperEl);


function updateUi(arr) {
    arr.forEach((prod) => {
        wrapperEl.innerHTML += `
            <div >
            <img src="${prod.image}" alt="">
            <h2>${prod.title}</h2>
        </div>
        
        `
    });
}

async function getProducts() {
    try {
        let response = await fetch(
            "https://jsonbek.uz/api/products?style=comedy",
        );
        console.log(response);
        if (!response.ok) {
            throw new Error("Products olib kelishda muammo yuzaga keldi");
        }
        let data = await response.json();
        updateUi(data);
    }catch(error){
        console.log(error);
        
    }
}