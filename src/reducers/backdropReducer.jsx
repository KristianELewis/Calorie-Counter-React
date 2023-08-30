
//this should be replaced and removed. unecessary to have a reducer for this
const backdropReducer = (state, action) => {

    switch (action.type){
        case "ADDITEM":
            return {open : true, choice : 2, loggedID : -1, dispatch : action.dispatch, meal : action.meal};
        case "DELETEITEM":
            return {open : true, choice : 1, loggedID : action.loggedID, dispatch : action.dispatch}
        case "CHANGEAMOUNT":
            return {open : true, choice : 0, loggedID : action.loggedID, dispatch : action.dispatch}
        case "CLOSEBACKDROP":
            return {open : false, choice : -1};
    }
}

export default backdropReducer;