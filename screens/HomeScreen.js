import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/slices/authSlice';
import { fetchRooms } from '../store/slices/roomSlice';
import { colors, spacing } from '../styles/global';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (!token) {
            navigation.navigate('SignIn');
        } else {
            dispatch(fetchRooms());
        }
    }, [token]);

    const handleSignOut = () => {
        dispatch(signOut());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Rooms')} style={styles.button}>
                <Text style={styles.buttonText}>Rooms</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Rules')} style={styles.button}>
                <Text style={styles.buttonText}>Rules</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.medium,
        backgroundColor: colors.light,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.large,
        color: colors.dark,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        marginVertical: spacing.small,
        alignItems: 'center',
        borderRadius: 5,
        width: '80%',
    },
    buttonText: {
        color: colors.light,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
