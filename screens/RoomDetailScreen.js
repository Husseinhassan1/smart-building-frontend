import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomByName } from '~/store/slices/roomSlice';
import { fetchAppliances } from '~/store/slices/applianceSlice';
import { colors, spacing } from '~/styles/global';
import ApplianceForm from '~/components/ApplianceForm';
import FusionList from '~/components/FusionList';
import ActuatorList from '~/components/ActuatorList';
import ApplianceList from '~/components/ApplianceList';

const RoomDetailScreen = ({ route, navigation }) => {
    const { roomName } = route.params;
    const dispatch = useDispatch();
    const { selectedRoom, loading, error } = useSelector((state) => state.rooms);
    const { appliances } = useSelector((state) => state.appliances);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchRoomByName(roomName));
        dispatch(fetchAppliances());
    }, [dispatch, roomName]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!selectedRoom) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Room not found.</Text>
            </View>
        );
    }

    const roomAppliances = appliances.filter((appliance) => appliance.room === roomName);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{selectedRoom.name}</Text>
            <Text style={styles.subtitle}>Fusions</Text>
            <FusionList fusions={selectedRoom.fusions} />
            <Text style={styles.subtitle}>Actuators</Text>
            <ActuatorList actuators={selectedRoom.actuators} />
            <Text style={styles.subtitle}>Appliances</Text>
            <ApplianceList appliances={roomAppliances} />
            {selectedRoom.actuators.length > 0 && (
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Add Appliance</Text>
                </TouchableOpacity>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <ApplianceForm
                            roomName={selectedRoom.name}
                            actuators={selectedRoom.actuators}
                            onClose={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.light,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.danger,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.large,
        color: colors.dark,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: spacing.medium,
        color: colors.secondary,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: spacing.large,
    },
    buttonText: {
        color: colors.light,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
});

export default RoomDetailScreen;
