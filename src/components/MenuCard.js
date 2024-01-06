import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faList, faListCheck, faSignOutAlt, faDoorOpen, faPerson } from '@fortawesome/free-solid-svg-icons';


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
        <FontAwesomeIcon icon={getIcons(icon)} size={32} />
        <ContentContainer>
          <Text>{data}</Text>
        </ContentContainer>
      </ChatCardContainer>
    </Pressable>
  );
};

function getIcons(icon) {
  console.log(icon)
  if (icon == "person") {
    return faPerson
  } else if (icon == "list") {
    return faList
  } else if (icon == "exit") {
    return faSignOutAlt
  }
  return faHome
}

export default ChatTileCard;
