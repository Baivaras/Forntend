import { NavigationActions, StackActions } from 'react-navigation'
import AppNavigation from '../Navigation/AppNavigation'

const { navigate } = NavigationActions
const { getStateForAction } = AppNavigation.router

// const resetAction = StackActions.reset({
//         index: 0,
//         actions: [NavigationActions.navigate({ routeName: 'MainActivity' })],
//     });
// this.props.navigation.dispatch(resetAction);


const INITIAL_STATE = getStateForAction(
    navigate({ routeName: 'NotLoggedInStack' })
)

const NOT_LOGGED_IN = StackActions.reset({
  index: 0,
  actions: [
    navigate({ routeName: 'NotLoggedInStack' })
  ]
})

const LOGGED_IN_STATE = StackActions.reset({
  index: 0,
  actions: [
    navigate({ routeName: 'LoggedInStack' })
  ]
})




export const reducer = (state = INITIAL_STATE, action) => {
  let nextState

  switch (action.type) {
    case 'LOGOUT':
      return NOT_LOGGED_IN
    case 'LOGIN_SUCCESS':
      return LOGGED_IN_STATE
    case 'AUTO_LOGIN':
      return LOGGED_IN_STATE
  }
  nextState = getStateForAction(action, state)
  return nextState || state
}
