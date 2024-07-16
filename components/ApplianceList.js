import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-native-paper';
import { toggleApplianceState } from '~/store/slices/applianceSlice';
import { colors, spacing } from '~/styles/global';

const ApplianceList = ({ appliances }) => {
    const dispatch = useDispatch();
    const [applianceStates, setApplianceStates] = useState({});

    useEffect(() => {
        const initialStates = appliances.reduce((acc, appliance) => {
            if (!acc[appliance.dbId]) {
                acc[appliance.dbId] = 'OFF';
            }
            return acc;
        }, {});
        setApplianceStates(initialStates);
    }, []);

    const handleToggle = (appliance) => {
        const newState = applianceStates[appliance.dbId] === 'OFF' ? 'ON' : 'OFF';
        setApplianceStates((prevStates) => ({
            ...prevStates,
            [appliance.dbId]: newState,
        }));
        const { room, actuatorOutput: { actuator, outputNumber } } = appliance;
        dispatch(toggleApplianceState({ room, actuatorID: actuator.id, outputNumber, currentState: newState }));
    };

    if (appliances.length === 0) {
        return <Text style={styles.noDataText}>No appliances available</Text>;
    }

    return (
        <View style={styles.container}>
            {appliances.map((appliance) => (
                <Card key={appliance.dbId} style={styles.card}>
                    <Card.Content>
                        <Text style={styles.deviceText}>Name: {appliance.name}</Text>
                        <Text style={styles.deviceText}>Type: {appliance.type}</Text>
                        <Text style={styles.deviceText}>Actuator ID: {appliance.actuatorOutput.actuator.id}</Text>
                        <Text style={styles.deviceText}>Output Number: {appliance.actuatorOutput.outputNumber}</Text>
                        <Text style={styles.deviceText}>Current State: {applianceStates[appliance.dbId]}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={() => handleToggle(appliance)}>
                            Turn {applianceStates[appliance.dbId] === 'OFF' ? 'ON' : 'OFF'}
                        </Button>
                    </Card.Actions>
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

export default ApplianceList;
