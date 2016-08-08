/// <reference path="../js/angular.min.js" />
(function () {
    "use strict";
    var app = angular.module("productManagement", ["common.services",
        "ui.router",
        "ui.mask",
        "ui.bootstrap",
        "angularCharts",
        "productResourceMock"
    ]);
    app.config(["$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "app/products/productListView.html",
                    controller: "ProductListCtrl as PListVM"
                })
                .state("productEdit", {
                    abstract: true,
                    url: "/products/edit/:productId",
                    templateUrl: "app/products/productEditView.html",
                    controller: "ProductEditCtrl as PListVM",
                    resolve: {
                        productResourceVar: "productResource",
                        product: function (productResourceVar, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResourceVar.get({
                                productId: productId
                            }).$promise;
                        }
                    }
                })
                .state("productEdit.info", {
                    url: "/info",
                    templateUrl: "app/products/productEditInfoView.html",
                })
                .state("productEdit.price", {
                    url: "/info",
                    templateUrl: "app/products/productEditPriceView.html",
                })
                .state("productEdit.tags", {
                    url: "/info",
                    templateUrl: "app/products/productEditTagsView.html",
                })
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "app/products/productDetailView.html",
                    controller: "ProductDetailCtrl as PListVM",
                    resolve: {
                        productResourceVar: "productResource",
                        product: function (productResourceVar, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResourceVar.get({
                                productId: productId
                            }).$promise;
                        }
                    }
                })
                .state("priceAnalytics", {
                    url: "/priceAnalytics",
                    templateUrl: "app/prices/priceAnalyticsView.html",
                    controller: "PriceAnalyticsCtrl",
                    resolve: {
                        productResource: "productResource",

                        products: function (productResource) {
                            return productResource.query(function (response) {
                                // for success
                            }, function (response) {
                                if (response.status == 404) {
                                    alert("Error accessing resource:" + 
                                        response.config.method + " " + response.config.url);
                                }
                                else {
                                    alert(response.statusText);
                                }
                            }).$promise;
                        }
                    }
                })
        }
    ]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
                 ["$delegate",
                function ($delegate) {
                return function (exception, cause) {
                    exception.message = "Please contact help Desk! \n Message : " + exception.message;
                    $delegate(exception, cause);
                    alert(exception.message);
                };
            }]);
    });
}());