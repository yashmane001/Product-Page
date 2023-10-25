let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Sony PS5 PlayStation',
        description: 'This is a cutting-edge gaming console that delivers next-gen gaming experiences.',
        image: 'Gaming Console.JPEG',
        price: 44990
    },
    {
        id: 2,
        name: 'Dell Alienware x14',
        description: 'This gaming laptop is a powerhouse designed for gamers who top-tier performance.',
        image: 'Gaming Laptop.JPEG',
        price: 220000
    },
    {
        id: 3,
        name: 'iPad Pro',
        description: 'This is Apple premium tablet offering, known for its sleek design, powerful performance.',
        image: 'iPad pro.JPEG',
        price: 105990
    },
    {
        id: 4,
        name: 'iphone 15 Pro',
        description: 'This is the first iPhone to feature an aerospace-grade titanium design.',
        image: 'Iphone 15 pro.JPEG',
        price: 123000
    },
    {
        id: 5,
        name: 'FASTRACK REFLEX PLAY +',
        description: 'This smartwatch is a stylish and feature-packed wearable designed for active individuals.',
        image: 'Smart watch.JPEG',
        price: 10000
    },
    {
        id: 6,
        name: 'Oculus Quest',
        description: 'This is a state-of-the-art VR headset that offers an immersive virtual reality experience.',
        image: 'VR.JPEG',
        price: 39990
    },
    {
        id: 7,
        name: 'SAMSUNG QN800C Neo QLED 8K',
        description: 'This 8K TV is a cutting-edge television that delivers stunning visuals.',
        image: '8K TV.JPEG',
        price: 123000
    },
    {
        id: 8,
        name: 'Marshall Woburn III',
        description: 'This is a powerful and stylish Bluetooth speaker that combines mordern technology.',
        image: 'Speaker.JPEG',
        price: 59998
    },
    {
        id: 9,
        name: 'HP Smart 750',
        description: 'This is a versatile and efficient all-in-one printer designed to meet various printing',
        image: 'Printer.JPEG',
        price: 24000
    }
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="description">${value.description}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // Copy product from list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div class="description">${value.description}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}