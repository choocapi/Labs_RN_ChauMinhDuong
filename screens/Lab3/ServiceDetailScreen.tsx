import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const ServiceDetailScreen = ({ route }: { route: any }) => {
  const { service } = route.params;

  const formatDate = (date: any) => {
    if (!date) return "";
    if (typeof date === "string") return date;
    if (date.toDate) return date.toDate().toLocaleString("vi-VN");
    if (date instanceof Date) return date.toLocaleString("vi-VN");
    return "";
  };

  return (
    <ScrollView style={styles.container}>
      {service.imageUrl ? (
        <Image
          source={{ uri: service.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Service name: </Text>
          {service.name}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Price: </Text>
          {service.price?.toLocaleString()} ₫
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Creator: </Text>
          {service.creator}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Time: </Text>
          {formatDate(service.createdAt)}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Final update: </Text>
          {formatDate(service.updatedAt)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
  imagePlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#666",
    fontSize: 16,
  },
  infoContainer: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  textInfo: {
    fontSize: 18,
    marginBottom: 12,
    color: "#444",
  },
});

export default ServiceDetailScreen;
