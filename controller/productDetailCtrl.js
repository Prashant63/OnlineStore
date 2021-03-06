store.controller("shoppingKart",["$scope", "productDetailService", "productStorageService", 
								 function($scope, productDetailService, productStorageService){

		//Add product in Cart
		$scope.addToCart = function(product){
			if($scope.productCounter[product.prodName] == null){
				$scope.productCounter[product.prodName] = 1;
			}
			else if($scope.productCounter[product.prodName] != null){
							$scope.productCounter[product.prodName]++;
					
			}
			productStorageService.set({
				key: "storedProductQuantity",
				data: $scope.productCounter
			});
			$scope.totalItemsInCart = Object.getOwnPropertyNames($scope.productCounter).length;
			$scope.showCart = Object.getOwnPropertyNames($scope.productCounter).length > 0;

			if($scope.showCart){
				document.getElementById('menu').style.width = "75%";
			}
		}

		//Remove from cart
		$scope.removeFromCart = function(product){
			if($scope.productCounter[product.prodName] != null){
				$scope.productCounter[product.prodName]--;	
			}
			if($scope.productCounter[product.prodName] == 0){
				delete($scope.productCounter[product.prodName]);
			}
			productStorageService.set({
				key: "storedProductQuantity",
				data: $scope.productCounter
			});

			$scope.totalItemsInCart = Object.getOwnPropertyNames($scope.productCounter).length;
			$scope.showCart = Object.getOwnPropertyNames($scope.productCounter).length > 0;
			if(!$scope.showCart){
				document.getElementById('menu').style.width = "100%";
			}
		}

		//Get price for particular product and quantity of that that product
		$scope.getPrice = function(key, value){
			if($scope.products != null && $scope.products.productInfo != null){
				for(var i = 0; i < $scope.products.productInfo.length; i++){
					if($scope.products.productInfo[i].prodName == key){
						return $scope.products.productInfo[i].price * value;
					}
				}
			}
			
		}

		//Get the total price of all products
		$scope.getTotalPrice = function(){
			var price = 0;
			for(var key in $scope.productCounter){
				var value = $scope.productCounter[key];
				if($scope.products != null && $scope.products.productInfo != null){
					for(var i = 0; i < $scope.products.productInfo.length; i++){
						if($scope.products.productInfo[i].prodName == key){
							price  += $scope.products.productInfo[i].price * value;
						}
					}
				}
				
			}
			return price;
			
		}

		var init = function(){
			$scope.products = [];
			$scope.productInCart = [];
			$scope.productCounter = [];
			$scope.addProductToCart = [];
			productDetailService.get().then(function (data){
				$scope.products = data.data;
			});
			$scope.productCounter = productStorageService.get({
											key: "storedProductQuantity",
											type: "json"
									   });
			if($scope.productCounter == null){
				$scope.productCounter = {};
			}
			$scope.totalItemsInCart = Object.getOwnPropertyNames($scope.productCounter).length;
			$scope.showCart = Object.getOwnPropertyNames($scope.productCounter).length > 0;	
			
			if($scope.showCart){
				document.getElementById('menu').style.width = "75%";
			}
		}
		
		init();
}]);