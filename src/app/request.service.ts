import { Response, Http } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import * as myLinks from './links';

@Injectable()
export class RequestService {
	urls = [
		'http://recg-ws.vision.services.local/cxf/rest/pdc/search/Commande/',
		'http://int-ws.vision.services.local/cxf/rest/pdc/search/Commande/',
		'http://pp-ws.vision.services.local/cxf/rest/pdc/search/Commande/',
		'http://ws.vision.services.local/cxf/rest/pdc/search/Commande/'
	];
	requests = [
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%5D}}',
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%5D}}',
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%5D}}',
		'{"bool":{"must":%5B{"prefix":{"numerocommandeunique":"CCL"}}%5D,"must_not":%5B{"term":{"numeroannonceur":"00000006"}}%5D}}'
	];
	req: string;

  constructor(private http: Http) {}

	newRequest(): void{
		this.setRequest("");
	}

	getRequest(): string {
		return this.req;
	}

  setRequest(req: string): void{
    this.req = req;
  }

	httpRequest(req: string): Observable<Object[]> {
    this.setRequest(req);
    console.log(req);
    var json = this.http.get(this.req)
                        .map((res:Response) => res.json())
                        .catch(this.handleError);
    console.log(json);
    return json;
	}

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}
