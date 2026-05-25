import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from './HomeStyles';

// ─── Componente principal ───────────────────────────────────────────────────
const Home = ({ navigation }) => {
  const [busca, setBusca] = useState('');
  const [abaSelecionada, setAbaSelecionada] = useState('inicio');
  const [avisos, setAvisos] = useState([]);
  const [anuncios] = useState([]);
  const [perfilExpandido, setPerfilExpandido] = useState(false);
  const [user] = useState({ initials: 'U', name: '', email: '' });

  const avisoNaoLido = avisos.filter((a) => !a.lido).length;

  const resultadosBusca = busca.trim()
    ? anuncios.filter((a) =>
        a.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        a.categoria.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  const marcarComoLido = (id) => {
    setAvisos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, lido: true } : a))
    );
  };

  const marcarTodosLidos = () => {
    setAvisos((prev) => prev.map((a) => ({ ...a, lido: true })));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* ── Conteúdo scrollável ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ══ PERFIL ══════════════════════════════════════════════════ */}
        <View style={styles.perfilCard}>
          <View style={styles.perfilLeft}>
            <TouchableOpacity
              style={styles.avatarButton}
              activeOpacity={0.85}
              onPress={() => setPerfilExpandido(!perfilExpandido)}
              accessibilityLabel="Abrir perfil"
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.initials}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.perfilInfo}>
              <Text style={styles.perfilNome}>{user.name || 'Usuário'}</Text>
              <Text style={styles.perfilEmail}>{user.email || 'Email não informado'}</Text>
            </View>
          </View>
        </View>

        {perfilExpandido && (
          <View style={styles.perfilDetalhe}>
            <Text style={styles.perfilDetalheValor}>{user.name || 'Usuário'}</Text>
            <Text style={styles.perfilEmail}>{user.email || 'E-mail não informado'}</Text>
            <TouchableOpacity style={styles.editarPerfilButton}>
              <Text style={styles.editarPerfilText}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ══ BARRA DE PESQUISA ════════════════════════════════════════ */}
        <View style={styles.secaoHeader}>
          <Text style={styles.secaoTitulo}>Buscar anúncios</Text>
        </View>

        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>Buscar</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise por anúncios..."
              placeholderTextColor="#AAAAAA"
              value={busca}
              onChangeText={setBusca}
              returnKeyType="search"
              autoCorrect={false}
            />
            {busca.length > 0 && (
              <TouchableOpacity onPress={() => setBusca('')} style={styles.clearButton}>
                <Text style={styles.clearText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Resultados da busca */}
        {busca.trim().length > 0 && (
          <View style={styles.resultadosBox}>
            {resultadosBusca.length > 0 ? (
              resultadosBusca.map((item) => (
                <TouchableOpacity key={item.id} style={styles.resultadoItem}>
                  <View style={styles.resultadoLeft}>
                    <Text style={styles.resultadoCategoria}>{item.categoria}</Text>
                    <Text style={styles.resultadoTitulo}>{item.titulo}</Text>
                  </View>
                  <Text style={styles.resultadoSeta}>›</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.semResultado}>
                <Text style={styles.semResultadoTexto}>Nenhum anúncio encontrado.</Text>
              </View>
            )}
          </View>
        )}

        {/* ══ AVISOS ══════════════════════════════════════════════════ */}
        <View style={styles.secaoHeader}>
          <View style={styles.secaoTituloRow}>
            <Text style={styles.secaoTitulo}>Avisos</Text>
            {avisoNaoLido > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{avisoNaoLido}</Text>
              </View>
            )}
          </View>
          {avisoNaoLido > 0 && (
            <TouchableOpacity onPress={marcarTodosLidos}>
              <Text style={styles.marcarTodosText}>Marcar todos como lidos</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.avisosContainer}>
          {avisos.map((aviso, index) => (
            <TouchableOpacity
              key={aviso.id}
              style={[
                styles.avisoCard,
                !aviso.lido && styles.avisoCardNaoLido,
                index === avisos.length - 1 && styles.avisoCardUltimo,
              ]}
              onPress={() => marcarComoLido(aviso.id)}
              activeOpacity={0.8}
            >
              <View style={styles.avisoLeft}>
                {!aviso.lido && <View style={styles.avisoIndicador} />}
              </View>
              <View style={styles.avisoConteudo}>
                <View style={styles.avisoTopo}>
                  <Text style={[styles.avisoTitulo, !aviso.lido && styles.avisoTituloNaoLido]}>
                    {aviso.titulo}
                  </Text>
                  <Text style={styles.avisoData}>{aviso.data}</Text>
                </View>
                <Text style={styles.avisoDescricao} numberOfLines={2}>
                  {aviso.descricao}
                </Text>
                {!aviso.lido && (
                  <Text style={styles.avisoNaoLidoTag}>Novo</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* ══ RODAPÉ (TAB BAR) ════════════════════════════════════════ */}
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

export default Home;