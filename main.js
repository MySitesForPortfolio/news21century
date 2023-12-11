var swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

const categoryName = document.createElement("div");
categoryName.className = "category__name top-indent bottom-indent";
categoryName.innerHTML = "Интересное";

const allArticle = document.querySelectorAll(".article");
const RandomArticles = setRandomArticles(allArticle);

function setRandomArticles(array) {
    let result = "";
    const randValues = new Set();
    while (true) {
        if (randValues.size == 7) break;
        randValues.add(Math.floor(Math.random() * array.length));
    };
    randValues.forEach(item => {
        result = result + array[item].outerHTML;
    });
    return result;
}

const articleWrapper = document.querySelectorAll(".articles__wrapper");

articleWrapper.forEach(item => item.onclick = function(event) {
    const target = event.target.closest('article');

    if (!target || target.tagName != 'ARTICLE') return;

    localStorage.setItem("next_content", RandomArticles);
    localStorage.setItem("next_category_name", categoryName.outerHTML);
    localStorage.setItem("main_content", target.innerHTML);
    location.href = './article.html';
});

if (localStorage.getItem("new_article")) {

    if (localStorage.getItem("new_article_category") == '2023') document.querySelector('#current').nextElementSibling.insertAdjacentHTML('afterbegin', localStorage.getItem("new_article"));

    else {
        document.querySelectorAll(".category__name").forEach(category => {
            if (localStorage.getItem("new_article_category") == category.id) {
                category.nextElementSibling.insertAdjacentHTML('afterbegin', localStorage.getItem("new_article"));
            }
        })
    }
}


document.querySelectorAll('.articles__wrapper').forEach(wrapper => sortArticles(wrapper));

function sortArticles(arrayItems) {
    
    let array = [];

    arrayItems.querySelectorAll('.article').forEach(item => {
        array.push(item);
    });

    array.sort((article_1, article_2) => {
        if (article_1.querySelector('.article__source').innerHTML.slice(5, 7) > article_2.querySelector('.article__source').innerHTML.slice(5, 7)) return 1;
        if (article_1.querySelector('.article__source').innerHTML.slice(5, 7) < article_2.querySelector('.article__source').innerHTML.slice(5, 7)) return -1;
        
        if (article_1.querySelector('.article__source').innerHTML.slice(8, 10) > article_2.querySelector('.article__source').innerHTML.slice(8, 10)) return 1;
        if (article_1.querySelector('.article__source').innerHTML.slice(8, 10) < article_2.querySelector('.article__source').innerHTML.slice(8, 10)) return -1;
    });

    arrayItems.innerHTML = '';
    array.forEach(item => arrayItems.append(item));

}



