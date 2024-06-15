import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { createAppliance } from '~/store/slices/applianceSlice';
import { colors, spacing } from '~/styles/global';

const ApplianceForm = ({ roomName, actuators, onClose }) => {
    const dispatch = useDispatch();
    const [applianceName, setApplianceName] = useState('');
    const [applianceType, setApplianceType] = useState('');
    const [selectedActuator, setSelectedActuator] = useState(actuators.length > 0 ? actuators[0].id : '');
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
        onClose();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Appliance</Text>
            <TextInput
                placeholder="Appliance Name"
                value={applianceName}
                onChangeText={setApplianceName}
                style={styles.input}
            />
            <TextInput
                placeholder="Appliance Type"
                value={applianceType}
                onChangeText={setApplianceType}
                style={styles.input}
            />
            <Picker
                selectedValue={selectedActuator}
                onValueChange={(itemValue) => setSelectedActuator(itemValue)}
                style={styles.input}
            >
                {actuators.map((actuator) => (
                    <Picker.Item key={actuator.id} label={actuator.id} value={actuator.id} />
                ))}
            </Picker>
            <Picker
                selectedValue={outputNumber}
                onValueChange={(itemValue) => setOutputNumber(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select Output Number" value="" />
                {[...Array(actuators.find(act => act.id === selectedActuator)?.outputs || 0).keys()].map(num => (
                    <Picker.Item key={num + 1} label={`${num + 1}`} value={`${num + 1}`} />
                ))}
            </Picker>
            <Button title="Add" onPress={handleAddAppliance} />
            <Button title="Cancel" color={colors.danger} onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.medium,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: spacing.large,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.dark,
        marginBottom: spacing.medium,
        padding: spacing.small,
    },
});

export default ApplianceForm;
