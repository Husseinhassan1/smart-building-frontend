import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import RoomsScreen from '../screens/RoomsScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen';
import RulesScreen from '../screens/RulesScreen';
import AddRuleScreen from '../screens/AddRuleScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Rooms" component={RoomsScreen} />
                <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
                <Stack.Screen name="Rules" component={RulesScreen} />
                <Stack.Screen name="AddRule" component={AddRuleScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
