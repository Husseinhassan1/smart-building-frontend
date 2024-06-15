import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/slices/roomSlice';
import { colors, spacing } from '../styles/global';

const RoomsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector((state) => state.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={rooms}
                keyExtractor={(item) => item.dbId}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.room}
                        onPress={() => navigation.navigate('RoomDetail', { roomName: item.name })}
                    >
                        <Text style={styles.roomText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.light,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.danger,
    },
    room: {
        padding: spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    },
    roomText: {
        fontSize: 18,
        color: colors.dark,
    },
});

export default RoomsScreen;
