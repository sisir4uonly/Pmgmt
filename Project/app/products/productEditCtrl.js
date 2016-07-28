/// <reference path="../../js/angular.min.js" />

(function myfunction() {
    "use strict";

    angular.module("productManagement")
            .controller("ProductEditCtrl",
                        ["product",
                          "$state",
                          "productService",
                           ProductEditCtrl]);

    function ProductEditCtrl(product, $state, productService) {

        var PListVM = this;
        PListVM.product = product;
        PListVM.priceOption = "percent";
        PListVM.marginPercent = function () {
            return productService.calculateMarginPercent(PListVM.product.price
                                                       , PListVM.product.cost);
        };

        PListVM.calculatePrice = function () {
            var price = 0;
            if (PListVM.priceOption == 'amount') {
                price = productService.calculatePriceFromMarkupAmount(PListVM.product.cost, PListVM.markupAmount);
            }
            if (PListVM.priceOption == 'percent') {
                price = productService.calculatePriceFromMarkupPercent(PListVM.product.cost, PListVM.markupPercent);
            }
            PListVM.product.price = price;
        };

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
        
        PListVM.submit = function (isValid) {
            if (isValid) {
                PListVM.product.$save(function (data) {
                    toastr.success("Save Successful");

                })
            }
            else {
                alert('correct validation err');
            }
            
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