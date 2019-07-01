import { put, call, cancel, fork, take, cancelled } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import Api from '../Services/Api'
import { saveToken, clearToken } from '../Utils/Storage'
// import console = require('console');

function * authorize(username, password) {
    try {
        // console.log('here authorize')
        const data = yield call(Api.login(username, password));
        // call method works, but does not go for further steps to login success below. 
        console.log(data);
        yield put(LoginActions.loginSuccess(username));
        yield put(setAuthToken, data.token)
        yield call(saveToken, data.token)


    } catch (error){
        yield put(LoginActions.loginFailure(error))
    } finally {
        if (yield cancelled()) {

        }
    }
}

// attempts to login
export function * loginFlow () {
    while (true) {
        
        const { username, password } = yield take('LOGIN_REQUEST');
        // To express non-blocking calls, the library provides another Effect: fork.
        // When we fork a task, the task is started in the background and the caller
        // can continue its flow without waiting for the forked task to terminate.
        console.log('here loginflow')
        const task = yield fork(authorize, username, password);
        const logoutCall = yield take(['LOGOUT', 'LOGIN_FAILURE']);

        if (logoutCall.type === 'LOGOUT') {
            yield cancel(task);
        }
        yield call(removeAuthToken)
        yield call(clearToken)
    }
}