import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, updateRoomImage } from '~/store/slices/roomSlice';
import { fetchAppliances } from '~/store/slices/applianceSlice';
import { fetchRules } from '~/store/slices/ruleSlice';
import { Button, Card, Title, Paragraph, IconButton, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing } from '~/styles/global';
import { API_BASE_URL } from 'services/api';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector((state) => state.rooms);
    const { appliances } = useSelector((state) => state.appliances);
    const { rules } = useSelector((state) => state.rules);

    useEffect(() => {
        dispatch(fetchRooms());
        dispatch(fetchAppliances());
        dispatch(fetchRules());
    }, [dispatch, rooms.image]);

    const handleSelectImage = async (roomName) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            const image = {
                uri: selectedAsset.uri,
                type: selectedAsset.mimeType || 'image/jpeg',
                fileName: selectedAsset.fileName || selectedAsset.uri.split('/').pop(),
            };
            dispatch(updateRoomImage({ roomName, image }));
        }
    };


    const renderRoomCard = ({ item }) => {
        const roomAppliances = appliances.filter((appliance) => appliance.room === item.name);
        const roomRules = rules.filter((rule) => rule.room.name === item.name);

        return (
            <Card style={styles.card}>
                <Card.Cover source={{ uri: `http://images.${API_BASE_URL}${item.image}` || 'https://via.placeholder.com/150' }} />
                <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>{roomAppliances.length} appliances connected</Paragraph>
                    <Paragraph>{roomRules.length} rules defined</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => navigation.navigate('RoomDetail', { roomName: item.name })}>View Room</Button>
                    <IconButton icon="camera" onPress={() => handleSelectImage(item.name)} />
                </Card.Actions>
            </Card>
        );
    };

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

    return (
        <FlatList
            data={rooms}
            keyExtractor={(item) => item.dbId}
            renderItem={renderRoomCard}
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
    card: {
        marginBottom: spacing.medium,
    },
});

export default HomeScreen;
