/// <reference path="../../js/angular.min.js" />

(function myfunction() {
    "use strict";

    angular.module("productManagement")
            .controller("ProductEditCtrl",
                        ["product", ProductEditCtrl]);

    function ProductEditCtrl(product) {

        var PListVM = this;
        PListVM.product = product;

        if (PListVM.product && PListVM.product.productId) {
            PListVM.title = "Edit : " + PListVM.product.productName;
        }
        else {
            PListVM.title = "New Product";
        }
    }
})();