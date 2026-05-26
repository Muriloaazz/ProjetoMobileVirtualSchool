import { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from './MenuStyles';

// ─── Componente principal ────────────────────────────────────────────────────
const Menu = ({ navigation }) => {
  const [abaSelecionada, setAbaSelecionada] = useState('menu');
  const [user] = useState({
    email: '',
  });

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleSair = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair? Você precisará fazer login novamente.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            // TODO: Implementar logout via API em breve
            if (navigation) {
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } else {
              Alert.alert('Sessão encerrada', 'Você foi desconectado com sucesso.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Cabeçalho da tela ─────────────────────────────────── */}
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Menu</Text>
        </View>

        {/* ══ SAIR DA CONTA ═══════════════════════════════════════ */}
        <Text style={styles.secaoTitulo}>
          Conta
        </Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.sairRow}
            onPress={handleSair}
            activeOpacity={0.75}
            accessibilityLabel="Sair da conta"
          >
            <View style={styles.sairLeft}>
              <View style={styles.sairIconBox}>
                <Text style={styles.sairIconText}>S</Text>
              </View>
              <View>
                <Text style={styles.sairTitulo}>Sair da conta</Text>
                <Text style={styles.sairSubtitulo}>
                  Encerrar a sessao atual
                </Text>
              </View>
            </View>
            <Text style={styles.sairSeta}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Aviso de sessao */}
        <View style={styles.sessaoAviso}>
          <Text style={styles.sessaoAvisoTexto}>
            Sessao ativa como{' '}
            <Text style={styles.sessaoAvisoEmail}>{user.email || 'Email não informado'}</Text>
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setAbaSelecionada('inicio')}
          accessibilityLabel="Início"
        >
          <View style={[styles.tabIconBox, abaSelecionada === 'inicio' && styles.tabIconBoxActive]}>
            <Text style={[styles.tabIconText, abaSelecionada === 'inicio' && styles.tabIconTextActive]}>
              Inicio
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setAbaSelecionada('menu')}
          accessibilityLabel="Menu"
        >
          <View style={[styles.tabIconBox, abaSelecionada === 'menu' && styles.tabIconBoxActive]}>
            <Text style={[styles.tabIconText, abaSelecionada === 'menu' && styles.tabIconTextActive]}>
              Menu
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Menu;