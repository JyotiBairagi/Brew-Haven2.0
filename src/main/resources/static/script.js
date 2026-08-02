// ===================== MENU ITEMS =====================
let menuItems = [];
let cart = [];
let currentUser = null;
const API_URL = "https://brew-haven2-0-2.onrender.com";

// ===================== INITIALIZE =====================
document.addEventListener('DOMContentLoaded', () => {

    loadMenu();
    createCoffeeBeans();
    updateCartDisplay();
    document.getElementById("adminNav").style.display="none";
});

// ===================== SECTION NAVIGATION =====================
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        if (sectionId === 'gps') {
            document.getElementById('location').innerText = 'Click "Get My Location" to fetch your coordinates.';
        }
    }
}

// ===================== MENU RENDER =====================
function renderMenu() {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = menuItems.map(item => `
        <div class="menu-item">
           <img src="/${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price">₹${item.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${item.id}, event)">Add to Cart</button>
        </div>
    `).join('');
}

// ===================== CART FUNCTIONS =====================
function addToCart(id, event) {
    const item = menuItems.find(i => i.id === id);
    let found = cart.find(c => c.id === id);
    if (found) found.quantity++;
    else cart.push({...item, quantity: 1});
    updateCartDisplay();

    const btn = event.target;
    const original = btn.textContent;
    btn.textContent = 'Added! ✓';
    btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = 'linear-gradient(45deg, #8B4513, #D2691E)';
    }, 1000);
}

function updateQuantity(id, change) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity < 1) cart = cart.filter(c => c.id !== id);
    updateCartDisplay();
}

function updateCartDisplay() {
    document.getElementById('cartCount').textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    const items = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (cart.length === 0) {
        items.innerHTML = `<p style="text-align:center;color:#666;padding:2rem;">Your cart is empty</p>`;
        totalEl.textContent = '0.00';
        return;
    }
    items.innerHTML = cart.map(i => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${i.name}</h4>
                <p>₹${i.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${i.id}, -1)">-</button>
                <span style="margin: 0 1rem; font-weight: bold;">${i.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${i.id}, 1)">+</button>
                <span style="margin-left:1rem; font-weight:bold; color:#8B4513;">₹${(i.price * i.quantity).toFixed(2)}</span>
            </div>
        </div>
    `).join('');
    totalEl.textContent = cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
}

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

// ===================== GPS =====================
function getLocation() {

    if (!navigator.geolocation) {
        document.getElementById("location").innerHTML =
            "Geolocation is not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("location").innerHTML =
        `Latitude : ${lat}<br>Longitude : ${lon}<br>Fetching address...`;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(data => {

            document.getElementById("location").innerHTML =
                `
                Latitude : ${lat}<br>
                Longitude : ${lon}<br>
                Address : ${data.display_name}
                `;

            document.getElementById("gpsOrder").style.display = "block";

        })
        .catch(() => {

            document.getElementById("location").innerHTML +=
                "<br>Unable to fetch address.";

        });

}

function showError(error) {

    switch(error.code){

        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML =
            "Permission denied.";
            break;

        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML =
            "Location unavailable.";
            break;

        case error.TIMEOUT:
            document.getElementById("location").innerHTML =
            "Request timed out.";
            break;

        default:
            document.getElementById("location").innerHTML =
            "Unknown error.";
    }

}
// ===================== SIGNUP & LOGIN =====================
document.getElementById("signupForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("role").value;

    const user = {
        name,
        email,
        password,
        role
    };

    try{

        const response = await fetch(`${API_URL}/api/users/register`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(user)

        });

        if(response.ok){

            alert("Registration Successful!");

            showSection("login");

        }else{

            alert("Registration Failed");

        }

    }catch(error){

        console.error(error);

        alert("Server Error");

    }

});
document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    try{

        const response = await fetch(`${API_URL}/api/users/login`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();
        console.log(data);

       if(data.message==="Login Successful"){

           localStorage.setItem("token",data.token);

           currentUser={

               email:data.email,
               name:data.name,
               role:data.role

           };

           document.getElementById("loginNav").style.display="none";

           document.getElementById("logoutNav").style.display="block";

           document.getElementById("welcomeUser").style.display="block";

           document.getElementById("welcomeUser").innerHTML=
           "Welcome, "+data.name;

           if(data.role.toLowerCase()=="admin"){

               document.getElementById("adminNav").style.display="block";

               document.getElementById("userNav").style.display="none";

               showAdminPanel();

           }else{

               document.getElementById("adminNav").style.display="none";

               document.getElementById("userNav").style.display="block";

               showSection("menu");

           }


        }else{

            alert(data.message);

        }

    }catch(error){

        console.log(error);

    }

});

function showAdminPanel(){

    showSection("admin");

    loadAllOrders();

    loadAllUsers();

}
// ===================== ORDER FUNCTIONS =====================

function processOrder(order, isGPS = false) {
    saveOrder(order);

    const summary = document.getElementById("orderSummary");
    summary.innerHTML = `
        <div class="success-message">✅ Order Confirmed! Order #${order.orderNum}</div>
        <h3>Order Details:</h3>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Role:</strong> ${order.role}</p>
        ${order.location ? `<p><strong>Location:</strong> ${order.location}</p>` : ""}
        <p><strong>Time:</strong> ${order.time}</p><hr>
        <h4>Items:</h4>
        ${order.items.map(i => `<div class="order-item"><span>${i.name} x${i.quantity}</span><span>₹${(i.price * i.quantity).toFixed(2)}</span></div>`).join('')}
        <hr><div class="order-item" style="font-weight:bold;"><span>Total Amount:</span><span>₹${order.total.toFixed(2)}</span></div>
        <p style="margin-top:2rem;color:#666;">${order.location ? "Estimated delivery: 30–40 minutes" : "Estimated prep time: 10–15 minutes"}</p>
    `;

    if (!isGPS) { cart = []; updateCartDisplay(); toggleCart(); }
    showSection("orderDetails");
}

async function checkout() {

    if (!currentUser) {
        alert("Please login first");
        return;
    }

    if (cart.length === 0) {
        alert("Cart Empty");
        return;
    }

    const order = {

        userEmail: currentUser.email,

        items: cart.map(item =>
            `${item.name} x${item.quantity}`
        ).join(", "),

        total: cart.reduce((sum, item) =>
            sum + item.price * item.quantity, 0),

        location: "Pickup",

        paymentStatus: "Pending",

        orderStatus: "Preparing",

        orderDate: new Date().toLocaleString()

    };

    try {

        await openRazorpay(order);

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

async function openRazorpay(orderData){

    console.log("openRazorpay called");

    const response = await fetch(`${API_URL}/api/payment/createOrder`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            amount:orderData.total

        })

    });

    const razorOrder = await response.json();

    var options = {

        key:"rzp_test_T7fMXIEtzyb7vF",

        amount:razorOrder.amount,

        currency:"INR",

        name:"Brew Haven",

        description:"Coffee Order",

        order_id:razorOrder.id,

handler: async function(response){

    orderData.paymentStatus = "PAID";

    orderData.paymentId = response.razorpay_payment_id;

    orderData.razorpayOrderId = response.razorpay_order_id;

    await fetch(`${API_URL}/api/orders`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(orderData)
    });
    document.getElementById("orderSummary").innerHTML = `
    <h2>Payment Successful ✅</h2>
    <p>Total Amount : ₹${orderData.total}</p>
    `;

    showSection("orderDetails");
    localStorage.setItem(
        "lastOrder",
        JSON.stringify(orderData)
    );
const orderedItems = [...cart];

cart = [];

updateCartDisplay();

toggleCart();

showSection("orderDetails");
alert("Order Saved!");
},          // <-- close handler

theme:{
    color:"#8B4513"
}

};          // <-- close options object

var rzp = new Razorpay(options);
rzp.open();

}           // <-- close openRazorpay()

async function gpsCheckout(){

    if(!currentUser){
        alert("Please Login");
        return;
    }

    if(cart.length===0){
        alert("Cart Empty");
        return;
    }

    const location = document.getElementById("location").innerText;

    const order = {

        userEmail: currentUser.email,

        items: cart.map(item =>
            `${item.name} x${item.quantity}`
        ).join(", "),

        total: cart.reduce((sum,item)=>
            sum + item.price*item.quantity,0),

        location: location,

        paymentStatus:"Pending",

        orderStatus:"Preparing",

        orderDate:new Date().toLocaleString()

    };

    try{

        await openRazorpay(order);

    }catch(error){

        console.log(error);

        alert("Payment Failed");

    }

}
// ===================== FLOATING BEANS =====================
function createCoffeeBeans() {
    const container = document.getElementById('coffeeBeans');
    for (let i = 0; i < 20; i++) {
        const bean = document.createElement('div');
        bean.className = 'bean';
        bean.style.left = `${Math.random() * 100}%`;
        bean.style.animationDelay = `${Math.random() * 6}s`;
        bean.style.animationDuration = `${Math.random() * 3 + 4}s`;
        container.appendChild(bean);
    }
}
async function loadMenu() {

    try {

const response = await fetch(`${API_URL}/api/menu`);
        if(!response.ok){
            throw new Error("Cannot load menu");
        }

        menuItems = await response.json();

        console.log(menuItems);

        renderMenu();

    } catch(error){

        console.error(error);

        document.getElementById("menuGrid").innerHTML =
        "<h2 style='color:white'>Menu failed to load.</h2>";

    }

}

async function loadAllUsers(){

    const response = await fetch(`${API_URL}/api/users`);

    const users = await response.json();

    document.getElementById("totalUsers").innerText=users.length;

    let html="";

    users.forEach(user=>{

        html+=`

        <tr>

        <td>${user.name}</td>

        <td>${user.email}</td>

        <td>${user.role}</td>

        </tr>

        `;

    });

    document.querySelector("#usersTable tbody").innerHTML=html;

}
async function loadAllOrders(){

    const response = await fetch(`${API_URL}/api/orders`);

    const orders = await response.json();

    document.getElementById("totalOrders").innerText=orders.length;

    let revenue=0;

    let html="";

    orders.forEach(order=>{

        revenue+=order.total;

        html+=`

        <tr>

        <td>${order.userEmail}</td>

        <td>${order.items}</td>

        <td>₹${order.total}</td>

        <td>${order.paymentStatus}</td>

        <td>${order.orderStatus}</td>

        <td>

        <select onchange="updateOrderStatus(${order.id},this.value)">

        <option value="Preparing"
        ${order.orderStatus==="Preparing"?"selected":""}>
        Preparing
        </option>

        <option value="Ready"
        ${order.orderStatus==="Ready"?"selected":""}>
        Ready
        </option>

        <option value="Delivered"
        ${order.orderStatus==="Delivered"?"selected":""}>
        Delivered
        </option>

        </select>

        </td>

        </tr>

        `;

    });

    document.getElementById("totalRevenue").innerText="₹"+revenue;

    document.querySelector("#ordersTable tbody").innerHTML=html;

}
async function showMyOrders(){

    if(!currentUser){

        alert("Please Login");

        return;

    }

    showSection("myOrders");

    const response = await `${API_URL}/api/orders/${currentUser.email}`

    );

    const orders = await response.json();

    let html="";

    if(orders.length===0){

        html="<h3>No Orders Yet</h3>";

    }else{

        orders.forEach(order=>{

            html+=`

            <div class="order-card">

                <h3>${order.items}</h3>

                <p>Total : ₹${order.total}</p>

                <p>Status : ${order.orderStatus}</p>

                <p>Payment : ${order.paymentStatus}</p>

                <p>Date : ${order.orderDate}</p>

            </div>

            `;

        });

    }

    document.getElementById("myOrdersList").innerHTML=html;

}
async function updateOrderStatus(id,status){

    const response = await fetch(

    `${API_URL}/api/orders/${id}/${status}`

    {

        method:"PUT"

    });

    if(response.ok){

        alert("Order Updated");

        loadAllOrders();

    }else{

        alert("Update Failed");

    }

}
function showUserMenu(){

    document.getElementById("adminLink").style.display="none";

    document.getElementById("userLink").style.display="none";

    document.getElementById("menuLink").style.display="inline";

    document.getElementById("gpsLink").style.display="inline";

    document.getElementById("myOrdersLink").style.display="inline";

    document.getElementById("loginLink").style.display="none";
}

function showAdminMenu(){

    document.getElementById("adminLink").style.display="inline";

    document.getElementById("userLink").style.display="inline";

    document.getElementById("menuLink").style.display="none";

    document.getElementById("gpsLink").style.display="none";

    document.getElementById("myOrdersLink").style.display="none";

    document.getElementById("loginLink").style.display="none";
}
function logout(){

    currentUser=null;

    localStorage.clear();

    document.getElementById("loginNav").style.display="block";

    document.getElementById("logoutNav").style.display="none";

    document.getElementById("adminNav").style.display="none";

    document.getElementById("userNav").style.display="block";

    document.getElementById("welcomeUser").style.display="none";

    showSection("home");
}
function downloadBill() {

    const order = JSON.parse(localStorage.getItem("lastOrder"));

    if(!order){
        alert("No Bill Found");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("BREW HAVEN",70,20);

    doc.setFontSize(12);

    doc.text("Customer : " + order.userEmail,20,40);
    doc.text("Date : " + order.orderDate,20,50);
    doc.text("Items : " + order.items,20,60);
    doc.text("Total : ₹" + order.total,20,70);
    doc.text("Payment : " + order.paymentStatus,20,80);

    doc.save("BrewHaven_Bill.pdf");
}
async function sendOtp(){

    const email = document.getElementById("forgotEmail").value;

    const response = await fetch(
       `${API_URL}/api/users/sendOtp`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email
            })
        }
    );

    const data = await response.json();

    alert(data.message);

}
async function verifyOtp(){

    const email = document.getElementById("forgotEmail").value;

    const otp = document.getElementById("forgotOtp").value;

    const response = await fetch(
       `${API_URL}/api/users/verifyOtp`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                otp
            })
        }
    );

    const data = await response.json();

    alert(data.message);

}
async function resetPassword(){

    const email = document.getElementById("forgotEmail").value;

    const password = document.getElementById("newPassword").value;

    const response = await fetch(
        `${API_URL}/api/users/resetPassword`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    if(data.message==="Password Updated"){

        showSection("login");

    }

}
async function askAI(){

    const prompt=document.getElementById("aiPrompt");

    const chat=document.getElementById("chatBox");

    const question=prompt.value.trim();

    if(question==="") return;

    chat.innerHTML+=`
        <div class="user-message">
            ${question}
        </div>
    `;

    prompt.value="";

    chat.innerHTML+=`
        <div class="ai-message" id="loading">
            Thinking...
        </div>
    `;

    chat.scrollTop=chat.scrollHeight;

    try{

        const res=await fetch("/api/ai/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                question:question

            })

        });

        const answer=await res.text();

        document.getElementById("loading").remove();

        chat.innerHTML+=`
            <div class="ai-message">
                ${answer}
            </div>
        `;

        chat.scrollTop=chat.scrollHeight;

    }catch(e){

        document.getElementById("loading").innerHTML=
        "Unable to connect with Ollama.";

    }

}
document.addEventListener("DOMContentLoaded",()=>{

const prompt=document.getElementById("aiPrompt");

if(prompt){

prompt.addEventListener("keydown",(e)=>{

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

askAI();

}

});

}

});