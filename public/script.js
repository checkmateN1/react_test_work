// click on header's menu button
document.getElementById('menu-mobile').addEventListener('click', () => {
    let navList = document.querySelector('.page-header ul');
    navList.style.left = (navList.style.left === '-400px' || navList.style.left === '') ? '0px' : '-400px'
});

document.addEventListener('DOMContentLoaded', () => {
    resize();
});

window.onresize = () => {
    resize();
};

let resize = () => {
    let innerWidth = window.innerWidth;
    let clientWidth = document.documentElement.clientWidth;

    //console.log(innerWidth);  // with scroll   1041
    //console.log(clientWidth);  // without scroll  1024

    let diff = innerWidth - clientWidth;
    if(diff > 0 && clientWidth + diff > 1024 && clientWidth < 1024) {
        document.querySelector('.test-assignment-intro .background-wrapper').style.backgroundPositionY = 0;
        document.querySelector('.test-assignment-intro .background-wrapper').style.backgroundSize  = `${1326 - (1024 - clientWidth)/0.6}px`;
    } else {
        document.querySelector('.test-assignment-intro .background-wrapper').removeAttribute('style');
        document.querySelector('.test-assignment-intro').removeAttribute('style');
    }
};