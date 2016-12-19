import {Observable,Observer} from "rxjs";

export function load(url:string){
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

export function loadWithFetch(url:string){
	return Observable.fromPromise(fetch(url).then(r=>r.json()));
}

function retryStrategy(){
	return function(errors){
		return errors.scan((acc,value)=>{
			console.log(acc,value);
			return acc+1;
		},10).delay(1000);
	}
}