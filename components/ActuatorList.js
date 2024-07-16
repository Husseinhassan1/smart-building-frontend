import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { colors, spacing } from '~/styles/global';

const ActuatorList = ({ actuators }) => {
    if (actuators.length === 0) {
        return <Text style={styles.noDataText}>No actuators available</Text>;
    }

    return (
        <View style={styles.container}>
            {actuators.map((actuator) => (
                <Card key={actuator.dbId} style={styles.card}>
                    <Card.Content>
                        <Text style={styles.deviceText}>ID: {actuator.id}</Text>
                        <Text style={styles.deviceText}>Type: {actuator.type}</Text>
                        <Text style={styles.deviceText}>Last Ping: {actuator.lastPing}</Text>
                        <Text style={styles.deviceText}>Room: {actuator.room}</Text>
                        <Text style={styles.deviceText}>Device Topic: {actuator.deviceTopic}</Text>
                    </Card.Content>
                </Card>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: spacing.medium,
        backgroundColor: colors.light,
    },
    card: {
        marginBottom: spacing.medium,
    },
    deviceText: {
        fontSize: 16,
        color: colors.dark,
    },
    noDataText: {
        textAlign: 'center',
        marginVertical: spacing.medium,
        color: colors.secondary,
    },
});

export default ActuatorList;
