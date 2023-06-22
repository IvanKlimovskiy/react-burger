import { combineReducers } from 'redux';
import burgerConstructor from '../slices/burger-constructor';
import burgerIngredients from '../slices/burger-ingredients';
import orderDetails from '../slices/order-details';
import ingredientDetails from '../slices/ingredient-details';
import profile from '../slices/profile/profile';
import websocketFeed from '../slices/websocket-feed/websocket-feed';
import websocketHistoryOrders from '../slices/websocket-history-orders/websocket-history-orders';
import orderInformation from '../slices/order-information/order-information';
import resetPassword from '../slices/reset-password/reset-password';

const rootReducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  ingredientDetails,
  orderDetails,
  profile,
  websocketFeed,
  websocketHistoryOrders,
  orderInformation,
  resetPassword,
});

export default rootReducer;
