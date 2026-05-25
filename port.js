const show =document.querySelector('#show');
const nav =document.querySelector('.navbar');
const remove = document.querySelector('#remove')
show.addEventListener('click', function(){
    nav.classList.remove('hidden');
})
remove.addEventListener('click', function(){
    nav.classList.add('hidden');
})