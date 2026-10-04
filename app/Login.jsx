import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundDots from "./BackgroundDots";
import styles from "./LoginStyles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  async function handleLogin(email, password) {
    setLoginError("");

    const credenciais = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/usuarios/login`,
        credenciais,
      );

      if (response.data) {
        return router.replace("/Home");
      } else {
        setLoginError(
          "Não encontramos uma conta com esses dados. Confira seu e-mail e sua senha e tente novamente.",
        );
        return;
      }
    } catch (error) {
      setLoginError(
        "Não foi possível entrar agora. Confira seus dados e tente novamente.",
      );
      return console.log("Mensagem de erro: " + error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BackgroundDots />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ zIndex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.logoText}>VirtualSchool</Text>
          <Text style={styles.title}>Bem-vindo</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="seuemail@gmail.com"
                placeholderTextColor="#7F8B93"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.inputPassword]}
                placeholder="Digite sua senha"
                placeholderTextColor="#7F8B93"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={
                  showPassword ? "Ocultar senha" : "Mostrar senha"
                }
              >
                <Text style={styles.eyeButtonText}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={(e) => handleLogin(email, password)}
            accessibilityLabel="Logar"
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          {loginError ? (
            <View style={styles.loginErrorCard} accessibilityRole="alert">
              <Text style={styles.loginErrorTitle}>Usuário não encontrado</Text>
              <Text style={styles.loginErrorText}>{loginError}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
