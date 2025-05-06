import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { HelperText, Button, TextInput } from "react-native-paper";
import colors from "@/utils/colors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msgHelperEmail, setMsgHelperEmail] = useState("");
  const [msgHelperName, setMsgHelperName] = useState("");
  const [msgHelperPassword, setMsgHelperPassword] = useState("");
  const [msgHelperConfirmPassword, setMsgHelperConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

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

  const validateName = (name: string) => {
    if (name.length == 0) {
      setMsgHelperEmail("Name is required");
      return true;
    } else {
      setMsgHelperEmail("");
      return false;
    }
  };

  const validatePassword = (password: string) => {
    if (password.length == 0) {
      setMsgHelperPassword("Password is required");
      return true;
    } else if (password.length < 8) {
      setMsgHelperPassword("Password must be at least 8 characters long");
      return true;
    } else {
      setMsgHelperPassword("");
      return false;
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword.length == 0) {
      setMsgHelperConfirmPassword("Confirm password is required");
      return true;
    } else if (confirmPassword !== password) {
      setMsgHelperConfirmPassword("Passwords do not match");
      return true;
    } else {
      setMsgHelperConfirmPassword("");
      return false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid,
      });
      return { success: true, msg: "Đăng ký thành công!" };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)")) msg = "Email đã tồn tại";
      if (msg.includes("(auth/network-request-failed)"))
        msg = "Mạng không ổn định";
      return { success: false, msg };
    }
  };

  const handleRegister = async () => {
    const isEmailError = validateEmail(email);
    const isPasswordError = validatePassword(password);
    const isConfirmPasswordError = validateConfirmPassword(confirmPassword);
    setEmailError(isEmailError);
    setPasswordError(isPasswordError);
    setConfirmPasswordError(isConfirmPasswordError);
    if (isEmailError && isPasswordError && isConfirmPasswordError) {
      Alert.alert("Cảnh báo", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const res = await register(email, password, name);
    if (res.success) {
      Alert.alert("Thành công", res.msg, [
        {
          text: "Ok",
          onPress: () => navigation.navigate("KamiSpa_Auth"),
          style: "destructive",
        },
      ]);
    } else {
      Alert.alert("Lỗi", res.msg);
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
        <Text style={styles.title}>Create a new account</Text>
      </View>
      <View style={styles.formContainer}>
        {/* input name */}
        <TextInput
          placeholder="Enter name"
          left={<TextInput.Icon icon="rename-box" />}
          mode="outlined"
          value={name}
          onChangeText={(name) => {
            setName(name);
            setNameError(validateName(name));
          }}
          autoCapitalize="none"
          theme={{
            colors: {
              primary: colors.primary,
            },
          }}
        />
        <HelperText type="error" visible={nameError}>
          {msgHelperName}
        </HelperText>

        {/* input email */}
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

        {/* input password */}
        <TextInput
          placeholder="Enter password"
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          mode="outlined"
          value={password}
          onChangeText={(password) => {
            setPassword(password);
            setPasswordError(validatePassword(password));
          }}
          secureTextEntry={!showPassword}
          theme={{
            colors: {
              primary: colors.primary,
            },
          }}
        />
        <HelperText type="error" visible={passwordError}>
          {msgHelperPassword}
        </HelperText>
        <TextInput
          placeholder="Confirm password"
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
          mode="outlined"
          value={confirmPassword}
          onChangeText={(confirmPassword) => {
            setConfirmPassword(confirmPassword);
            setConfirmPasswordError(validateConfirmPassword(confirmPassword));
          }}
          secureTextEntry={!showConfirmPassword}
          theme={{
            colors: {
              primary: colors.primary,
            },
          }}
        />
        <HelperText type="error" visible={confirmPasswordError}>
          {msgHelperConfirmPassword}
        </HelperText>
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Button>
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkText}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
