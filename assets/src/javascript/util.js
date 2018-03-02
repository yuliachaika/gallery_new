const Utils = new function(){

	/**
	* Create an objects that can parser windows.location.search. Shame
	* mechanism as in URLSearchParams that can be not available in 
	* some old vrowsers for exaple IE and so on.
	*/
	this.createUrlSearchParser = function (query) {

		return new function(query){

			this.data = {};

			this.get = function (key) {
				return this.data.hasOwnProperty(key) ? this.data[key] : null;
			};

			this.set = function (key, val) {
				this.data[key] = val;
			};

			this.toString = function () {
				var res = '';
				for( const index in this.data){
					res += '' + index + '=' + this.data[index] + '&';
				}
				if(res.length > 0){
					res = '?' + res.substr(0, res.length - 1);
				}
				return res;
			};

			this.isValid = function(str) {
				return typeof(str) === "string" && str.length >= 4 && str.indexOf("?") !== -1;
			};

			this.init = function (query) {
				this.data = {};
				const state = this.isValid(query);
				if ( !state ){
					return;
				} 

				var values = query.split("?")[1].split("&");

				for (var val of values) {
					if (val.length >= 3) {
						const index = val.indexOf("=");
						if (index === -1 || index === 0 || index === (val.length -1)) {
							continue;
						}   
						const map = val.split("=");
						this.data[map[0]]=map[1];
					}
				}
			};

			//code
			this.init(query);
		}(query);
	};
}