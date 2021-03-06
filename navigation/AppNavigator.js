import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ArticleScreen from '../screens/ArticleScreen'

const Stack = createStackNavigator()

export default AppNavigaotor = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false, title: '戻る' }}
                />
                <Stack.Screen
                    name="Article"
                    component={ArticleScreen}
                    options={{ title: '' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
