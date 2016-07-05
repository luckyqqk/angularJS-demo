var aTest = angular.module('testApp', ['customHtmlLabel']);
aTest.controller("testController", ["$tableOptions", "$formOptions", "$layerOptions", "$scope", "$http", function ($tableOptions, $formOptions, $layerOptions, $scope, $http) {
   
	$scope.testPost = function () {
        $http.post('uri', {"value": "test post to server"})
            .success(function (data, code) {
                alert("data::" + JSON.stringify(data));
            })
            .error(function (response, code, headers, config) {
                alert("post失败!");
            });
    };
    $scope.testGet = function () {
        $http.get('uri?getId=232')
            .success(function (data, code) {
                alert("data::" + JSON.stringify(data));
            })
            .error(function (response, code, headers, config) {
                alert("get失败!");
            });
    };
    $scope.testPut = function () {
        $http.put('uri', {"value": "test put to server"})
            .success(function (data, code) {
                alert("data::" + JSON.stringify(data));
            })
            .error(function (response, code, headers, config) {
                alert("put失败!");
            });
    };
    $scope.testDelete = function () {
        $http.delete('uri?deleteId=232')
            .success(function (data, code) {
                alert("data::" + JSON.stringify(data));
            })
            .error(function (response, code, headers, config) {
                alert("delete失败!");
            });
    };

    $scope.changeWise = function() {
        $tableOptions.changeWise();
    };
    $scope.$on("doubleClick", function(event, data) {
        $scope.$broadcast("layerOpen", data);
    });
    $scope.$on("layerSubmit", function(event, data) {
        alert("layerSubmit" + JSON.stringify(data));
    });

    $scope.$on("layerDelete", function(event, data) {
        alert("layerDelete" + JSON.stringify(data));
    });  

    $scope.load = function() {
        //* 我们自定义了2种标签:html-table和html-form
        //* html-table以表格的方式展示json格式的数据,
        //* html-form以表格的方式编辑json格式的数据.
        //* 使用方法和示例如下:

        //* 第一步,创建angular.module时,依赖注入标签所在module:'customHtmlLabel'
        //*          示例代码:   angular.module('testApp', ['customHtmlLabel']);

        //* 第二步,controller中要引用所需要的标签变量$tableOptions, $formOptions
        //*          示例代码:   .controller("testController", ["$tableOptions", "$formOptions", function ($tableOptions, $formOptions) {

        //* 第三步,在所用标签变量中加入列表的头信息.
        //*          示例代码:   $tableOptions.addColumnOption("age", "下拉框(select)", "select");

        //* 第四步,(如果没有用到 下拉/单选/复选 功能,跳过此步骤)在列中加入二级内容.(三四步骤,顺序不能颠倒)
        //*          示例代码:   $tableOptions.addSonOptions("age", $scope.basicSelectOptions);

        //* 第五步,加入需要展示的数据(json)
        //*          示例代码:   $tableOptions.setData($scope.serverData);

        //* 最后一步,在html页面中加入自定义标签
        //*          示例代码:
        //*                  html
        //*                    body
        //*                     html-table

        // 方法说明和示例如下:

        // 我们自定义标签拥均有3个方法:
        // addColumnOption(dataKey, label, htmlType)
        // addSonOptions(dataKey, sonOptions)
        // setData(data)

        // addColumnOption(dataKey, label, htmlType)    用于添加列表的头信息:
        //  dataKey 数据字段key
        //  label   列头信息
        //  htmlType    html处理标签
        //  $tableOptions中htmlType支持范围: a,b,i,u,p,img,select,checkbox,radio. 默认:text显示
        //  $formOptions中htmlType支持范围: readonly, b,i,u,p,text,textarea,email,url,select,checkbox,radio.默认:readonly
        $tableOptions.addColumnOption("name", "只读(readonly)", "i");
        $tableOptions.addColumnOption("nick", "输入框(text)", "text");
        $tableOptions.addColumnOption("age", "下拉框(select)", "select");
        $tableOptions.addColumnOption("gender", "单选框(radio)", "radio");
        $tableOptions.addColumnOption("weekday", "复选框(checkbox)", "checkbox");
        $tableOptions.addColumnOption("introduction", "文本域(textarea)", "textarea");

        // addSonOptions(dataKey, sonOptions)   用户处理下拉框/单选框/复选框的内容,称为二级内容.
        //  dataKey 数据字段key
        //  sonOptions  二级内容    array   每个array元素有且仅需要有name和value属性,不然添加失败,并抛出异常.
        $tableOptions.addSonOptions("age", $scope.basicSelectOptions);
        $tableOptions.addSonOptions("gender", $scope.basicRadioOptions);
        $tableOptions.addSonOptions("weekday", $scope.basicCheckboxOptions);

        //setData(data) 加入我们所需展示的数据(一级内容)
        // data 数据(json)
        $tableOptions.setData($scope.serverData);


        $formOptions.addColumnOption("name", "只读(readonly)", "i");
        $formOptions.addColumnOption("nick", "输入框(text)", "text");
        $formOptions.addColumnOption("age", "下拉框(select)", "select");
        $formOptions.addColumnOption("gender", "单选框(radio)", "radio");
        $formOptions.addColumnOption("weekday", "复选框(checkbox)", "checkbox");
        $formOptions.addColumnOption("introduction", "文本域(textarea)", "textarea");

        $formOptions.addSonOptions("age", $scope.basicSelectOptions);
        $formOptions.addSonOptions("gender", $scope.basicRadioOptions);
        $formOptions.addSonOptions("weekday", $scope.basicCheckboxOptions);

        $formOptions.setData($scope.serverData);

        $layerOptions.addColumnOption("name", "只读(readonly)", "i");
        $layerOptions.addColumnOption("nick", "输入框(text)", "text");
        $layerOptions.addColumnOption("age", "下拉框(select)", "select");
        $layerOptions.addColumnOption("gender", "单选框(radio)", "radio");
        $layerOptions.addColumnOption("weekday", "复选框(checkbox)", "checkbox");
        $layerOptions.addColumnOption("introduction", "文本域(textarea)", "textarea");

        $layerOptions.addSonOptions("age", $scope.basicSelectOptions);
        $layerOptions.addSonOptions("gender", $scope.basicRadioOptions);
        $layerOptions.addSonOptions("weekday", $scope.basicCheckboxOptions);

        $layerOptions.addButton("提交", "layerSubmit", "3");
        $layerOptions.addButton("删除", "layerDelete", "2");
    };

    // 以下均为测试数据

    // 这是我们要展示/编辑的json,一般从$http.get获得
    $scope.serverData = [{
        name: "kai",
        nick:"^_^",
        age: "3",
        gender: "0",
        weekday: ["1", "4"],
        introduction: "内容已经跟数据绑定,页面修改无须提交数据就会相应的更改."
    }, {
        name: "ye",
        nick:"o.o",
        age: "4",
        gender: "1",
        weekday: ["2", "5"],
        introduction: "内容已经跟数据绑定,页面修改无须提交数据就会相应的更改.试一试!"
    }];

    // 这是我们下拉框内容的格式,一般由$http.get获得
    // 注意每个元素中都有且仅需有name和value字段
    $scope.basicSelectOptions = [
        {name: "0-10", value: "0"},
        {name: "10-20", value: "1"},
        {name: "20-30", value: "2"},
        {name: "30-50", value: "3"},
        {name: "50-70", value: "4"},
        {name: "70-90", value: "5"},
        {name: "90以上", value: "6"}
    ];
    // 这是我们单选框的格式,一般由$http.get获得
    // 注意每个元素中都有且仅需有name和value字段
    $scope.basicRadioOptions = [
        {name: "男", value: "1"},
        {name: "女", value: "0"}
    ];
    // 这是我们复选框的格式,一般由$http.get获得
    // 注意每个元素中都有且仅需有name和value字段
    $scope.basicCheckboxOptions = [
        {name: "星期一", value: "1"},
        {name: "星期二", value: "2"},
        {name: "星期三", value: "3"},
        {name: "星期四", value: "4"},
        {name: "星期五", value: "5"},
        {name: "星期六", value: "6"},
        {name: "星期日", value: "0"}
    ];
}]);

