import thunk from 'redux-thunk';

const logger = store => next => action => {
    let result = next(action);
    console.group('state');
        console.log('action', action);
        console.log('state', store.getState());
    console.groupEnd('state');
    return result;
}

const middlewares = [logger, thunk];
export default middlewares;