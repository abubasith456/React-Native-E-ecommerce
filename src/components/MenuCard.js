import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faList, faListCheck, faSignOutAlt, faDoorOpen, faPerson } from '@fortawesome/free-solid-svg-icons';


// Styled components
// const ChatCardContainer = styled.View`
//   flex-direction: row;
//   padding: 10px;
//   border-bottom-width: 1px;
//   border-bottom-color: #ccc;
//   align-items: center;
// `;


const ChatTileCard = ({ icon, data, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {/* <ChatCardContainer> */}
        <FontAwesomeIcon icon={getIcons(icon)} size={20} />
        {/* <ContentContainer> */}
          <Text style={{ color: "black" }}>{data}</Text>
        {/* </ContentContainer> */}
      {/* </ChatCardContainer> */}
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
