import {Observable,Observer} from "rxjs";

let numbers = [1,5,10];

/*let source = Observable.create(observer=>{
	let index=0;
	let produceValue = ()=>{
		observer.next(numbers[index++]);
		if(index<numbers.length){
			setTimeout(produceValue,2000)
		}else{
			observer.complete();
		}
	}
	produceValue();
}).map(n=>n*2).filter(n=>n>4);*/

//let circle = document.getElementById("circle")
let button = document.getElementById("button");
let output = document.getElementById("output");
let click = Observable.fromEvent(button,"click");


function load(url:string){
	return Observable.create(observer=>{
			let xhr = new XMLHttpRequest();
	xhr.addEventListener("load",()=>{
		if(xhr.status===200){
		let data = JSON.parse(xhr.responseText);
		observer.next(data);
		observer.complete();
		}else{
			observer.error(xhr.statusText);
		}
	})
	xhr.open("GET",url);
	xhr.send();
	}).retryWhen(retryStrategy())
};
//retry(3)

function retryStrategy(){
	return function(errors){
		return errors.scan((acc,value)=>{
			console.log(acc,value);
			return acc+1;
		},10).delay(1000);
	}
}

function renderMovies(movies){
movies.forEach(m=>{
			let div = document.createElement("div");
			div.innerText = m.title;
			output.appendChild(div);
		})
}

//click.map(e=>load("movies.json")).subscribe(o=>console.log(o));
	
click.flatMap(e=>load("movies.json")).subscribe(renderMovies,e=>{
		console.log(`error ${e}`);
	},()=>{
		console.log("complete");
	});



/*source.subscribe((v)=>{
		console.log(v);
	},(e)=>{
		console.log(`error ${e}`);
	},()=>{
		console.log("complete");
	});*/