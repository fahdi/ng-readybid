angular
    .module('app', ['ngMessages'])
    .controller('MainCtrl', ['$scope', 'logger-service', function ($scope, loggerService) {
        $scope.logs = undefined;
        $scope.theNumber = undefined;
        $scope.theText = undefined;
        $scope.paylLoad = {
            'text': '',
            'number': ''
        }
        $scope.submit = function () {
            if (angular.isDefined($scope.theText) && angular.isDefined($scope.theNumber)) {
                $scope.paylLoad.text = this.theText;
                $scope.paylLoad.number = this.theNumber;
            }
            console.log($scope.paylLoad);
            loggerService.push($scope.paylLoad);
            $scope.logs = loggerService.getAll();
            console.log( $scope.logs );

        }
        $scope.handleSubmit = function () {
            $scope.submit();
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
    }]);