/*eslint-disable */
module.exports = {
    template : require('./home.html'),
    controller : homeController,
    controllerAs : 'homeCtrl' 
};

function homeController(randService, $state){
    self = this;
    self.message = "Please Enter One of the Keywords";
    self.result = new Array();

    self.showCounts = false;
    self.error = false;
    self.count = 0;
    
    self.searchContent = function(){
        var dataPromise = randService.getData(self.searchString);
        self.result =[];
        self.count = self.result.length;
        self.showCounts = true;
        dataPromise.then(
                function(results){
                    self.error = false;
                    console.log(results);
                    self.count = results.length;
                    str = results.data.toString();
                    str = str.replace(/\s\s+/g, ' ');
                    var strArray = str.split(" ");
                    for (i = 0; i < strArray.length; i++) {
                        var temp = strArray[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                        var re = new RegExp(temp, 'g');
                        var n = str.match(re, "i").length;
                        var tempObj = {
                            name : strArray[i],
                            count : n
                        }
                        self.result.push(tempObj);
                    }
                    console.log(self.result);
                },
                function(error){
                    self.error = true;
                    console.log("error");
                }
            );
        }
    }