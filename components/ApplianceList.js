import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, spacing } from '~/styles/global';

const ApplianceList = ({ appliances }) => {
    if (appliances.length === 0) {
        return <Text>No appliances available</Text>;
    }

    return (
        <FlatList
            data={appliances}
            keyExtractor={(item) => item.dbId}
            renderItem={({ item }) => (
                <View style={styles.device}>
                    <Text style={styles.deviceText}>Name: {item.name}</Text>
                    <Text style={styles.deviceText}>Type: {item.type}</Text>
                    <Text style={styles.deviceText}>Actuator ID: {item.actuatorOutput.actuator.id}</Text>
                    <Text style={styles.deviceText}>Output Number: {item.actuatorOutput.outputNumber}</Text>
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

export default ApplianceList;
