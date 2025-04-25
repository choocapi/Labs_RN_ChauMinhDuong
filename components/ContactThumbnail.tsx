import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../utils/colors";

const ContactThumbnail = ({ avatar, name, phone, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      {name !== "" && (
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {name}
        </Text>
      )}

      {phone !== "" && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{ color: colors.greyDark }} />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.phone}>
            {phone}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: '100%',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: colors.greyLight,
    borderWidth: 1,
  },
  name: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: "bold",
    color: colors.greyDark,
    maxWidth: 120,
  },
  phoneSection: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 120,
  },
  phone: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.greyDark,
    flex: 1,
  },
});

export default ContactThumbnail;
