import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAppliance } from '~/store/slices/applianceSlice';
import { Button, TextInput, Title } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { colors, spacing } from '~/styles/global';

const ApplianceFormScreen = ({ route, navigation }) => {
    const { roomName, actuators } = route.params;
    const appliances = useSelector((state) => state.appliances.appliances);
    const dispatch = useDispatch();
    const [applianceName, setApplianceName] = useState('');
    const [applianceType, setApplianceType] = useState('');
    const [selectedActuator, setSelectedActuator] = useState('');
    const [outputNumber, setOutputNumber] = useState('');

    const handleAddAppliance = () => {
        dispatch(createAppliance({
            applianceData: {
                name: applianceName,
                room: roomName,
                type: applianceType,
            },
            actuatorData: {
                id: selectedActuator,
                outputNumber: parseInt(outputNumber, 10),
            },
        }));
        navigation.goBack();
    };

    const availableOutputs = selectedActuator
        ? actuators.find(a => a.id === selectedActuator)?.outputs || 0
        : 0;

    const usedOutputs = selectedActuator
        ? appliances
            .filter(appliance => appliance.actuatorOutput.actuator.id === selectedActuator)
            .map(appliance => appliance.actuatorOutput.outputNumber)
        : [];

    const outputOptions = [...Array(availableOutputs).keys()]
        .map(num => num + 1)
        .filter(output => !usedOutputs.includes(output));

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title>Add Appliance</Title>
            <TextInput
                label="Appliance Name"
                value={applianceName}
                onChangeText={setApplianceName}
                style={styles.input}
            />
            <TextInput
                label="Appliance Type"
                value={applianceType}
                onChangeText={setApplianceType}
                style={styles.input}
            />
            <Picker
                selectedValue={selectedActuator}
                onValueChange={(value) => {
                    setSelectedActuator(value);
                    setOutputNumber(''); // Reset output number when actuator changes
                }}
                style={styles.input}
            >
                <Picker.Item label="Select Actuator" value="" />
                {actuators.map((actuator) => (
                    <Picker.Item key={actuator.id} label={actuator.id} value={actuator.id} />
                ))}
            </Picker>
            <Picker
                selectedValue={outputNumber}
                onValueChange={(value) => setOutputNumber(value)}
                style={styles.input}
                enabled={outputOptions.length > 0} // Disable if no outputs available
            >
                <Picker.Item label="Select Output Number" value="" />
                {outputOptions.map(output => (
                    <Picker.Item key={output} label={`${output}`} value={`${output}`} />
                ))}
            </Picker>
            <Button mode="contained" onPress={handleAddAppliance} style={styles.button}>Add Appliance</Button>
            <Button mode="outlined" onPress={() => navigation.goBack()} style={[styles.button, styles.cancelButton]}>Cancel</Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: spacing.medium,
        backgroundColor: colors.light,
    },
    input: {
        marginBottom: spacing.medium,
    },
    button: {
        marginVertical: spacing.small,
    },
    cancelButton: {
        borderColor: colors.danger,
        borderWidth: 1,
    },
});

export default ApplianceFormScreen;
