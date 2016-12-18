import {Observable,Observer} from "rxjs";

let numbers = [1,5,10];

let source = Observable.from(numbers);



source.subscribe((v)=>{
		console.log(`value:${v}`);
	},(e)=>{
		console.log(`error ${e}`);
	},()=>{
		console.log("complete");
	});