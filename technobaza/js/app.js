const products = [
{
    name:"MacBook Pro",
    price:1500,
    category:"laptop",
    image:"images/macbook-pro.webp",
    specs:["M2 Chip","16GB RAM","512GB SSD","14 inch"]
},
{
    name:"HP Pavilion",
    price:900,
    category:"laptop",
    image:"images/hp-pavilion.webp",
    specs:["Intel i7","16GB RAM","1TB SSD"]
},
{
    name:"Samsung Monitor",
    price:300,
    category:"monitor",
    image:"images/samsung-monitor.webp",
    specs:["27 inch","144Hz","IPS"]
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("productList");

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

function openModal(index){
    const p = products[index];

    modalImg.src = p.image;
    modalTitle.innerText = p.name;
    modalPrice.innerText = "$"+p.price;

    modalSpecs.innerHTML="";
    p.specs.forEach(s=>{
        modalSpecs.innerHTML+=`<li>${s}</li>`;
    });

    modalCartBtn.onclick = () => addToCart(index);

    productModal.classList.add("active");
}

function closeModal(){
    productModal.classList.remove("active");
}

function addToCart(index){
    cart.push(products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart(){
    document.getElementById("cartCount").innerText = cart.length;

    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML="";
    let total = 0;

    cart.forEach(item=>{
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });

    totalPrice.innerText = "Jami: $" + total;
}

function openCart(){
    document.getElementById("cart").classList.add("active");
}

function closeCart(){
    document.getElementById("cart").classList.remove("active");
}

function searchProduct(){
    let value = searchInput.value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
}

function filterCategory(cat){
    if(cat === "all"){
        displayProducts(products);
    } else {
        displayProducts(products.filter(p => p.category === cat));
    }
}

function toggleMenu(){
    document.querySelector("nav ul").classList.toggle("active");
}

displayProducts(products);
updateCart();
