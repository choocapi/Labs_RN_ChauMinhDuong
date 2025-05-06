import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
  },
  textInfo: {
    fontSize: 18,
  },
});

export default ServiceDetailScreen;
