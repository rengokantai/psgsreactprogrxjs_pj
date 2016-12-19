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
	let xhr = new XMLHttpRequest();
	xhr.addEventListener("load",()=>{
		let movies = JSON.parse(xhr.responseText);
		movies.forEach(m=>{
			let div = document.createElement("div");
			div.innerText = m.title;
			output.appendChild(div);
		})
	})
	xhr.open("GET",url);
	xhr.send();
};
	
click.subscribe(e=>load("movies.json"),e=>{
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