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
  const [perfilExpandido, setPerfilExpandido] = useState(false);
  const [user] = useState({
    name: '',
    email: '',
    initials: 'U',
    membro: '',
  });

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleEditar = () => {
    Alert.alert('Editar perfil', 'Você será redirecionado para a edição do perfil.');
  };

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

        {/* ══ PERFIL ══════════════════════════════════════════════ */}
        <Text style={styles.secaoTitulo}>Perfil</Text>

        <View style={styles.perfilCard}>
          <View style={styles.perfilLeft}>
            <TouchableOpacity
              style={styles.avatarButton}
              activeOpacity={0.85}
              onPress={() => setPerfilExpandido(!perfilExpandido)}
              accessibilityLabel={perfilExpandido ? 'Fechar perfil' : 'Abrir perfil'}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.initials}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.perfilInfo}>
              <Text style={styles.perfilNome}>{user.name || 'Usuário'}</Text>
              <Text style={styles.perfilEmail}>{user.email || 'Email não informado'}</Text>
              {user.membro ? <Text style={styles.perfilMembro}>{user.membro}</Text> : null}
            </View>
          </View>
        </View>

        {perfilExpandido && (
          <View style={styles.perfilDetalhe}>
            <Text style={styles.perfilDetalheValor}>{user.name || 'Usuário'}</Text>
            <Text style={styles.perfilEmail}>{user.email || 'E-mail não informado'}</Text>
            {user.membro ? <Text style={styles.perfilMembro}>{user.membro}</Text> : null}
            <TouchableOpacity
              style={styles.editarPerfilButton}
              onPress={handleEditar}
            >
              <Text style={styles.editarPerfilText}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ══ SAIR DA CONTA ═══════════════════════════════════════ */}
        <Text style={[styles.secaoTitulo, styles.secaoTituloSpacing]}>
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