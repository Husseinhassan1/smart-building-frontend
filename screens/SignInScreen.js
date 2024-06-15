import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/slices/authSlice';
import { colors, spacing } from '../styles/global';

const SignInScreen = ({ navigation }) => {
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { token, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            navigation.navigate('Home');
        }
    }, [token]);

    const handleSignIn = () => {
        dispatch(signIn({ identity, password }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                placeholder="Username or Email"
                value={identity}
                onChangeText={setIdentity}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.link}>
                <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.medium,
        backgroundColor: colors.light,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.large,
        color: colors.dark,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.dark,
        marginBottom: spacing.medium,
        padding: spacing.small,
    },
    error: {
        color: colors.danger,
        marginBottom: spacing.medium,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: colors.light,
        fontWeight: 'bold',
    },
    link: {
        marginTop: spacing.large,
        alignItems: 'center',
    },
    linkText: {
        color: colors.primary,
    },
});

export default SignInScreen;
