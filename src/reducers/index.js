const initialState = {
    menu: [],
    loading: true,
    items: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const itemInCartIndex = state.items.findIndex(item => item.id === id)
            if(itemInCartIndex !== -1){
                const itemInCart = state.items.find(item => item.id === id)
                const itemAmountIncrement = {
                    title: itemInCart.title,
                    price: itemInCart.price,
                    url: itemInCart.url,
                    id: itemInCart.id,
                    amount: itemInCart.amount +1
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInCartIndex),
                        itemAmountIncrement,
                        ...state.items.slice(itemInCartIndex +1)
                    ]
                };
            }
            else{
                const newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    amount: 1
                };
                return {
                    ...state,
                    items: [
                        ...state.items,
                        newItem
                    ]
                };
            }
            
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex +1)
                ]
            };
        default:
            return state;
    }
}

export default reducer; 