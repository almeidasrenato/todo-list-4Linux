import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, SafeAreaView, Platform } from 'react-native'

import { AppRoutes } from './src/routes'

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <AppRoutes />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF6F5',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 28 : 0,
    },
})
