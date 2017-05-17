import { Component } from '@angular/core';

@Component({
	selector: 'ResultComponent',
	templateUrl : './result.component.html',
	styleUrls : ['./result.component.css']
})

export class ResultComponent {
	result: Object;
	results : Object[];
	listKeys: string[] = [];
	isArray: boolean;

	initTab(resp : any) {
		this.isArray = resp.constructor === Array;
		if(this.isArray) {
			this.results = resp;
			for(var r of this.results) {
				var tmpList: string[] = [];
				this._analyzeObject(r, tmpList, '')
				this.listKeys = this._unionLists(this.listKeys, tmpList);
			}
		}
		else {
			this.result = resp;
			this._analyzeObject(this.result, this.listKeys, '');
		}
	}

	private _analyzeObject(obj : Object, finalList : string[], parent : string) {
		var currentList : string[] = Object.keys(obj);
		for (var elem of currentList) {
			if (obj[elem] !== null) {
				var fieldType = obj[elem].constructor;
				switch (fieldType) {
					case Object:
						var elemName = parent + elem + '_';
						this._analyzeObject(obj[elem], finalList, elemName);
						break;
					case Array:
						var arrayName = parent + elem + '_';
						finalList.push(arrayName + 'array');
						break;
					default:
						var finalName = parent + elem;
						finalList.push(finalName);
						break;
				}
			}
			else
				finalList.push(parent + elem);
		}
	}

	getElemByKey(res : Object, key : string) : string {
		if ( !key.includes('_') )
			return res[key];
		else {
			if ( key.includes('_array') ) {
				var newKey = key.split('_')[0]
				if(res[newKey].length == 0)
					return null;
				else if (res[newKey][0].constructor == Object)
					return 'ARRAY';
				else
					return res[newKey]
			}
			else {
				var keys = key.split('_')
				var obj = res[keys[0]]
				if (obj != null) {
					if (obj.constructor == Object) {
						var newKey = keys.slice(1).join('_');
						return this.getElemByKey(obj, newKey);
					}
					else if (obj.constructor == Array) {
						var newKey = keys.slice(1).join('_');
						return this.getElemByKey(obj[0], newKey);
					}
				}
				else {
					return null;
				}
			}
		}
	}

	private _unionLists(a : string[], b : string[]) : string[] {
		return a.concat(b.filter((el) => {
			return a.indexOf(el) === -1;
		}));
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
