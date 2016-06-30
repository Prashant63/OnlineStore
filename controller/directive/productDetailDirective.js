/*
* by PKatariya 28/06/16
* render product details.
*/

store.directive('productDetail',function(){
	return {
		restrict: 'E',
		scope:{
			products: '=',
			addToCart: '=',
			removeFromCart: '=',
			productCounter: '=',
			previous: '=',
			next: '=',
			offset: '=',
			perPage: '=',
			allProduct: '='
		},
		templateUrl: 'controller/directive/productDetailView.html',
		link: function($scope){
			/*$scope.on('productsListUpdate', function(event, args){
				$scope.products = args.product.productInfo;
			});*/
		}
	};
});