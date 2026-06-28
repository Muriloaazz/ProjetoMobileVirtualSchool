import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

// ─── Componente: Cabeçalho / Boas-vindas ─────────────────────────────────────

const Cabecalho = ({ usuario }) => {
  return (
    <View style={styles.cabecalho}>
      <Text style={styles.saudacao}>Bem vindo ao nosso Mural de Avisos</Text>
      <Text style={styles.nomeUsuario}>
        Olá, {usuario.nome}
      </Text>
    </View>
  );
};


// ─── Componente: Rodapé / Footer ──────────────────────────────────────────────

const Rodape = ({ onSair }) => (
  <View style={styles.rodape}>
    <View style={styles.rodapeLinha} />

    <View style={styles.rodapeConteudo}>
      

      <TouchableOpacity style={styles.botaoSair} onPress={onSair} activeOpacity={0.8}>
        <Text style={styles.botaoSairIcone}>⏻</Text>
        <Text style={styles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Tela Principal: Home ─────────────────────────────────────────────────────

export default function Home() {
  const params = useLocalSearchParams();
  const [modalSairVisivel, setModalSairVisivel] = useState(false);
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregandoPublicacoes, setCarregandoPublicacoes] = useState(true);
  const usuario = {
    nome: params?.userName ? String(params.userName) : 'Usuário',
    avatar: null,
  };

  useEffect(() => {
    const buscarPublicacoes = async () => {
      try {
        setCarregandoPublicacoes(true);

        const response = await fetch('http://localhost:8080/api/v1/publicacoes');
        if (!response.ok) {
          throw new Error('Erro ao buscar publicações');
        }
        const data = await response.json();
        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data?.publicacoes)
            ? data.publicacoes
            : Array.isArray(data?.data)
              ? data.data
              : [];

        setPublicacoes(lista);
      } catch (error) {
        console.error('Erro ao carregar publicações:', error);
        setPublicacoes([]);
      } finally {
        setCarregandoPublicacoes(false);
      }
    };

    buscarPublicacoes();
  }, [params?.email]);

  const confirmarSaida = () => {
    setModalSairVisivel(false);
    router.replace('/Login');
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

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Anúncios</Text>
          <Text style={styles.secaoSubtitulo}>Confira os comunicados mais recentes da instituição.</Text>

          {carregandoPublicacoes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#2b6cb2" />
              <Text style={styles.loadingText}>Carregando anúncios...</Text>
            </View>
          ) : publicacoes.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>Nenhum anúncio disponível</Text>
              <Text style={styles.cardDescricao}>Ainda não há publicações para exibir no momento.</Text>
            </View>
          ) : (
            publicacoes.map((item, index) => {
              const titulo = item?.titulo ?? item?.title ?? item?.nome ?? 'Anúncio';
              const descricao = item?.descricao ?? item?.description ?? item?.conteudo ?? item?.texto ?? '';
              const data = item?.data ?? item?.createdAt ?? item?.dataPublicacao ?? item?.created_at ?? '';

              return (
                <View key={item?.id ?? `${titulo}-${index}`} style={styles.card}>
                  <Text style={styles.cardTitulo}>{titulo}</Text>
                  <Text style={styles.cardDescricao}>{descricao || 'Sem descrição disponível.'}</Text>
                  {data ? <Text style={styles.cardData}>{String(data)}</Text> : null}
                </View>
              );
            })
          )}
        </View>

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