import {Observable,Observer} from "rxjs";

export function load(url:string){
	return Observable.create(observer=>{
			let xhr = new XMLHttpRequest();
	let onLoad = () =>{
		if(xhr.status===200){
		let data = JSON.parse(xhr.responseText);
		observer.next(data);
		observer.complete();
		}else{
			observer.error(xhr.statusText);
		}
	};
	xhr.addEventListener("load",onLoad);
	xhr.open("GET",url);
	xhr.send();


	return ()=>{
		xhr.removeEventListener("load",onLoad);
		xhr.abort();
	}
	}).retryWhen(retryStrategy())
};
//retry(3)

export function loadWithFetch(url:string){
	return Observable.fromPromise(fetch(url).then(r=>
	if(r.status===200){
	return r.json()
}else{
	return Promise.reject(r);
}
	)

	);
}

function retryStrategy(){
	return function(errors){
		return errors.scan((acc,value)=>{
			console.log(acc,value);
			return acc+1;
		},10).delay(1000);
	}
}