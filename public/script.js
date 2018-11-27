// click on header's menu button
document.getElementById('menu-mobile').addEventListener('click', () => {
    let navList = document.querySelector('.page-header ul');
    navList.style.left = (navList.style.left === '-400px' || navList.style.left === '') ? '0px' : '-400px'
});