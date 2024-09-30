let backToTopButton = document.getElementById("backToTop");

//Affiche le bouton quand l'utilisateur fait défiler vers le bas de 200px

window.onscroll = function ()
{scrollFunction()};

function scrollFunction() {

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {

        backToTopButton.style.display = 'block';
        
    }
    else
    {
        backToTopButton.style.display = 'none';
    }
    
}

//Quand l'utilisateur clique sur le bouton, il remonte en haut de la page

backToTopButton.addEventListener('click', function(){

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})