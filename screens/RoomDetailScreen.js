import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SectionList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomByName } from '~/store/slices/roomSlice';
import { fetchRules } from '~/store/slices/ruleSlice';
import { fetchAppliances } from '~/store/slices/applianceSlice';
import { Card, Title, Button, Divider, IconButton } from 'react-native-paper';
import { colors, spacing } from '~/styles/global';
import { ActuatorList, ApplianceList, FusionList } from 'components';

const RoomDetailScreen = ({ route, navigation }) => {
    const { roomName } = route.params;
    const dispatch = useDispatch();
    const { selectedRoom, loading, error } = useSelector((state) => state.rooms);
    const { appliances } = useSelector((state) => state.appliances);
    const { rules } = useSelector((state) => state.rules);

    useEffect(() => {
        dispatch(fetchRoomByName(roomName));
        dispatch(fetchAppliances());
        dispatch(fetchRules());
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

    const roomAppliances = appliances.filter((appliance) => appliance.actuatorOutput.actuator.room === roomName);
    const roomRules = rules.filter((rule) => rule.room.name === roomName);

    const renderSection = (title, data, renderItem, noDataText) => (
        <View>
            <Text style={styles.subtitle}>{title}</Text>
            {data.length > 0 ? (
                <SectionList
                    sections={[{ title, data }]}
                    keyExtractor={(item, index) => item.dbId || index.toString()}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.subtitle}>{title}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noDataText}>{noDataText}</Text>
            )}
        </View>
    );

    const currentStateCards = Object.keys(selectedRoom.currentState).map((key, index) => (
        <Card key={index} style={styles.card}>
            <Card.Content>
                <IconButton icon="information" color={colors.primary} size={30} />
                <Title>{key.charAt(0).toUpperCase() + key.slice(1)}</Title>
                <Text>{selectedRoom.currentState[key]}</Text>
            </Card.Content>
        </Card>
    ));

    return (
        <SectionList
            sections={[
                { title: 'Current State', data: currentStateCards },
                { title: 'Fusions', data: selectedRoom.fusions },
                { title: 'Actuators', data: selectedRoom.actuators },
                { title: 'Appliances', data: roomAppliances },
                { title: 'Rules', data: roomRules },
            ]}
            keyExtractor={(item, index) => item.dbId || index.toString()}
            renderItem={({ item, section }) => {
                if (section.title === 'Current State') {
                    return item;
                } else if (section.title === 'Fusions') {
                    return <FusionList fusions={[item]} />;
                } else if (section.title === 'Actuators') {
                    return <ActuatorList actuators={[item]} />;
                } else if (section.title === 'Appliances') {
                    return <ApplianceList appliances={[item]} />;
                } else if (section.title === 'Rules') {
                    return (
                        <View style={styles.ruleContainer}>
                            <Text style={styles.ruleText}>Logical String: {item.logicalString}</Text>
                            <Text style={styles.ruleText}>Action: {item.action}</Text>
                            <Text style={styles.ruleText}>Triggers:</Text>
                            {item.triggers.map((trigger, index) => (
                                <Text key={index} style={styles.ruleText}>- {trigger.physicalProperty} {trigger.operator} {trigger.value}</Text>
                            ))}
                            <Text style={styles.ruleText}>Outputs:</Text>
                            {item.outputs.map((output, index) => (
                                <Text key={index} style={styles.ruleText}>- Actuator ID: {output.actuator.id}, Output Number: {output.outputNumber}</Text>
                            ))}
                        </View>
                    );
                }
                return null;
            }}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.subtitle}>{title}</Text>
                </View>
            )}
            ListFooterComponent={() => (
                <View>
                    <Divider style={styles.divider} />
                    {selectedRoom.actuators.length > 0 && (
                        <>
                            <Button
                                mode="contained"
                                onPress={() => navigation.navigate('AddRule', { roomName: selectedRoom.name, actuators: selectedRoom.actuators })}
                                style={styles.button}
                            >
                                Add Rule
                            </Button>
                            <Button
                                mode="contained"
                                onPress={() => navigation.navigate('AddAppliance', { roomName: selectedRoom.name, actuators: selectedRoom.actuators })}
                                style={styles.button}
                            >
                                Add Appliance
                            </Button>
                        </>
                    )}
                </View>
            )}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    sectionHeader: {
        marginTop: spacing.large,
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
        marginVertical: spacing.small,
    },
    ruleContainer: {
        padding: spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    },
    ruleText: {
        fontSize: 16,
        color: colors.dark,
    },
    noDataText: {
        textAlign: 'center',
        marginVertical: spacing.medium,
        color: colors.secondary,
    },
    divider: {
        marginVertical: spacing.medium,
    },
    card: {
        marginBottom: spacing.medium,
    },
});

export default RoomDetailScreen;
