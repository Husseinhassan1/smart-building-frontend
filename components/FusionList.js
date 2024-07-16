import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { colors, spacing } from '~/styles/global';

const FusionList = ({ fusions }) => {
    if (fusions.length === 0) {
        return <Text style={styles.noDataText}>No fusions available</Text>;
    }

    return (
        <View style={styles.container}>
            {fusions.map((fusion) => (
                <Card key={fusion.dbId} style={styles.card}>
                    <Card.Content>
                        <Text style={styles.deviceText}>ID: {fusion.id}</Text>
                        <Text style={styles.deviceText}>Type: {fusion.type}</Text>
                        <Text style={styles.deviceText}>Last Ping: {fusion.lastPing}</Text>
                        <Text style={styles.deviceText}>Room: {fusion.room}</Text>
                        <Text style={styles.deviceText}>Device Topic: {fusion.deviceTopic}</Text>
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

export default FusionList;
