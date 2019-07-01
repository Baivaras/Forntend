// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import axios from 'axios'
import getToken from '../Utils/Storage'
const baseURL = 'http://192.168.1.120:8080/'

// our "constructor"
const create = () => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = axios.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // getToken().then((token) => {
  //   setAuthToken(token);
  // });

  const setAuthToken = (token) => axios.defaults.headers.common['Authorization'] = 'Token ' + token // for all requests
  const removeAuthToken = () => axios.defaults.headers.common['Authorization'] = '' // for all requests
  const login = (username, password) => api.post('api/v1/operations/auth/login/', username, password)
                .then(response => ({response}))
                .catch(error => ({error}))
                
  // const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) => api.post('api/v1/auth/', data, {headers: {'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*'}})
                        .then(response => ({response}))
                        .catch(error => ({error}))

  // const getAccount = () => api.get('api/account')
  // const updateAccount = (account) => api.post('api/account', account)
  // const changePassword = (newPassword) => api.post('api/account/change_password', newPassword, {headers: {'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*'}})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAuthToken,
    removeAuthToken,
    login,
    forgotPassword,
  }
}

const login = (username, password) => {
  axios({
    method: 'post',
    url: baseURL + 'api/v1/operations/auth/login/',
    data: {
      username: username,
      password: password
    }
  });
}

// let's return back our create method as the default.
export default {
  create,
  login
}
