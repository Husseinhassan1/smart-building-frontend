import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/slices/roomSlice';
import { colors, spacing } from '../styles/global';

const RulesScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={rooms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.room}
                        onPress={() => navigation.navigate('AddRule', { roomId: item.id })}
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

export default RulesScreen;
