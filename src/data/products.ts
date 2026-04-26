import { Product } from './type';
import { freezerProducts } from './categories/freezer';
import { displayCoolerProducts } from './categories/display-cooler';
import { dispenserRefrigeratorProducts } from './categories/dispenser-refrigerator';
import { iceMakerProducts } from './categories/ice-maker';
import { iceCreamProducts } from './categories/ice-cream-equipment';
import { stainlesskitchenproducts } from './categories/stainless-kitchen';
import { coldRoomProducts } from './categories/cold-room-storage';
import { miscellaneousProducts } from './categories/miscellaneous';
import { medicalProducts } from './categories/medical-refrigation';
import { commercialProcessingProducts } from './categories/commercial-processing';
import { foodCookingProducts } from './categories/food-cooking-equipment';
import { meatFishProducts } from './categories/Meat-Fish-Equipmennt';
import { fruitVegetableProducts } from './categories/fruit-vegetable-equipment';
import { barHotelProducts } from './categories/bar-hotel-equipment';
import { bakeryNoodleProducts } from './categories/bakery-noodle';
import { packagingProducts } from './categories/packaging';
import { chafingDishProducts } from './categories/chafing-dish';
import { dishWasherProducts } from './categories/dish-washer';
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
  ...commercialProcessingProducts,
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

// Alias for backward compatibility
export const PRODUCTS = allProducts;
export type { Product };
