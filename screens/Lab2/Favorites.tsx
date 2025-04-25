import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { fetchContacts } from "../../utils/api";
import ContactThumbnail from "../../components/ContactThumbnail";
import colors from "../../utils/colors";

const keyExtractor = ({ phone }: any) => phone;
const numColumns = 3;
const screenWidth = Dimensions.get('window').width;

const Favorites = ({navigation}: {navigation: any}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchContacts()
      .then((contacts) => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const renderFavoriteThumbnail = ({ item }: any) => {
    const { avatar, name, phone } = item;
    return (
      <View style={styles.itemContainer}>
        <ContactThumbnail
          avatar={avatar}
          name={name}
          phone={phone}
          onPress={() => navigation.navigate("Profile", { contact: item })}
        />
      </View>
    );
  };

  const favorites = contacts.filter((contact: any) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={colors.blue} />}
      {error && <Text style={styles.errorText}>Error loading favorites...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    paddingVertical: 10,
  },
  itemContainer: {
    width: screenWidth / numColumns,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  errorText: {
    color: colors.greyDark,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default Favorites;
