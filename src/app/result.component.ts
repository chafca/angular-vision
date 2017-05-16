import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'tab-result',
	templateUrl : './result.component.html',
	styleUrls : ['./result.component.css']
})

export class ResultComponent implements OnInit {
	result: Object;
	listKeys: string[] = [];
	isArray: boolean;

	ngOnInit() {
		var obj : Object = [
		  {
		    "id": "59196e6a7d84c2241abe2c0b",
		    "index": 0,
		    "guid": "a0d01313-f1dd-4fa3-b955-d5d51b5b4b35",
		    "isActive": false,
		    "balance": "$3,005.27",
		    "picture": "http://placehold.it/32x32",
		    "age": 33,
		    "eyeColor": "green",
		    "name": "Katie Horne",
		    "gender": "female",
		    "company": "COMBOGENE",
		    "email": "katiehorne@combogene.com",
		    "phone": "+1 (972) 486-3266",
		    "address": "612 Wythe Avenue, Maplewood, Hawaii, 3740",
		    "about": "Cillum ut minim amet velit quis quis ex nostrud sint incididunt cupidatat sit ullamco aliquip. Duis voluptate pariatur aute consectetur consequat culpa adipisicing occaecat. Incididunt ex occaecat incididunt mollit officia nulla qui incididunt ut ex anim. Do officia deserunt duis ut occaecat sunt id dolor ut velit.\r\n",
		    "registered": "2017-02-18T07:11:48 -01:00",
		    "latitude": -30.323605,
		    "longitude": 123.611532,
			"socialNetwork" : {
				"facebook" : "KatieHorne265",
				"twitter" : "Kat_H",
				"linkedin" : "katiehorne-505a4eze"
			},
			"friends": [
		      {
		        "id": 0,
		        "name": "Larsen Dotson"
		      },
		      {
		        "id": 1,
		        "name": "Boyle Vincent"
		      },
		      {
		        "id": 2,
		        "name": "Mariana Moody"
		      }
		    ],
		    "tags": [
		      "duis",
		      "ut",
		      "incididunt",
		      "cillum",
		      "velit",
		      "labore",
		      "proident"
		    ],
		    "greeting": "Hello, Katie Horne! You have 10 unread messages.",
		    "favoriteFruit": "banana"
		  },
		  {
		    "id": "59196e6ab6c8677aa0ddd554",
		    "index": 1,
		    "guid": "dbe2085d-bda1-480b-a52f-72018091178d",
		    "isActive": false,
		    "balance": "$2,071.24",
		    "picture": "http://placehold.it/32x32",
		    "age": 22,
		    "eyeColor": "green",
		    "name": "Kirsten Hughes",
		    "gender": "female",
		    "company": "STELAECOR",
		    "email": "kirstenhughes@stelaecor.com",
		    "phone": "+1 (881) 444-3912",
		    "address": "688 Apollo Street, Hannasville, Louisiana, 8834",
		    "about": "Velit irure veniam cupidatat esse proident. Elit ullamco laboris ex ut magna ullamco commodo eiusmod aliquip. Eiusmod ex eiusmod voluptate irure officia quis excepteur reprehenderit. Officia consequat aute ex esse deserunt cupidatat excepteur est irure consectetur nulla esse velit magna. Ad exercitation ex consequat laborum non aliquip.\r\n",
		    "registered": "2015-04-15T07:59:15 -02:00",
		    "latitude": -87.427638,
		    "longitude": 176.811032,
			"friends": [
		      {
		        "id": 0,
		        "name": "Lottie Dixon"
		      },
		      {
		        "id": 1,
		        "name": "Mckenzie Cote"
		      },
		      {
		        "id": 2,
		        "name": "Fleming Lopez"
		      }
		    ],
		    "tags": [
		      "ut",
		      "officia",
		      "nisi",
		      "dolor",
		      "irure",
		      "quis",
		      "id"
		    ],
		    "greeting": "Hello, Kirsten Hughes! You have 2 unread messages.",
		    "favoriteFruit": "strawberry"
		  }
		];
		this.initTab(obj);
	}

	initTab(resp : Object) {
		this.result = resp;
		this.isArray = this.result.constructor == Array;
		if (this.isArray) {
			this.analyzeObject(this.result[0], this.listKeys, "");
		}
		else {
			this.analyzeObject(this.result, this.listKeys, "");
		}
	}

	private analyzeObject(obj : Object, finalList : string[], parent : string) {
		var currentList : string[] = Object.keys(obj);
		for (var elem of currentList) {
			var fieldType = obj[elem].constructor;
			switch (fieldType) {
				case Object:
					var elemName = parent + elem + "_";
					this.analyzeObject(obj[elem], finalList, elemName);
					break;
				case Array:
					var arrayName = parent + elem + "_";
					finalList.push(arrayName + "array");
					if (obj[elem][0].constructor == Object)
						this.analyzeObject(obj[elem][0], finalList, arrayName);
					break;
				default:
					var finalName = parent + elem;
					finalList.push(finalName);
					break;
			}
		}
	}

	getElemByKey(res : Object, key : string) : string {
		if ( !key.includes("_") )
			return res[key];
		else {
			if ( key.includes("_array") ) {
				var newKey = key.split("_")[0]
				if (res[newKey][0].constructor == Object)
					return "ARRAY";
				else
					return res[newKey]
			}
			else {
				var keys = key.split("_")
				var obj = res[keys[0]]
				if (obj.constructor == Object) {
					var newKey = keys.slice(1).join("_");
					return this.getElemByKey(obj, newKey);
				}
				else if (obj.constructor == Array) {
					var newKey = keys.slice(1).join("_");
					return this.getElemByKey(obj[0], newKey);
				}
			}
		}
	}

	download(){
			var filename = "file";
			var csvData = this.jsonToCSV(this.result);
			var a: any = document.createElement("a");
			a.setAttribute('style', 'display:none;');
			document.body.appendChild(a);
			var blob = new Blob([csvData], { type: 'text/csv' });
			var url= window.URL.createObjectURL(blob);
			a.href = url;

			var isIE = /*@cc_on!@*/false || !!(<any> document).documentMode;

			if (isIE)
			{
					var retVal = navigator.msSaveBlob(blob, filename+'.csv');
			}
			else{
					a.download = filename+'.csv';
			}
			// If you will any error in a.download then dont worry about this.
			a.click();
	}

	// convert Json to CSV data
	jsonToCSV(objArray:any) {
			var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
			var str = '';
			var row = "";

			for (var index in objArray[0]) {
					//Now convert each value to string and comma-seprated
					row += index + ',';
			}
			row = row.slice(0, -1);
			//append Label row with line break
			str += row + '\r\n';

			for (var i = 0; i < array.length; i++) {
					var line = '';
					for (var index in array[i]) {
							if (line != '') line += ','

							line += '"'+array[i][index]+'"';
					}

					str += line + '\r\n';
			}

			return str;
	}

}
