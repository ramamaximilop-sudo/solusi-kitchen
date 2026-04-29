import { Product } from './type';
import { freezerProducts } from './categories/freezer-equipment';
import { displayCoolerProducts } from './categories/display-cooler';
import { dispenserRefrigeratorProducts } from './categories/dispenser-refrigerator';
import { iceMakerProducts } from './categories/ice-maker';
import { iceCreamProducts } from './categories/ice-cream-equipment';
import { stainlesskitchenproducts } from './categories/stainless-kitchen';
import { coldRoomProducts } from './categories/cold-room-storage';
import { miscellaneousProducts } from './categories/miscellaneous';
import { medicalProducts } from './categories/medical-refrigeration';
import { foodCookingProducts } from './categories/food-cooking-equipment';
import { meatFishProducts } from './categories/meat-fish-equipmennt';
import { fruitVegetableProducts } from './categories/fruit-vegetable-equipment';
import { barHotelProducts } from './categories/bar-hotel-equipment';
import { bakeryNoodleProducts } from './categories/bakery-noodle-equipment';
import { packagingProducts } from './categories/packaging-equipment';
import { chafingDishProducts } from './categories/chafing-dish-equipment';
import { dishWasherProducts } from './categories/dish-washer-equipment';
import { minimarketSupermarketEquipmentProducts } from './categories/minimarket-equipment';


export const allProducts: Product[] = [
  ...freezerProducts,
  ...displayCoolerProducts,
  ...dispenserRefrigeratorProducts,
  ...iceMakerProducts,
  ...iceCreamProducts,
  ...stainlesskitchenproducts,
  ...coldRoomProducts,
  ...miscellaneousProducts,
  ...medicalProducts,
  ...foodCookingProducts,
  ...meatFishProducts,
  ...fruitVegetableProducts,
  ...barHotelProducts,
  ...bakeryNoodleProducts,
  ...packagingProducts,
  ...chafingDishProducts,
  ...dishWasherProducts,
  ...minimarketSupermarketEquipmentProducts,
];

export const PRODUCTS = allProducts;
export type { Product };
