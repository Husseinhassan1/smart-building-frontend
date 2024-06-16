import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen, SignUpScreen, HomeScreen, RoomsScreen, RoomDetailScreen, RulesScreen, RuleFormScreen, ApplianceFormScreen } from '~/screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Rooms" component={RoomsScreen} />
                <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
                <Stack.Screen name="Rules" component={RulesScreen} />
                <Stack.Screen name="AddRule" component={RuleFormScreen} options={{ title: 'Add Rule' }} />
                <Stack.Screen name="AddAppliance" component={ApplianceFormScreen} options={{ title: 'Add Appliance' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
