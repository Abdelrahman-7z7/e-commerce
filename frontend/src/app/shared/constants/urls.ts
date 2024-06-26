// after publishing the website the localhost will be replaced with the host website name
const BASE_URL = 'http://localhost:5001';


export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
// we put at the end a slash cuz we have a route that will be past at the end
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAGS_URL = FOODS_URL + '/tag/';
export const FOODS_BY_ID_URL = FOODS_URL + '/'; // localhost:5001/api/foods/:id

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDER_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDER_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDER_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDER_URL + '/pay';

export const ORDER_TRACK_URL = ORDER_URL + '/track/';









