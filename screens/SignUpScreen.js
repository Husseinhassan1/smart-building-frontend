import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/slices/authSlice';
import { colors, spacing } from '../styles/global';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSignUp = () => {
        dispatch(signUp({ username, email, password, passwordConfirm, name }))
            .unwrap()
            .then(() => {
                navigation.navigate('SignIn');
            })
            .catch((err) => {
                // Handle errors if necessary, you can also set a local state for displaying the error message
                // console.error(err);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Sign In</Text>
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

export default SignUpScreen;
