export const initialState = {
  basket: [],
  user: null,
};

//selector
export const getbasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
//get the 'basket', optional chaining to prevent errors, 'reduce' fn maps through each basket object
//in otherwords reduce iterates the basket and then tallyup the total
//here-->reduce(initialamount, iterate)=> item.price(itemprice when everytime loops through) + amount,0(Initail amount going to be zero)

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      //findIndex -> find the first match and returns it
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cant remove product (id: ${action.id}) as its not in bucket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
