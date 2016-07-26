/// <reference path="../../js/angular.min.js" />

(function myfunction() {
    "use strict";

    angular.module("productManagement")
            .controller("ProductEditCtrl",
                        ["product", "$state",
                            ProductEditCtrl]);

    function ProductEditCtrl(product, $state) {

        var PListVM = this;
        PListVM.product = product;

        if (PListVM.product && PListVM.product.productId) {
            PListVM.title = "Edit : " + PListVM.product.productName;
        }
        else {
            PListVM.title = "New Product";
        }

        PListVM.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            
            PListVM.opened = !PListVM.opened;
        }
        
        PListVM.submit = function () {
            PListVM.product.$save(function (data) {
                toastr.success("Save Successful");
            });
        }

        PListVM.cancel = function () {
            $state.go('productList');
        }

        PListVM.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                PListVM.product.tags = PListVM.product.tags ? PListVM.product.tags.concat(array) : array;
                PListVM.newTags = "";
            } else {
                alert("Please enter one or more tags separated by commas");
            }
        }

        PListVM.removeTag = function (idx) {
            PListVM.product.tags.splice(idx, 1);
        }

    }
})();