import React, { useEffect } from "react";
import Loader from "../../components/loader";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "../../components/chatList";
import {
  fetchChatList,
  selectChatList,
  selectChatListLoading,
} from "../../store/api/chatListSlice";

const ChatPage = () => {
  const dispatch = useDispatch();

  const chatList = useSelector(selectChatList);
  const loading = useSelector(selectChatListLoading);

  useEffect(() => {
    dispatch(fetchChatList);
  }, []);

  return <>{loading ? <Loader /> : <ChatList chatList={chatList} />}</>;
};

export default ChatPage;
