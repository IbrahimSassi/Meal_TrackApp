var app = angular.module('mealtrack.services.meals', []);




app.service("MealService", function ($q,ItemsModel,AuthService) {
	var self = {
		'page': 0,
		'page_size': 20,
		'isLoading': false,
		'isSaving': false,
		'hasMore': true,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var d = $q.defer();

            ItemsModel.getByUser(AuthService.CurrentUser.userId)
                .then(function (result) {
                    console.log(result);
                    if(result.data.length == result.data.length){
                        self.hasMore=false;
                    }

                    self.results=result.data;


                    d.resolve(result);
                }, function (err) {
                    console.log(err);
                    d.reject(err);
                });




            //TODO



			return d.promise;
		},
		'track': function (data) {
			self.isSaving = true;
			var d = $q.defer();
            var meal = {
                "owner":AuthService.CurrentUser.userId,
                "title": data.title,
                "category":data.category,
                "calories" :data.calories,
                "picture" : data.picture,
                "created":new Date()
            };
            ItemsModel.create(meal)
                .then(function (result) {
                    console.log("SUCCESS");
                    console.log(result.config.data);
                    self.results.unshift(meal);
                    d.resolve(result);
                }, function (err) {
                    console.log(err);
                    d.reject(err);
                });






			return d.promise;
		}

	};

	return self;
});