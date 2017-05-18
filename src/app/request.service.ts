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

  constructor(private http: Http) {}

	httpRequest(req: string): Observable<Object[]> {
    console.log("request: ", req);
    var json = this.http.get(req)
                        .map((res:Response) => res.json())
                        .catch(this._handleError);
    return json;
	}

  private _handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}
