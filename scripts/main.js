window.onload = function() {
    loadTheme();
    getArticles();
};

function loadTheme() {
    let scroller = document.getElementById('vertical-scroller');
    let slide_zero = document.getElementById('zero');
    let theme = localStorage.getItem("mode");
    if(theme == 'dark-button') { 
        if(scroller.classList.contains('light-mode')) {
            scroller.classList.remove('light-mode');
            scroller.classList.add('dark-mode');
        }
        if(slide_zero.classList.contains('light-bg')) {
            slide_zero.classList.remove('light-bg');
            slide_zero.classList.add('dark-bg');
        }
    }
    if(theme == 'light-button') { 
        if(scroller.classList.contains('dark-mode')) {
            scroller.classList.remove('dark-mode');
            scroller.classList.add('light-mode');
        }
        if(slide_zero.classList.contains('dark-bg')) {
            slide_zero.classList.remove('dark-bg');
            slide_zero.classList.add('light-bg');
        }
    }
}

/*
  Get Response
*/
function getArticles() {
  fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=covid&api-key=XBaYAnzyYawfMueMXGMgcwDHpQ8E7g9i`)
    .then((response) => response.json())
    .then((json) => handleArticles(json));
}

// /*
//   Handle Response
// */
 function handleArticles(articles) {
    //loop 5 times to make cards for top 5 articles
    for(let i=0; i < 5; i++) {
        let title = articles.response.docs[i].headline.main;
        let img_url;
        if(articles.response.docs[i].multimedia.length > 0) {
            img_url = "https://static01.nyt.com/" + articles.response.docs[i].multimedia[0].url;
        } else {
            img_url = "../images/nytimes-logo.png";
        }
        let summary = articles.response.docs[i].abstract;
        let link = articles.response.docs[i].web_url;

        document.getElementById(`article-title-${i}`).innerHTML += `${title}`;
        document.getElementById(`article-img-${i}`).src = `${img_url}`;
        document.getElementById(`article-summary-${i}`).innerHTML += `${summary}`;
        document.getElementById(`article-link-${i}`).setAttribute("href", `${link}`);
    }

 }


/* Game board functionality*/
let boxes = document.querySelectorAll('.box');
let scoreButton = document.getElementById('score');
let resetButton = document.getElementById('reset');
let selected = [];

function boxSelected(event) {
    if(event.target.classList.contains('box-select')) {
        event.target.classList.remove('box-select');
        selected.pop(event.target);
    } else {
        event.target.classList.add('box-select');
        selected.push(event.target);
    }
}

function reportScore() {
    let count = 0;
    selected.forEach((box) => {
        if(box.classList.contains('false')) {
            box.classList.add('incorrect');
            count++;
        } else {
            box.classList.add('correct');
        }
    })
    if(count > 0) {
        document.getElementById('result-text').innerHTML = `${count} of the statements you selected are false.`;
    } else {
        document.getElementById('result-text').innerHTML = `None of the statements you selected are false. Congratulations!`;
    }
}

function resetBoard() {
    selected.forEach((box) => {
        box.classList.remove('box-select');
        box.classList.remove('incorrect');
        box.classList.remove('correct');
    })
    document.getElementById('result-text').innerHTML = '';
    selected = [];
}

boxes.forEach((box) => {
    box.addEventListener('click', boxSelected);
});
scoreButton.addEventListener('click', reportScore);
resetButton.addEventListener('click', resetBoard);

/* Light and dark mode */
let darkButton = document.getElementById('dark-button');
let lightButton = document.getElementById('light-button');

function changeMode(event) {
    let scroller = document.getElementById('vertical-scroller');
    let slide_zero = document.getElementById('zero');
    localStorage.setItem("mode", event.target.id);
    if(event.target.id == 'dark-button') { 
        if(scroller.classList.contains('light-mode')) {
            scroller.classList.remove('light-mode');
            scroller.classList.add('dark-mode');
        }
        if(slide_zero.classList.contains('light-bg')) {
            slide_zero.classList.remove('light-bg');
            slide_zero.classList.add('dark-bg');
        }
    }
    if(event.target.id == 'light-button') { 
        if(scroller.classList.contains('dark-mode')) {
            scroller.classList.remove('dark-mode');
            scroller.classList.add('light-mode');
        }
        if(slide_zero.classList.contains('dark-bg')) {
            slide_zero.classList.remove('dark-bg');
            slide_zero.classList.add('light-bg');
        }
    }
}

darkButton.addEventListener('click', changeMode);
lightButton.addEventListener('click', changeMode);

