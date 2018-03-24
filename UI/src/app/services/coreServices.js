/*eslint-disable */
var coreServices = "coreServices";

angular.module(coreServices, [])
    .service('randService',function($http){
        self = this;
        var name = "Shalvi";
        return {
            getData : function(searchString){
                var data = $http.get("http://localhost:8000/hello/"+ searchString );
                return data;
            }
        }
    });

module.exports = coreServices;
