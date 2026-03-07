const products = [
{
    name:"MacBook Pro",
    price:1500,
    category:"laptop",
    image:"images/macbook-pro.webp",
    specs:["M2 Chip","16GB RAM","512GB SSD","14 inch Retina"]
},
{
    name:"HP Pavilion",
    price:900,
    category:"laptop",
    image:"images/hp-pavilion.webp",
    specs:["Intel i7","16GB RAM","1TB SSD","15.6 inch"]
},
{
    name:"Samsung Monitor",
    price:300,
    category:"monitor",
    image:"images/samsung-monitor.webp",
    specs:["27 inch","144Hz","Full HD","IPS Panel"]
},
{
    name:"Gaming Mouse",
    price:40,
    category:"peripheral",
    image:"images/gaming-mouse.webp",
    specs:["RGB Light","7200 DPI","USB Type-A"]
},
{
    name:"Mechanical Keyboard",
    price:80,
    category:"peripheral",
    image:"images/keyboard.webp",
    specs:["Blue Switch","RGB","Anti-Ghosting"]
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
    const product = products[index];

    document.getElementById("modalImg").src = product.image;
    document.getElementById("modalTitle").innerText = product.name;
    document.getElementById("modalPrice").innerText = "$"+product.price;

    const specsList = document.getElementById("modalSpecs");
    specsList.innerHTML="";
    product.specs.forEach(spec=>{
        specsList.innerHTML += `<li>${spec}</li>`;
    });

    document.getElementById("modalCartBtn").onclick = function(){
        addToCart(index);
        closeModal();
    };

    document.getElementById("productModal").classList.add("active");
}

function closeModal(){
    document.getElementById("productModal").classList.remove("active");
}

function addToCart(index){
    cart.push(products[index]);
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCart();
}

function updateCart(){
    document.getElementById("cartCount").innerText=cart.length;
}
function searchProduct(){
    let value = document.getElementById("searchInput").value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
}
function toggleMenu(){
    document.querySelector("nav ul").classList.toggle("active");
}
function filterCategory(cat){
    if(cat === "all"){
        displayProducts(products);
    }else{
        const filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}
const burger = document.querySelector(".burger");
const navLinks = document.querySelector("nav ul");

burger.addEventListener("click",()=>{
navLinks.classList.toggle("active");
});
displayProducts(products);
updateCart();