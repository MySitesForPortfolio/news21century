const header = document.querySelector(".header");
const preview = document.querySelectorAll(".article__preview_inner_text");

window.addEventListener('scroll', event => {
    window.scrollY !== 0 ? header.style.boxShadow = '0 0 25px rgba(101, 101, 101, .2)' : header.style.boxShadow = 'none';
});

preview.forEach(item => item.innerHTML.length > 80 ? item.innerHTML = item.innerHTML.slice(0, 100) + '...' : item.innerHTML);

