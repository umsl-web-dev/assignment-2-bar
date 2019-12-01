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



