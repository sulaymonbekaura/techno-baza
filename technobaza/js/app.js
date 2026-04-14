const products = [
{name:"MacBook Pro",price:1500,category:"laptop",image:"images/macbook-pro.webp",specs:["M2","16GB","512GB"]},
{name:"HP Pavilion",price:900,category:"laptop",image:"images/hp.webp",specs:["i7","16GB","1TB"]},
{name:"Monitor",price:300,category:"monitor",image:"images/monitor.webp",specs:["27 inch","144Hz"]},
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(items){
    productList.innerHTML="";
    items.forEach((p,i)=>{
        productList.innerHTML+=`
        <div class="card" onclick="openModal(${i})">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
        </div>`;
    });
}

function openModal(i){
    const p = products[i];

    modalImg.src=p.image;
    modalTitle.innerText=p.name;
    modalPrice.innerText="$"+p.price;

    modalSpecs.innerHTML="";
    p.specs.forEach(s=> modalSpecs.innerHTML+=`<li>${s}</li>`);

    modalCartBtn.onclick=()=>addToCart(i);

    productModal.classList.add("active");
}

function closeModal(){
    productModal.classList.remove("active");
}

function addToCart(i){
    cart.push(products[i]);
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCart();
}

function updateCart(){
    cartCount.innerText=cart.length;

    let total=0;
    cartItems.innerHTML="";

    cart.forEach(i=>{
        total+=i.price;
        cartItems.innerHTML+=`<p>${i.name}</p>`;
    });

    totalPrice.innerText="Jami: $"+total;
}

function openCart(){cart.classList.add("active");}
function closeCart(){document.getElementById("cart").classList.remove("active");}

function searchProduct(){
    let v=searchInput.value.toLowerCase();
    displayProducts(products.filter(p=>p.name.toLowerCase().includes(v)));
}

function filterCategory(c){
    if(c==="all") displayProducts(products);
    else displayProducts(products.filter(p=>p.category===c));
}

/* APPLE SWITCH */
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("change",()=>{
    document.body.classList.toggle("light");

    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light":"dark"
    );
});

if(localStorage.getItem("theme")==="light"){
    document.body.classList.add("light");
    toggle.checked=true;
}

displayProducts(products);
updateCart();
