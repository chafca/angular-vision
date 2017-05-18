import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RequestService } from './request.service';
import * as myLinks from './links';

@Component({
	selector: 'RequestComponent',
	templateUrl: './request.component.html',
	styleUrls: [ './request.component.css' ]
})

export class RequestComponent implements OnInit {
	req: string;
	selectedUrl: string;
	selectedRequest: string;
	urls: string[];
	requests: string[];
  @Output() jsonEvent = new EventEmitter();
  busy: Subscription;

	constructor(
		private requestService: RequestService
	) {}

	ngOnInit(): void {
		this.req = '';
		this.urls = this.requestService.urls;
		this.requests = this.requestService.requests;
	}

	changeUrl(url: string): void{
		this.selectedUrl = url;
		this.changeRequest();
	}

	changeReq(request: string): void{
		this.selectedRequest =  request;
		this.changeRequest();
	}

	changeRequest(): void{
		if(this.selectedRequest==null)
			this.req = this.selectedUrl;
		if(this.selectedUrl!=null && this.selectedRequest!=null)
			this.req = this.selectedUrl + this.selectedRequest;
	}

	sendRequest(newReq: string): void{
    this.req = newReq;
    console.log("sendRequest: ", this.req);
		this.busy = this.requestService.httpRequest(this.req)
                        .subscribe(json => this.jsonEvent.emit(json));
    this.ngOnInit();
	}

}
