/**
 * Created by luckyqqk on 2015/11/13.
 */

"use strict";

var aModuleName = angular.module("customHtmlLabel", []);
var tempOptions = {
    options:[],
    buttons:[],
    data:[],
    showType:0,     // 横向,,纵向
    addColumnOption:function(dataKey, label, htmlType) {
        this.options.push({"dataKey":dataKey, "label":label, "htmlType":htmlType});
    },
    addSonOptions:function(dataKey, sonOptions) {
        for (var idx in sonOptions) {
            if (!sonOptions[idx].name || !sonOptions[idx].value) {
                throw new Error("name and value is required for a sonOption at index " + idx);
            }
        }
        for (var i in this.options) {
            var temp = this.options[i];
            if (dataKey === temp.dataKey) {
                temp['sonOptions'] = sonOptions;
                return;
            }
        }
    },
    addButton:function(buttonName, emitName, colorType) {
        this.buttons.push({buttonName:buttonName, emitName:emitName, colorType:colorType});
    },
    setData:function(data) {
      this.data = data;
    },
    addData:function(data) {
        this.data.push(data);
    },
    resetData:function() {
        this.data = [];
    },
    changeWise:function() {
        this.showType = 1 - this.showType;
    }
};
var resultObj = {
    restrict: 'E',
    //link: link,
    //templateUrl: '',
    replace: true
};
aModuleName.value("$tableOptions", angular.copy(tempOptions));
aModuleName.value("$formOptions", angular.copy(tempOptions));
aModuleName.value("$layerOptions", angular.copy(tempOptions));
aModuleName.directive('htmlTable', function ($tableOptions) {
    var link = function (scope, element, attrs) {
        scope.$tableOptions = $tableOptions;
        scope.catchIndex = function(index) {
            scope.$emit("doubleClick", scope.$tableOptions.data[index]);
        };
    };
    var result = angular.copy(resultObj);
    result.link = link;
    result.templateUrl = 'tpl/html-table.html';
    return result;
});

aModuleName.directive('htmlForm', function ($formOptions) {
    var link = function (scope, element, attrs) {
        scope.$formOptions = $formOptions;
        scope.boxClick = function(data, clickData) {
            var idx = data.indexOf(clickData);
            if (idx == -1) {
                data.push(clickData);
                data.sort(function(a, b) {return a > b;});
            } else {
                data.splice(idx, 1);
            }
        };
        scope.isChecked = function(data, checkData) {
            return data.indexOf(checkData) != -1;
        };
        scope.getNames = function(dataArr, valueArr) {
            var names = "";
            for (var i in valueArr) {
                names += scope.getName(dataArr, valueArr[i]);
                names += "|";
            }
            names = JSON.stringify(names);
            return names.substr(1, names.length - 3);
        };

        scope.getName = function(dataArr, value) {
            for (var i in dataArr) {
                if (value == dataArr[i].value)
                    return dataArr[i].name;
            }
            return "";
        };
    };
    var result = angular.copy(resultObj);
    result.link = link;
    result.templateUrl = 'tpl/html-form.html';
    return result;
});

aModuleName.directive('htmlLayer', function ($layerOptions) {
    var link = function (scope, element, attrs) {
        scope.$layerOptions = $layerOptions;

        scope.$on("layerOpen", function(event, data) {
            scope.$layerOptions.resetData();
            scope.$layerOptions.addData(data);
            $('#layerModal').modal('toggle');
        });

        scope.clickButton = function(idx) {
            scope.$emit(scope.$layerOptions.buttons[idx].emitName, scope.$layerOptions.data);
        };

        scope.changeWise11 = function() {
            scope.$layerOptions.changeWise();
        };

        scope.boxClick = function(data, clickData) {
            var idx = data.indexOf(clickData);
            if (idx == -1) {
                data.push(clickData);
                data.sort(function(a, b) {return a > b;});
            } else {
                data.splice(idx, 1);
            }
        };
        scope.isChecked = function(data, checkData) {
            return data.indexOf(checkData) != -1;
        };
        scope.getNames = function(dataArr, valueArr) {
            var names = "";
            for (var i in valueArr) {
                names += scope.getName(dataArr, valueArr[i]);
                names += "|";
            }
            names = JSON.stringify(names);
            return names.substr(1, names.length - 3);
        };

        scope.getName = function(dataArr, value) {
            for (var i in dataArr) {
                if (value == dataArr[i].value)
                    return dataArr[i].name;
            }
            return "";
        };
    };
    var result = angular.copy(resultObj);
    result.link = link;
    result.templateUrl = 'tpl/editLayer.html';
    return result;
});
