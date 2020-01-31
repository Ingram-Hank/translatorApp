import thunk from 'redux-thunk';

const logger = store => next => action => {
    let result = next(action);
    console.groupCollapsed('action---------state');
        console.log('action', action);
        console.log('state', store.getState());
    console.groupEnd();
    return result;
}

const middlewares = [logger, thunk];
export default middlewares;