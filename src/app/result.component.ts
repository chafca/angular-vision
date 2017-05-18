import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
	selector: 'ResultComponent',
	templateUrl : './result.component.html',
	styleUrls : ['./result.component.css']
})

export class ResultComponent {
	result: Object;
	results : Object[];
  resultsPrinted: Object[];
	listKeys: string[] = [];
	isArray: boolean;
  lists: number[] = [];

	initTab(resp : any) {
		this.isArray = resp[1].constructor === Array;
		if(this.isArray) {
			this.results = resp[1];
      this.resultsPrinted = this.jsonSlice(resp);
			for(var r of this.resultsPrinted) {
				var tmpList: string[] = [];
				this._analyzeObject(r, tmpList, '')
				this.listKeys = this._unionLists(this.listKeys, tmpList);
			}
		}
		else {
			this.result = resp[1];
			this._analyzeObject(this.result, this.listKeys, '');
		}
	}

  jsonSlice(resp: any): Object[]{
    if(resp[1].length >= 1000){
      var n = resp[1].length / 1000;
      for(var i=0; i<n ; i++){
        this.lists[i] = i*1000;
        if (n==1)
          this.lists[i] = resp[1].length - n * 1000;
      }
    }

    if (resp[0].lastIndexOf('}') == (resp[0].length-1)){
      return resp[1];
    }
    else {
      var res = resp[0].substring(resp[0].lastIndexOf('}') + 1);
      var begin = parseInt( res.substr(0, res.indexOf('..')) );
      var end = parseInt( res.substr(res.lastIndexOf('.')+1, (res.length-1)) );
      console.log("res: ", res, "begin: ", begin, "end: ", end);
      return resp[1].slice(begin, end);
    }
  }

  onSelect(list: any): void {
    if(this.results.length < list+1000)
      this.resultsPrinted = this.results.slice(list, this.results.length);
    else
      this.resultsPrinted = this.results.slice(list, list+1000);
    console.log("resultsPrinted onSelect: ", this.resultsPrinted.length);
  }

  onSelectAll(list: any): void {
    this.resultsPrinted = this.results;
    console.log("resultsPrinted onSelectAll: ", this.resultsPrinted.length);
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
				var newKey = key.split('_')[0];
				if(res[newKey].length == 0)
					return null;
				else if (res[newKey][0].constructor == Object){
					var str = '[';
					for (let obj of res[newKey]) {
					    str += this._objToString(obj) + ',';
					}
					str = str.slice(0,-1) + ']';
					return str;
				}
				else
					return res[newKey];
			}
			else {
				var keys = key.split('_');
				var obj = res[keys[0]];
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

	private _objToString(obj : Object) : string{
		var str = '';
		var keys = Object.keys(obj);
		str += '{';
		for (let k of keys) {
		    var kStr = k + ': "';
			if(obj[k] == null)
				kStr += 'null';
			else if (obj[k].constructor === Object)
				kStr += this._objToString(obj[k]);
			else if (obj[k].constructor === Array) {
				kStr += '[';
				for (let elem of obj[k]) {
			    	kStr += this._objToString(elem) + ',';
				}
				kStr += ']';
			}
			else
				kStr += obj[k];
			kStr += '",';
			str += kStr;
		}
		str = str.slice(0, -1);
		str += '}';
		return str;
	}

	private _unionLists(a : string[], b : string[]) : string[] {
		return a.concat(b.filter((el) => {
			return a.indexOf(el) === -1;
		}));
	}

	download(){
			var filename = "file";
			var csvData = '';
			if (this.result != null) {
				csvData = this.jsonToCSV(this.result)
			}
			if (this.resultsPrinted != null) {
				csvData = this.jsonToCSV(this.resultsPrinted)
			}
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
			var str = '';
			var row = "";
			for (var index in objArray[0]) {
					//Now convert each value to string and comma-seprated
					row += index + ',';
			}
			row = row.slice(0, -1);
			//append Label row with line break
			str += row + '\r\n';

			for (var i = 0; i < objArray.length; i++) {
					var line = '';
					for (var index in objArray[i]) {
							if (line != '')
								line += ','
							if (typeof objArray[i][index] == 'object' && objArray[i][index] != null)
								line += '"'+this._objToString(objArray[i][index])+'"';
							else
								line += '"'+objArray[i][index]+'"';
					}

					str += line + '\r\n';
			}

			return str;
	}

}
