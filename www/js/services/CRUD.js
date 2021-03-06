var app = angular.module('mealtrack.services.CRUD', []);








app.service('ItemsModel', function ($http, Backand) {
    var service = this,
        baseUrl = '/1/objects/',
        objectName = 'Meal/';

    function getUrl() {
        return Backand.getApiUrl() + baseUrl + objectName;
    }


    service.all = function () {
        return $http.get(getUrl());
    };

    service.fetch = function (id) {
        return $http.get(getUrlForId(id));
    };

    service.create = function (object) {
        return $http.post(getUrl(), object);
    };

    service.update = function (id, object) {
        return $http.put(getUrlForId(id), object);
    };

    service.delete = function (id) {
        return $http.delete(getUrlForId(id));
    };

    service.getByUser = function (idUser) {
        return $http ({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/MealByUser',
            params: {
                parameters: {
                    UserId: idUser
                }
            }
        });
    };
});


app.service('UsersModel', function ($http, Backand) {
    var service = this,
        baseUrl = '/1/objects/',
        objectName = 'users/';


    function getUrl() {
        return Backand.getApiUrl() + baseUrl + objectName;
    }


    function getUrlForId(id) {
        return getUrl() + id;
    }


    service.update = function (id, object) {
        return $http.put(getUrlForId(id), object);
    };

    service.delete = function (id) {
        return $http.delete(getUrlForId(id));
    };
});



