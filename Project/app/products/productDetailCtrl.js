/// <reference path="../../js/angular.min.js" />
(function () {

    "use strict";

    angular.module("productManagement")
           .controller("ProductDetailCtrl",
                       ["product",
                        "productService",
                        ProductDetailCtrl]);

    function ProductDetailCtrl(product, productService) {

        var PListVM = this;
        PListVM.product = product;        
        
        PListVM.title = "Product Detail : " + PListVM.product.productName;
        if (PListVM.product.tags) {
            PListVM.product.taglist = PListVM.product.tags.toString();            
        }
        PListVM.marginPercent = productService.calculateMarginPercent(PListVM.product.price,
                                                                      PListVM.product.cost);
    };
})();