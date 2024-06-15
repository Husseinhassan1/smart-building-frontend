import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { createRule } from '../store/slices/ruleSlice';
import { colors, spacing } from '../styles/global';

const AddRuleScreen = ({ route, navigation }) => {
    const { roomId } = route.params;
    const dispatch = useDispatch();
    const room = useSelector((state) => state.rooms.rooms.find((r) => r.id === roomId));

    const [physicalProperty, setPhysicalProperty] = useState('');
    const [value, setValue] = useState('');
    const [operator, setOperator] = useState('');
    const [actuatorId, setActuatorId] = useState('');
    const [outputNumber, setOutputNumber] = useState('');
    const [action, setAction] = useState('ON');

    const handleSubmit = () => {
        const rule = {
            room: room.name,
            triggers: [
                {
                    physicalProperty,
                    value: parseInt(value),
                    operator,
                },
            ],
            logicalString: '[TRIGGER]',
            actuators: [
                {
                    id: actuatorId,
                    outputNumber: parseInt(outputNumber),
                },
            ],
            action,
        };
        dispatch(createRule(rule));
        navigation.navigate('Rules');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Rule for {room.name}</Text>
            <TextInput
                placeholder="Physical Property"
                value={physicalProperty}
                onChangeText={setPhysicalProperty}
                style={styles.input}
            />
            <TextInput
                placeholder="Value"
                value={value}
                onChangeText={setValue}
                style={styles.input}
            />
            <TextInput
                placeholder="Operator"
                value={operator}
                onChangeText={setOperator}
                style={styles.input}
            />
            <TextInput
                placeholder="Actuator ID"
                value={actuatorId}
                onChangeText={setActuatorId}
                style={styles.input}
            />
            <TextInput
                placeholder="Output Number"
                value={outputNumber}
                onChangeText={setOutputNumber}
                style={styles.input}
            />
            <Picker
                selectedValue={action}
                onValueChange={(itemValue) => setAction(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="ON" value="ON" />
                <Picker.Item label="OFF" value="OFF" />
            </Picker>
            <Button title="Create Rule" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.light,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.large,
        color: colors.dark,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.dark,
        marginBottom: spacing.medium,
        padding: spacing.small,
    },
    picker: {
        marginBottom: spacing.medium,
    },
});

export default AddRuleScreen;
