import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import colors from "@/utils/colors";

const ForgotPasswordScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [msgHelperEmail, setMsgHelperEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length == 0) {
      setMsgHelperEmail("Email is required");
      return true;
    } else if (!emailRegex.test(email)) {
      setMsgHelperEmail("Email is invalid");
      return true;
    } else {
      setMsgHelperEmail("");
      return false;
    }
  };

  const handleResetPassword = () => {
    const isEmailError = validateEmail(email);
    setEmailError(isEmailError);
    if (!isEmailError) {
      Alert.alert("Reset password info", `Email: ${email}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={require("@/assets/logolab3.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Reset your password</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Enter email"
          left={<TextInput.Icon icon="email-outline" />}
          mode="outlined"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
            setEmailError(validateEmail(email));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          theme={{
            colors: {
              primary: colors.primary,
            },
          }}
        />
        <HelperText type="error" visible={emailError}>
          {msgHelperEmail}
        </HelperText>
        <Button
          mode="contained"
          onPress={handleResetPassword}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send reset password</Text>
        </Button>
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkText}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 8,
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 36,
  },
  formContainer: {
    marginTop: 32,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: colors.primary,
    paddingVertical: 6,
  },
  linkContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  linkButton: {
    marginBottom: 8,
  },
  linkText: {
    color: colors.primary,
    fontSize: 16,
  },
});
