angular
    .module('app', ['ngMessages'])

    .controller('MainCtrl', ['$scope', '$http', 'logger-service', function ($scope, $http, loggerService) {
        $scope.logs = undefined;
        $scope.theNumber = undefined;
        $scope.theText = undefined;
        $scope.paylLoad = {
            'text': '',
            'number': ''
        }

        $scope.submit = function () {
            $scope.paylLoad.text = this.theText;
            $scope.paylLoad.number = this.theNumber;

            //Update the logs
            $scope.logs = loggerService.getAll();

            // Calling the httpbin. Read more at https://httpbin.org/
            $http.post('//httpbin.org/post', $scope.paylLoad).then(function (response) {
                var timeStamp = response.config.requestTimestamp;
                var dated = new Date(timeStamp);
                var message = 'The request was made at ' + dated + ' with Text = ' + $scope.paylLoad.text + ' and Number = ' + $scope.paylLoad.number;
                loggerService.push(message);
            });
        }

        $scope.handleSubmit = function () {
            if (angular.isDefined($scope.theText) && angular.isDefined($scope.theNumber)) {
                $scope.submit();
                return;
            }
            return;
        }
    }])

    .factory('logger-service', ['$window', function (win) {
        var logMessages = [];

        var getlogMessages = function () {
            return logMessages;
        };

        var pushLogMessage = function (message) {
            if (angular.isDefined(message)) {
                logMessages.push(message);
            }
        };

        var pushLogMessage2 = function (msg) {
            if (angular.isDefined(msg)) {
                logMessages.push(msg);
                if (logMessages.length === 3) {
                    win.alert(logMessages.join('\n'));
                    logMessages = [];
                }
            }
        };

        return {
            getAll: getlogMessages,
            push: pushLogMessage,
            push2: pushLogMessage2
        };
    }])

    .factory('timestampMarker404', ['$window', function (win) {
        var timestampMarker404 = {
            request: function (config) {
                if (Math.round(config.data.number) === 404) {
                    // give up and show error
                    console.warn("404");
                    win.alert("404 error. Please input a different number");
                }
                config.requestTimestamp = new Date();
                return config;
            },
            response: function (response) {
                if (Math.round(response.data.json.number) === 404) {
                    response.status = 404;
                    return response;
                }
                win.alert("It was a 200x sucess!");
                return response;
            }
        };
        return timestampMarker404;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('timestampMarker404');
    }]);
