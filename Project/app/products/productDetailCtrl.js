/// <reference path="../../js/angular.min.js" />
(function () {

    "use strict";

    angular.module("productManagement")
           .controller("ProductDetailCtrl",
                       ["product", ProductDetailCtrl]);

    function ProductDetailCtrl(product) {

        var PListVM = this;
        PListVM.product = product;
        //    PListVM.product = {
        //        "productId": 2,
        //        "productName": "Garden Cart",
        //        "productCode": "GDN-0023",
        //        "releaseDate": "March 18, 2010",
        //        "description": "15 gallon capacity rolling garden cart",
        //        "cost": 20.00,
        //        "price": 32.99,
        //        "category": "garden",
        //        "tags": ["barrow", "cart", "wheelbarrow"],
        //        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        //};
        
        PListVM.title = "Product Detail : " + PListVM.product.productName;
        if (PListVM.product.tags) {
            PListVM.product.taglist = PListVM.product.tags.toString();
        }
    };
})();