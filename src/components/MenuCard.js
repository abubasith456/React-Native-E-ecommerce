import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Pressable } from 'react-native'


// Styled components
const ChatCardContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const ContentContainer = styled.View`
left:10;
  flex: 1;
`;

const SenderName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const LastMessage = styled.Text`
  color: #555;
`;

const TimeStamp = styled.Text`
  color: #888;
  font-size: 12px;
`;

const ChatTileCard = ({ icon, data, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <ChatCardContainer>
                <Ionicons name={icon} size={40} color={40}/>
                <ContentContainer>
                    <Text>{data}</Text>
                </ContentContainer>
            </ChatCardContainer>
        </Pressable>
    );
};

export default ChatTileCard;
