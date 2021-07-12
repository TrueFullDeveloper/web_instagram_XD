import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    messageList: [],
    companion: {
      companionId: null,
      companionName: null,
      companionPhoto: null,
    },
  },

  reducers: {
    setChat(state, { payload: { messageList, companion, chatId } }) {
      state.messageList = messageList;
      state.companion = companion;
      state.chatId = chatId;
    },
  },
});

export const { setChat } = chatSlice.actions;

export const selectMessageList = state => state.chat.messageList;
export const selectCompanion = state => state.chat.companion;
export const selectRoomId = state => state.chat.roomId;

export default chatSlice.reducer;
