import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, spacing } from '~/styles/global';

const FusionList = ({ fusions }) => {
    if (fusions.length === 0) {
        return <Text>No fusions available</Text>;
    }

    return (
        <FlatList
            data={fusions}
            keyExtractor={(item) => item.dbId}
            renderItem={({ item }) => (
                <View style={styles.device}>
                    <Text style={styles.deviceText}>ID: {item.id}</Text>
                    <Text style={styles.deviceText}>Type: {item.type}</Text>
                    <Text style={styles.deviceText}>Last Ping: {item.lastPing}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    device: {
        padding: spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    },
    deviceText: {
        fontSize: 16,
        color: colors.dark,
    },
});

export default FusionList;
