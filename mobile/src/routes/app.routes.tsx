import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/home';
import { Login } from '../screens/login';
import { Register } from '../screens/register';
import { Summary } from '../screens/summary';
import { ViewDay } from '../screens/view-day';
import { Habit } from '../screens/habit';
import { Goal } from '../screens/goal';
import { Profile } from '../screens/profile';
import { useUser } from '../hooks/useUser';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  const { user } = useUser()
  return (
    <Navigator initialRouteName={user ? 'home' : 'login'} screenOptions={{ headerShown: false }}>
      <Screen
        name='login'
        component={Login}
      />
      <Screen
        name='register'
        component={Register}
      />
      <Screen
        name='home'
        component={Home}
      />
      <Screen
        name='summary'
        component={Summary}
      />
      <Screen
        name='habit'
        component={Habit}
      />
      <Screen
        name='goal'
        component={Goal}
      />
      <Screen
        name='view-day'
        component={ViewDay}
      />
      <Screen
        name='profile'
        component={Profile}
      />
    </Navigator>
  )
}