import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './LoginStyles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return { isValid: false, message: 'O e-mail é obrigatório.' };
    }
    if (!emailRegex.test(value)) {
      return { isValid: false, message: 'Insira um e-mail válido.' };
    }
    return { isValid: true, message: '' };
  };

  const validatePassword = (value) => {
    if (!value) {
      return { isValid: false, message: 'A senha é obrigatória.' };
    }
    if (value.length < 6) {
      return { isValid: false, message: 'A senha deve ter no mínimo 6 caracteres.' };
    }
    return { isValid: true, message: '' };
  };

  const getApiBaseUrls = () => {
    const candidates = [
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      Platform.OS === 'android' ? 'http://10.0.2.2:8080' : null,
      'http://host.docker.internal:8080',
      'http://172.17.0.1:8080',
    ].filter(Boolean);

    return [...new Set(candidates)];
  };

  const normalizeValue = (value) => String(value ?? '').trim().toLowerCase();

  const extractUsers = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.usuarios)) return payload.usuarios;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.users)) return payload.users;
    if (payload && typeof payload === 'object') return [payload];
    return [];
  };

  const credentialsMatch = (user, email, password) => {
    const apiEmail = normalizeValue(user?.email ?? user?.mail ?? user?.usuario?.email ?? user?.user?.email);
    const apiPassword = String(user?.senha ?? user?.password ?? user?.senhaUsuario ?? user?.user?.password ?? '');

    return apiEmail === normalizeValue(email) && apiPassword === password;
  };

  const authenticateWithApi = async (baseUrl, email, password) => {
    const attempts = [
      { url: `${baseUrl}/api/v1/usuarios`, options: { method: 'GET' } },
      {
        url: `${baseUrl}/api/v1/usuarios`,
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha: password }),
        },
      },
      {
        url: `${baseUrl}/api/v1/usuarios/login`,
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha: password }),
        },
      },
    ];

    for (const attempt of attempts) {
      try {
        const response = await fetch(attempt.url, attempt.options);
        if (!response.ok) continue;

        const data = await response.json();
        const users = extractUsers(data);
        const matchedUser = users.find((user) => credentialsMatch(user, email, password));

        if (matchedUser) {
          return { ok: true, user: matchedUser };
        }

        if (data && typeof data === 'object' && (data.token || data.accessToken || data.success)) {
          const user = data.user ?? data.usuario ?? data.data ?? null;
          if (user && credentialsMatch(user, email, password)) {
            return { ok: true, user };
          }
        }
      } catch (error) {
        console.warn(`Falha ao tentar ${attempt.url}:`, error);
      }
    }

    return { ok: false };
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailValidation = validateEmail(trimmedEmail);
    const passwordValidation = validatePassword(trimmedPassword);

    setEmailError(emailValidation.message);
    setPasswordError(passwordValidation.message);
    setFeedbackMessage('');
    setFeedbackType('');

    if (!emailValidation.isValid || !passwordValidation.isValid) return;

    setLoading(true);

    try {
      let authenticated = false;

      let authenticatedUser = null;

      for (const baseUrl of getApiBaseUrls()) {
        const result = await authenticateWithApi(baseUrl, trimmedEmail, trimmedPassword);
        if (result.ok) {
          authenticated = true;
          authenticatedUser = result.user ?? null;
          break;
        }
      }

      if (authenticated) {
        setFeedbackType('success');
        setFeedbackMessage('Login com sucesso!');
        router.replace({ pathname: '/Home', params: { userName: authenticatedUser?.nome ?? authenticatedUser?.name ?? trimmedEmail } });
      } else {
        setFeedbackType('error');
        setFeedbackMessage('Login recusado. ');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique a API e o endereço configurado.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (navigation) {
      navigation.navigate('ForgotPassword');
    } else {
      Alert.alert('Recuperar Senha', 'Você será redirecionado para a tela de recuperação de senha.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Image
            source={require('./assents/LogoVirtualSchool-removebg-preview.png')}
            style={styles.logoPlaceholder}
            resizeMode="contain"
            accessibilityLabel="Logo Virtual School"
          />
          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        <View style={styles.formSection}>
          {/* Campo de E-mail */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputWrapperError : null]}>
              <TextInput
                style={styles.input}
                placeholder="seuemail@gmail.com"
                placeholderTextColor="#AAAAAA"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (feedbackMessage) {
                    setFeedbackMessage('');
                    setFeedbackType('');
                  }
                  if (emailError) {
                    const validation = validateEmail(text);
                    setEmailError(validation.message);
                  }
                }}
                onBlur={() => {
                  const validation = validateEmail(email);
                  setEmailError(validation.message);
                }}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Campo de Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={[styles.inputWrapper, passwordError ? styles.inputWrapperError : null]}>
              <TextInput
                style={[styles.input, styles.inputPassword]}
                placeholder="Digite sua senha"
                placeholderTextColor="#AAAAAA"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (feedbackMessage) {
                    setFeedbackMessage('');
                    setFeedbackType('');
                  }
                  if (passwordError) {
                    const validation = validatePassword(text);
                    setPasswordError(validation.message);
                  }
                }}
                onBlur={() => {
                  const validation = validatePassword(password);
                  setPasswordError(validation.message);
                }}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Text style={styles.eyeButtonText}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Text>
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Recuperação de senha */}
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
            accessibilityLabel="Esqueci minha senha"
          >
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          {feedbackMessage ? (
            <View style={[styles.feedbackBox, feedbackType === 'success' ? styles.feedbackSuccess : styles.feedbackError]}>
              <Text style={styles.feedbackText}>{feedbackMessage}</Text>
            </View>
          ) : null}

          {/* Botão de Login */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            accessibilityLabel="Entrar"
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;