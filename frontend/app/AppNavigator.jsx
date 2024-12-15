import Hero from '../screens/Hero/Hero'
import TabNavigator from './(tabs)/TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator(); 

const AppNavigator = () => (
     <Stack.Navigator initialRouteName="Splash">
       <Stack.Screen name="Hero" component={Hero} options={{ headerShown: false }} />
       {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
       <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
     </Stack.Navigator>
   );
export default AppNavigator;