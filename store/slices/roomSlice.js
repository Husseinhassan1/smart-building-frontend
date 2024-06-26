import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRooms as fetchRoomsService, fetchRoomByName as fetchRoomByNameService, updateRoomImage as updateRoomImageService } from '../../services/api';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    const response = await fetchRoomsService();
    return response.data;
});

export const fetchRoomByName = createAsyncThunk('rooms/fetchRoomByName', async (name) => {
    const response = await fetchRoomByNameService(name);
    return response.data;
});

export const updateRoomImage = createAsyncThunk('rooms/', async ({ roomName, image }) => {
    const formData = new FormData();
    formData.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
    });

    const response = await updateRoomImageService(roomName, formData);
    return response.data;
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState: { rooms: [], selectedRoom: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.loading = false;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchRoomByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoomByName.fulfilled, (state, action) => {
                state.selectedRoom = action.payload;
                state.loading = false;
            })
            .addCase(fetchRoomByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateRoomImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRoomImage.fulfilled, (state, action) => {
                const updatedRoom = action.payload;
                const index = state.rooms.findIndex(room => room.name === updatedRoom.name);
                if (index !== -1) {
                    state.rooms[index] = updatedRoom;
                }
                state.loading = false;
            })
            .addCase(updateRoomImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default roomSlice.reducer;
