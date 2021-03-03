getMovie("now_playing");

$("#searchByWord").keyup(function () {
    if (this.value == "") {
        displayData()
    }
    else {
        searchApi(this.value)
    }
});

let searchMovies = [];
async function searchApi(searchText) {
    let apiResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&query=${searchText}&page=1&include_adult=false`)
    let neww = await apiResponse.json()
    searchMovies = neww.results
    var data = "";
    for (var i = 0; i < searchMovies.length; i++) {
        if (searchMovies[i].original_title.toLowerCase().includes(searchText.toLowerCase())) {
            data += `
            <div class=" col-md-4 my-3">
            <div class="displayMovies">
                <img src="https://image.tmdb.org/t/p/w500/${searchMovies[i].poster_path}" class="w-100">
                <div class="text-center p-2 movieInfo py-5">
                    <h2 class="mt-5">${searchMovies[i].original_title}</h2>
                    <p>${searchMovies[i].overview}</p>
                    <h5>rate: ${searchMovies[i].vote_average}</h5>
                    <p>${searchMovies[i].release_date}</p>
                </div>
            </div>
        </div>
        `
        }
    }
    $("#apiMovies").html(data);
}


function search(searchText) {
    var searchInfo = "";
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].original_title.toLowerCase().includes(searchText.toLowerCase())) {
            searchInfo += `
            <div class=" col-md-4 my-3">
            <div class="displayMovies">
                <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" class="w-100">
                <div class="text-center p-2 movieInfo py-5">
                    <h2 class="mt-5">${movies[i].original_title}</h2>
                    <p>${movies[i].overview}</p>
                    <h5>rate: ${movies[i].vote_average}</h5>
                    <p>release date: ${movies[i].release_date}</p>
                </div>
            </div>
        </div>
        `
        }
    }
    document.getElementById("apiMovies").innerHTML=searchInfo;
}
$("#search").keyup(function () {
    search(this.value)
});

function getMovie(typeOfMovies) {
    var request = new XMLHttpRequest();
    request.open("GET", `https://api.themoviedb.org/3/movie/${typeOfMovies}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=1`);
    request.send();
    request.addEventListener("readystatechange", function () {
        if (request.readyState == 4 && request.status == 200) {
            movies = JSON.parse(request.response).results;
            displayData();
        }
    })
}

var movies = [];
function displayData() {
    info = ``;
    for (var i = 0; i < movies.length; i++) {
        info += `
        <div class=" col-md-4 my-3">
            <div class="displayMovies">
                <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" class="img-fluid">
                <div class="text-center p-2 movieInfo py-5">
                    <h2 class="mt-5">${movies[i].original_title}</h2>
                    <p>${movies[i].overview}</p>
                    <h5>rate: ${movies[i].vote_average}</h5>
                    <p>${movies[i].release_date}</p>
                </div>
            </div>
        </div>
        `
    }
    $("#apiMovies").html(info);
}


links = document.getElementsByClassName("text-decoration-none");
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (eventInfo) {
        var currentType = eventInfo.target.text;
        console.log(currentType);
        if (currentType == "Now Playing") {
            getMovie("now_playing")
        }
        else if (currentType == "Popular") {
            getMovie("popular")
        }
        else if (currentType == "Top Rated") {
            getMovie("top_rated")
        }
        else if (currentType == "Upcoming") {
            getMovie("upcoming")
        }
    })
}
async function getTrending() {
    let apiResponse = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=f1aca93e54807386df3f6972a5c33b50`)
    let data = await apiResponse.json()
    movies = data.results
    displayData()
}

$(".trendingLink").click(function () {
    getTrending();
})
$("#open").click(function () {
    let sidebarWidth = $(".sidebar").outerWidth();
    if ($(".openbar").css("left") == "0px") {
        $(".openbar").animate({ "left": -sidebarWidth }, 600)
        $("#open").removeClass("fa-times")
        $(".nowPlayingLink").animate({ "opacity": "0", "top": "500px" }, 1000)
        $(".popularLink").animate({ "opacity": "0", "top": "500px" }, 1000)
        $(".topRatedLink").animate({ "opacity": "0", "top": "500px" }, 1000)
        $(".trendingLink").animate({ "opacity": "0", "top": "500px" }, 1000)
        $(".upcomingLink").animate({ "opacity": "0", "top": "500px" }, 1000)
        $(".contactsLink").animate({ "opacity": "0", "top": "500px" }, 1000)
    }
    else {
        $(".openbar").animate({ "left": "0" }, 500)
        $("#open").addClass("fa-times")
        $(".nowPlayingLink").animate({ "opacity": "1", "top": "5px" }, 800)
        $(".popularLink").animate({ "opacity": "1", "top": "10px" }, 900)
        $(".topRatedLink").animate({ "opacity": "1", "top": "15px" }, 1000)
        $(".trendingLink").animate({ "opacity": "1", "top": "20px" }, 1100)
        $(".upcomingLink").animate({ "opacity": "1", "top": "25px" }, 1200)
        $(".contactsLink").animate({ "opacity": "1", "top": "30px" }, 1300)
    }
})
$(".contactsLink").click(function () {
    let secOffset = $("#contact").offset().top;
    $("body,html").animate({ scrollTop: secOffset }, 1000)
})


let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let ageInput = document.getElementById("age");
let phoneInput = document.getElementById("phone");
let passInput = document.getElementById("pass");
let repassInput = document.getElementById("repass");
let submitBtn = document.getElementById("submitBtn");

var nameRegex = /^[A-Z][a-z]{2,10}$/;
function validName(){
    if (nameRegex.test(nameInput.value)==false) {
        $("#nameErr").css("display", "block");
    }
    else {
        $("#nameErr").css("display", "none");
    };
}
nameInput.onkeyup = function () {
   validName();
   submitValid();
};

var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
function emailValid(){
    if (emailRegex.test(emailInput.value)==false) {
        $("#emailErr").css("display", "block");
    }
    else {
        $("#emailErr").css("display", "none");
    }
}
emailInput.onkeyup = function () {
   emailValid();
   submitValid();
};

var phoneRegex = /^(02)?(010|011|012|015)[0-9]{8}$/;
function phoneValid(){
    if (phoneRegex.test(phoneInput.value)==false) {
        $("#phoneErr").css("display", "block");
    }
    else {
        $("#phoneErr").css("display", "none");
    };
}
phoneInput.onkeyup = function () {
    phoneValid();
    submitValid();
};

var ageRegex = /^(?:1[01][0-9]|120|1[8-9]|[2-9][0-9])$/;
function ageValid(){
    if (ageRegex.test(ageInput.value)==false) {
        $("#ageErr").css("display", "block");
    }
    else {
        $("#ageErr").css("display", "none");
    };
}
ageInput.onkeyup = function () {
    ageValid();
    submitValid();
};

var passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function passValid(){
    if (passRegex.test(passInput.value)==false) {
        $("#passErr").css("display", "block");
    }
    else {
        $("#passErr").css("display", "none");
    }
}
passInput.onkeyup = function () {
    passValid();
    submitValid();
};

function repassValid(){
    if (repassInput.value != passInput.value) {
        $("#rePassErr").css("display", "block");
    }
    else {
        $("#rePassErr").css("display", "none");
    }
}
repassInput.onkeyup = function () {
    repassValid();
    submitValid();
};

function submitValid(){
    if(nameRegex.test(nameInput.value) && emailRegex.test(emailInput.value) && phoneRegex.test(phoneInput.value) && ageRegex.test(ageInput.value) && passRegex.test(passInput.value) && repassInput.value == passInput.value){
        submitBtn.disabled=false;
    }
}


