import { Injectable } from '@angular/core';
//import * as myLinks from './links';

@Injectable()
export class RequestService {
	urls = [
		'http://recg-ws.vision.services.local/cxf/rest/pdc/search/Commande/',
		'http://recg-ws.vision.services.local/cxf/rest/pdc/search/Produit/',
		'http://recg-ws.vision.services.local/cxf/rest/pdc/search/SousCommande/',
		'http://recg-ws.vision.services.local/cxf/rest/pdc/search/Article/'
	];
	requests = [
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%1D}}',
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%2D}}',
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%4D}}',
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%5D}}'
	];
	req: string;


	newRequest(): void{
		this.setRequest("");
	}

	getRequest(): string {
		return this.req;
	}

	setRequest(req: string): void {
		this.req = req;
		console.log(this.req);
	}
}
