import { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './HomeStyles';

// ─── Dados de exemplo ────────────────────────────────────────────────────────

const usuario = {
  nome: 'Carlos Mendes',
  avatar: null, // coloque uma URL ou require() local se quiser foto
};

// ─── Componente: Cabeçalho / Boas-vindas ─────────────────────────────────────

const Cabecalho = ({ usuario }) => {
  return (
    <View style={styles.cabecalho}>
      <Text style={styles.saudacao}>Bem vindo ao nosso Aplicativo</Text>
      <Text style={styles.nomeUsuario}>{usuario.nome}</Text>
    </View>
  );
};


// ─── Componente: Rodapé / Footer ──────────────────────────────────────────────

const Rodape = ({ onSair }) => (
  <View style={styles.rodape}>
    <View style={styles.rodapeLinha} />

    <View style={styles.rodapeConteudo}>
      <View>
        <Text style={styles.rodapeAppNome}>MeuApp</Text>
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={onSair} activeOpacity={0.8}>
        <Text style={styles.botaoSairIcone}>⏻</Text>
        <Text style={styles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Tela Principal: Home ─────────────────────────────────────────────────────

export default function Home() {
  const [modalSairVisivel, setModalSairVisivel] = useState(false);

  const confirmarSaida = () => {
    setModalSairVisivel(false);
    // Aqui você chamaria sua lógica de logout, ex:
    // navigation.replace('Login');
    Alert.alert('Até logo!', `${usuario.nome} saiu da conta com sucesso.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1F36" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho com boas-vindas */}
        <Cabecalho usuario={usuario} />

        {/* Espaço em branco reservado para anúncios */}
        <View style={styles.espacoAnuncio} />

        {/* Rodapé com botão de sair */}
        <Rodape onSair={() => setModalSairVisivel(true)} />
      </ScrollView>

      {/* Modal de confirmação de saída */}
      <Modal
        visible={modalSairVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSairVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSairContainer}>
            <Text style={styles.modalSairTitulo}>Sair da conta?</Text>
            <Text style={styles.modalSairMensagem}>
              Tem certeza que deseja sair da conta de{' '}
              <Text style={styles.modalSairNome}>{usuario.nome}</Text>? Você
              precisará fazer login novamente para acessar o aplicativo.
            </Text>

            <View style={styles.modalSairBotoes}>
              <TouchableOpacity
                style={[styles.modalSairBotao, styles.modalSairBotaoCancelar]}
                onPress={() => setModalSairVisivel(false)}
              >
                <Text style={styles.modalSairBotaoCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalSairBotao, styles.modalSairBotaoConfirmar]}
                onPress={confirmarSaida}
              >
                <Text style={styles.modalSairBotaoConfirmarTexto}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}