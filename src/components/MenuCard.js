import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Pressable, StyleSheet } from 'react-native'
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


const MenuCard = ({ icon, data, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.menuContainer}>
      {/* <ChatCardContainer> */}
      <FontAwesomeIcon icon={getIcons(icon)} size={24} color="#333" style={styles.icon} />
      {/* <ContentContainer> */}
      <Text style={styles.menuText}>{data}</Text>
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

export default MenuCard;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
