/*
* by PKatariya 28/06/16
* render cart details
*/

store.directive('storeCart',function(){
	return {
		restrict: 'E',
		scope:{
			productCounter: '=',
			showCart: '=',
			getPrice: '=',
			totalItemsInCart: '=',
			getTotalPrice: '='
		},
		templateUrl: 'controller/directive/storeCartView.html'
	};
});