import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createRule } from '~/store/slices/ruleSlice';
import { Button, TextInput, Title, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { colors, spacing } from '~/styles/global';

const RuleFormScreen = ({ route, navigation }) => {
    const { roomName } = route.params;
    const dispatch = useDispatch();
    const { appliances } = useSelector((state) => state.appliances);
    const [triggers, setTriggers] = useState([{ physicalProperty: '', value: '', operator: '', link: '' }]);
    const [selectedAppliances, setSelectedAppliances] = useState([]);
    const [action, setAction] = useState('');

    const roomAppliances = appliances.filter((appliance) => appliance.room === roomName);

    const addTrigger = () => {
        setTriggers([...triggers, { physicalProperty: '', value: '', operator: '', link: '' }]);
    };

    const handleTriggerChange = (index, field, value) => {
        const newTriggers = triggers.slice();
        newTriggers[index][field] = value;
        setTriggers(newTriggers);
    };

    const addAppliance = () => {
        setSelectedAppliances([...selectedAppliances, { id: '' }]);
    };

    const handleApplianceChange = (index, field, value) => {
        const newAppliances = selectedAppliances.slice();
        newAppliances[index][field] = value;
        setSelectedAppliances(newAppliances);
    };

    const handleAddRule = () => {
        let logicalString = '';
        triggers.forEach((trigger, index) => {
            if (index > 0) {
                logicalString += ` ${trigger.link.toUpperCase()} `;
            }
            logicalString += `[TRIGGER]`;
        });

        const actuators = selectedAppliances.map(appliance => {
            const applianceData = roomAppliances.find(a => a.dbId === appliance.id);
            return {
                id: applianceData.actuatorOutput.actuator.id,
                outputNumber: applianceData.actuatorOutput.outputNumber,
            };
        });

        dispatch(createRule({
            room: roomName,
            triggers: triggers.map(trigger => ({
                physicalProperty: trigger.physicalProperty,
                value: parseFloat(trigger.value),
                operator: trigger.operator
            })),
            logicalString,
            actuators,
            action,
        }));
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title>Add Rule</Title>
            {triggers.map((trigger, index) => (
                <View key={index} style={styles.triggerContainer}>
                    <Picker
                        selectedValue={trigger.physicalProperty}
                        onValueChange={(value) => handleTriggerChange(index, 'physicalProperty', value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Physical Property" value="" />
                        <Picker.Item label="Temperature" value="temperature" />
                        <Picker.Item label="Light" value="light" />
                        <Picker.Item label="Presence" value="presence" />
                    </Picker>
                    <TextInput
                        label="Value"
                        value={trigger.value}
                        onChangeText={(value) => handleTriggerChange(index, 'value', value)}
                        style={styles.input}
                    />
                    <Picker
                        selectedValue={trigger.operator}
                        onValueChange={(value) => handleTriggerChange(index, 'operator', value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Operator" value="" />
                        <Picker.Item label="<" value="<" />
                        <Picker.Item label=">" value=">" />
                        <Picker.Item label="<=" value="<=" />
                        <Picker.Item label=">=" value=">=" />
                        <Picker.Item label="==" value="==" />
                        <Picker.Item label="!=" value="!=" />
                    </Picker>
                    {index > 0 && (
                        <Picker
                            selectedValue={trigger.link}
                            onValueChange={(value) => handleTriggerChange(index, 'link', value)}
                            style={styles.input}
                        >
                            <Picker.Item label="Select Link" value="" />
                            <Picker.Item label="AND" value="&&" />
                            <Picker.Item label="OR" value="||" />
                        </Picker>
                    )}
                </View>
            ))}
            <Button mode="contained" onPress={addTrigger} style={styles.button}>Add Another Trigger</Button>
            <Divider style={styles.divider} />
            <Title>Appliances</Title>
            {selectedAppliances.map((appliance, index) => (
                <View key={index} style={styles.applianceContainer}>
                    <Picker
                        selectedValue={appliance.id}
                        onValueChange={(value) => handleApplianceChange(index, 'id', value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Appliance" value="" />
                        {roomAppliances.map((appl) => (
                            <Picker.Item key={appl.dbId} label={appl.name} value={appl.dbId} />
                        ))}
                    </Picker>
                </View>
            ))}
            <Button mode="contained" onPress={addAppliance} style={styles.button}>Add Another Appliance</Button>
            <Divider style={styles.divider} />
            <Picker
                selectedValue={action}
                onValueChange={setAction}
                style={styles.input}
            >
                <Picker.Item label="Select Action" value="" />
                <Picker.Item label="ON" value="ON" />
                <Picker.Item label="OFF" value="OFF" />
            </Picker>
            <Button mode="contained" onPress={handleAddRule} style={styles.button}>Add Rule</Button>
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
    triggerContainer: {
        marginBottom: spacing.medium,
    },
    input: {
        marginBottom: spacing.medium,
    },
    applianceContainer: {
        marginBottom: spacing.medium,
    },
    button: {
        marginVertical: spacing.small,
    },
    cancelButton: {
        borderColor: colors.danger,
        borderWidth: 1,
    },
    divider: {
        marginVertical: spacing.medium,
    },
});

export default RuleFormScreen;
