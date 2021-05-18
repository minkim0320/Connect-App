var connectApp = angular.module('connectApp', ['ngRoute']);

connectApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html'
        })
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/upload', {
            templateUrl: 'views/addpost.html',
            controller: 'uploadCtrl'
        })
        .when('/posts', {
            templateUrl: 'views/postlist.html',
            controller: 'postCtrl'
        })
        .when('/posts/:id', {
            templateUrl: 'views/singlepost.html',
            controller: 'singlepostCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);


connectApp.controller('navCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.updatecat = function (param) {
        $rootScope.cate = param;
        $rootScope.$broadcast('changeCategory', param);
    }
}]);

connectApp.controller('uploadCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.categories = ['Software Projects', 'Sport Teams', 'Social', 'Other'];
    var picurl=['assets/types-of-software.png', 'assets/sports.jpg', 'assets/social.jpg', 'assets/world.png']

    $scope.addPost = function () {
        cat = $scope.newpost.category;
        var count = 0;
        for (let category of $scope.categories) {
            if (category.localeCompare(cat) == 0) {
                $scope.newpost.picurl = picurl[count];
                break;
            }  
            count++;
        }
        
        temp = {
            title: $scope.newpost.title,
            description: $scope.newpost.description,
            memberdesc: $scope.newpost.memberdesc,
            nummembers: $scope.newpost.nummembers,
            teamdesc: $scope.newpost.teamdesc,
            creator: $scope.newpost.creator,
            contact: $scope.newpost.contact,
            category: $scope.newpost.category,
            picurl: $scope.newpost.picurl
        }

        $http.post('api/postinfo', JSON.stringify(temp)).then(function(data) {
            temp = data;
            window.alert("Post was successfully posted")
            $location.path('/posts');
        });
    }
}]);

connectApp.controller('postCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    var localCategory;
    $scope.$on('changeCategory', function(event, data) {
        localCategory = $rootScope.cate;
        if (localCategory.localeCompare('All') == 0) {
            $scope.localCateg = 'All Posts';
        } else {
            $scope.localCateg = localCategory;
        }
        getApiCall();
    });


    // $scope.updatecat = function (param) {
    localCategory = $rootScope.cate;
    if (localCategory == null) {
        localCategory = 'All';
    }
    if (localCategory != null && localCategory.localeCompare('All') == 0) {
        $scope.localCateg = 'All Posts';
    } else {
        $scope.localCateg = localCategory;
    }
    console.log(localCategory);
    getApiCall();
    function getApiCall () {
        $http.get('api/postinfo').then(function(data) {
            console.log(data.data);
            respon = data.data;
            newResponse = [];
            count = 0;
            temp = [];
            for (let post of respon) {
                console.log('post')
                console.log(post.category);
                console.log('local')
                console.log(localCategory);
                if (post.category.localeCompare(localCategory) == 0 || localCategory.localeCompare('All') == 0) {
                    console.log('here');
                    temp.push(post);
                    if (temp.length == 3 || ((newResponse.length*3)+temp.length) == respon.length - count) {
                        console.log('hiii');
                        newResponse.push([...temp]);
                        temp.splice(0, temp.length);
                    }
                } else {
                    count++;
                }
                console.log(count);
            }
            if (((newResponse.length*3)+temp.length) == respon.length - count){
                console.log('hiii');
                newResponse.push([...temp]);
                temp.splice(0, temp.length);
            }
            $scope.posts = newResponse;
            console.log(newResponse.length)
        });
    }
    // }
}]);

connectApp.controller('singlepostCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
    
    routeId = $routeParams.id;
    var url = 'api/postinfo/' + routeId;


    getThisApiCall();
    
    function getThisApiCall () {
        $http.get(url).then(function(data) {
            $scope.post = data.data;
        });
    }

    
    
    $scope.removePostId = function () {
        $http.delete(url).then(function(data) {
            window.alert("Post was successfully deleted");
            $location.path('/posts');
        });
    }
}]);