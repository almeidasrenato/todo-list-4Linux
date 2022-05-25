import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Tasks from "../screens/tasks";
import AddTask from "../screens/addTask";

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="AddTask" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
