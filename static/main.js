let cate=document.querySelector(".active")

cate.onclick=function(){
    if (document.querySelector(".branch").style.display="none") {
        document.querySelector(".branch").style.display="block";
    }else if ( document.querySelector(".branch").style.display="block") {
        document.querySelector(".branch").style.display="none";
    }
}
