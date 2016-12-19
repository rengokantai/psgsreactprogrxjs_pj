import {Observable,Observer} from "rxjs";

import {load, loadWithFetch} from "./loader";

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




function renderMovies(movies){
movies.forEach(m=>{
			let div = document.createElement("div");
			div.innerText = m.title;
			output.appendChild(div);
		})
}

//click.map(e=>load("movies.json")).subscribe(o=>console.log(o));
	
click.flatMap(e=>loadWithFetch("movies.json")).subscribe(renderMovies,e=>{
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


let source = Observable.create(observer=>{
	observer.next(1);
	observer.next(2);
})

source.subscribe(
	value=>console.log(`value:${value}`)
)