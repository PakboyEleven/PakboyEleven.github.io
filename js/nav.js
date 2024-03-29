document.addEventListener("DOMContentLoaded", function(){
    // aktifkan sidebar
    var elemen = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elemen);
    loadNav();
    function loadNav () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 ) {
                if (this.status != 200) return;
                // masukkan daftar navigasi 
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
                    elm.innerHTML = xhttp.responseText;
                });

                //daftarkan eventlistener untuk setiap tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
                    elm.addEventListener("click", function(event){
                        // tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // muat content halaman yang dipanggil 
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
    xhttp.open("GET", "link.html", true);
    xhttp.send();
    }

    //load page
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);
    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                if(page === "home"){
                    getArticles();
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                }else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan</p>";
                }else{
                    console.log("Ups...halaman tidak dapat diakses");
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});