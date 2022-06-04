const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");   // value is found at  input type="text" 
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");



//we are submitting form,add item is a function that targets that form so we can do what ever with that form with functio
form.addEventListener('submit', addItem); // 
clearBtn.addEventListener('click', clearItems);

window.addEventListener('DOMContentLoaded',setupItems);


function addItem(e){
	e.preventDefault();
	flag = grocery.classList[0]
	const value = grocery.value
	if(flag){
		const a = document.querySelector(`[data-id="${flag}"]`)
		grocery.classList.remove(flag)
		a.firstChild.innerText = value
		editStorage(flag,value)
		clearInput()
		submitBtn.innerText = 'submit'
		return
	}

	const id = new Date().getTime().toString(); // make new id
	createListItem(value,id)
	container.classList.add('show-container');
	setupItems(value,id)
	clearInput()

}


function createListItem(value,id){
	const element = document.createElement('article');
	element.classList.add('grocery-item');
	const attr = document.createAttribute('data-id');
	attr.value = id;
	element.setAttributeNode(attr);
	element.innerHTML = `<p class="title">${value}</p>
							<div class="btn-container">
							  <button type="button" class="edit-btn" data-id="${attr.value}">
							    <i class="fas fa-edit"></i>  
							  </button>
							  <button type="button" class="delete-btn">
							    <i class="fas fa-trash"></i>
							  </button>
							</div>`

	const editBtn = element.querySelector('.edit-btn');
	const deleteBtn = element.querySelector('.delete-btn');
	editBtn.addEventListener('click',edit)
	deleteBtn.addEventListener('click',deleteArticle)
	list.appendChild(element);




}

function clearInput(){
	grocery.value = ''
}

function edit(e){
	submitBtn.innerText = 'edit'
	getValue = e.path[3].firstElementChild.innerText
	newId = e.currentTarget.dataset.id
	grocery.value = getValue
	if(grocery.classList.length >= 1){
		removeClass =  grocery.classList[0]
		grocery.classList.remove(removeClass)
	}
	grocery.classList.add(newId)
		
}

function deleteArticle(e){
	deleteItem = e.path[3]
	deleteStorageItem = deleteItem.dataset.id
	sessionStorage.removeItem(deleteStorageItem);
	deleteItem.remove()

		
}

function clearItems(){
	const deleteAllArticles = document.querySelectorAll('.grocery-item')
	deleteAllArticles.forEach(function(item){
		item.remove()
	})
	sessionStorage.clear();
	container.classList.remove('show-container');


}



function setupItems(value,id){
	sessionStorage.setItem(id,value);
	console.log(sessionStorage)
	if(sessionStorage.getItem(id) === "[object Event]"){
		sessionStorage.removeItem(id);
	}else{
		sessionStorage.setItem(id,value);
		return
	}

	for(const [id,value] of Object.entries(sessionStorage)) {
		createListItem(value,id)
		container.classList.add('show-container');
	   console.log(id,value,'lllllllllllll');
	}

}


function editStorage(flag,value){
	const id = flag
	sessionStorage.removeItem(flag);
	sessionStorage.setItem(id,value);

}

