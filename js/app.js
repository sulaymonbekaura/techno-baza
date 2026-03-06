const products = [
{
    name:"MacBook Pro",
    price:1500,
    category:"laptop",
    image:"https://picsum.photos/500/300?1",
    specs:["M2 Chip","16GB RAM","512GB SSD","14 inch Retina"]
},
{
    name:"HP Pavilion",
    price:900,
    category:"laptop",
    image:"https://picsum.photos/500/300?2",
    specs:["Intel i7","16GB RAM","1TB SSD","15.6 inch"]
},
{
    name:"Samsung Monitor",
    price:300,
    category:"monitor",
    image:"https://picsum.photos/500/300?3",
    specs:["27 inch","144Hz","Full HD","IPS Panel"]
},
{
    name:"Gaming Mouse",
    price:40,
    category:"peripheral",
    image:"https://picsum.photos/500/300?4",
    specs:["RGB Light","7200 DPI","USB Type-A"]
},
{
    name:"Mechanical Keyboard",
    price:80,
    category:"peripheral",
    image:"https://picsum.photos/500/300?5",
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

displayProducts(products);
updateCart();