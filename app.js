if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready()

}


function purchaseClicked(event) {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}

//  adds to card function
function addToCardClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('img-fluid')[0].src

    addItemToCart(title, price, imageSrc)
    updateCartTotal()

}

//  function that clear the item
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// function that passes the title price and image

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This items is already added to the cart')
            return
        }
    }
    var cartRowContents = ` 
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                    <span class="cart-item-title">${title} </span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', qtyChanged)


}

// function that makes sure qty is always 1 and up and updates total
function qtyChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//  Update total 
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var qtyElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = qtyElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

//  Hides the Shop link
function testHideNav() {
    let aTag = document.getElementsByClassName('nav-link')
    console.log(aTag);
    for (let i = 0; i < aTag.length; i++) {
        if (aTag[i].innerHTML == " SHOP ") {
            console.log(aTag[i].innerHTML);
            if (true) {
                aTag[i].style.visibility = "hidden";
            }

        }
    }

};

// storing input from register-form
function store() {
    var usrName = document.getElementById('uName').value;
    var usrPw = document.getElementById('uPw').value;
    // var usrAge = localStorage.getItem("usrAge");

    let stored_users = JSON.parse(localStorage.getItem('users'));
    if (stored_users) {
        stored_users.push({ name: usrName, password: usrPw });
        localStorage.setItem('users', JSON.stringify(stored_users));
    } else {
        localStorage.setItem('users', JSON.stringify([{ name: usrName, password: usrPw }]));
    }
}

// check if stored data from register-form is equal to entered data in the  login-form
function check() {
    var usrName = document.getElementById('userName').value;
    var usrPw = document.getElementById('userPw').value;

    let stored_users = JSON.parse(localStorage.getItem('users'))
    if (stored_users) {
        for (let u = 0; u < stored_users.length; u++) {
            if (usrName == stored_users[u].name && usrPw == stored_users[u].password) {
                alert('You are logged in ' + usrName);
                return location.replace("./index.html");
            }
        }
    }
    else {
        localStorage.setItem('users', '[]');

    }

    return alert('Access denied. Valid username and password is required.');

}

// Grabs the Remove Buttons and clears the items
function ready() {
    var removeCartItems = document.getElementsByClassName('btn-danger')
    console.log(removeCartItems)
    for (var i = 0; i < removeCartItems.length; i++) {
        var button = removeCartItems[i]
        button.addEventListener('click', removeCartItem)
    }
    var qtyInput = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < qtyInput.length; i++) {
        var input = qtyInput[i]
        input.addEventListener('change', qtyChanged)
    }
    var addToCardBtn = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCardBtn.length; i++) {
        var button = addToCardBtn[i]
        button.addEventListener('click', addToCardClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}