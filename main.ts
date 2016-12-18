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

let circle = document.getElementById("circle")
let source = Observable.fromEvent(document,"mousemove").map((e:MouseEvent)=>{
	return{
		x:e.clientX,
		y:e.clientY
	}
}).filter(v=>v.x<500);

	
function onNext(value){
	circle.style.left = value.x;
	circle.style.top = value.y;
}


source.subscribe(onNext,e=>{
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