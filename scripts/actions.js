const ids=['fullname','age','picture','phone','email','address','city','country'];

const api={
  url:'https://randomuser.me/api/',
  reader:function(data){

    let ret={};
    const res=data.results[0];
    ret.fullname=res.name.first+" "+res.name.last;
    ret.age=res.dob.age;
    ret.email=res.email;
    ret.phone=res.phone;
    ret.picture=res.picture.large;
    ret.address=res.location.street.number + " " + res.location.street.name;
    ret.city=res.location.city;
    ret.country=res.location.country;
    return ret;
  },
};

const update_localStore=function(data) {
  for(let id of ids){
    if(data.hasOwnProperty(id) ){
      localStorage.setItem(id,data[id]);
    } else {
      console.log('data has no property id='+id+' , data='+data);
    }
  }
  return data;
}

const retrieve_data_from_localStore=function(){
  let ret={};
  if(localStorage === null ) {
    return null;
  }
  for(let id of ids ) {
    const value=localStorage.getItem(id);
    if(value === null ) {
      console.log('Dont such Item for id='+id);
      return null;
    }
    ret[id]=value
  }
  return ret;
}

const populate_cv=function(data){
  for(let id of ids ){
    const elem=document.getElementById(id);
    if( elem === null || elem === undefined ) {
      console.log('dont such element for id='+id);
      continue;
    }
    if(id === 'picture' ){
      elem.src=data[id];
      elem.style.width = '250px'; // Se aumenta el tamaño de la imagen
    } else {
      elem.innerText=data[id];
    }
  }
}

const reload=function() {
  fetch(api.url,{mode:'cors'})
      .then((response) => response.json())
      .then((data) => api.reader(data))
      .then((data) => update_localStore(data))
      .then((data) => populate_cv(data));
}

const updateInfo = function() {
  localStorage.clear(); // Se borra la información guardada en localStorage
  reload(); // Se llama a la función reload para actualizar la información
}

const data=retrieve_data_from_localStore();

if(data === null ) {
  reload();
} else {
  populate_cv(data);
}

// Cuando el usuario hace clic en el botón, se desplaza hacia la parte superior del documento.
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}