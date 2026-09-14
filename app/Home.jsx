import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import getApiBaseUrls, { fetchFromApi } from "./api";
import BackgroundDots from "./BackgroundDots";
import styles from "./HomeStyles";

// ─── Componente: Cabeçalho / Boas-vindas ─────────────────────────────────────

const Cabecalho = ({ usuario }) => {
  return (
    <View style={styles.cabecalho}>
      <Text style={styles.saudacao}>Bem vindo ao nosso Mural de Avisos</Text>
      <Text style={styles.nomeUsuario}>Olá, {usuario.nome}</Text>
    </View>
  );
};

// ─── Componente: Rodapé / Footer ──────────────────────────────────────────────

const Rodape = ({ onSair }) => (
  <View style={styles.rodape}>
    <View style={styles.rodapeLinha} />

    <View style={styles.rodapeConteudo}>
      <TouchableOpacity
        style={styles.botaoSair}
        onPress={onSair}
        activeOpacity={0.8}
      >
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
  const [failedImages, setFailedImages] = useState({});
  const API_BASE = getApiBaseUrls()[0];
  const usuario = {
    nome: params?.userName ? String(params.userName) : "Usuário",
    avatar: null,
  };

  useEffect(() => {
    const buscarPublicacoes = async () => {
      try {
        setCarregandoPublicacoes(true);

        const response = await fetchFromApi("/api/v1/publicacoes");
        if (!response.ok) {
          throw new Error("Erro ao buscar publicações");
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
        console.error("Erro ao carregar publicações:", error);
        setPublicacoes([]);
      } finally {
        setCarregandoPublicacoes(false);
      }
    };

    buscarPublicacoes();
  }, [params?.email]);

  const confirmarSaida = () => {
    setModalSairVisivel(false);
    router.replace("/Login");
    Alert.alert("Até logo!", `${usuario.nome} saiu da conta com sucesso.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1b2a" />
      <BackgroundDots />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho com boas-vindas */}
        <Cabecalho usuario={usuario} />

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Anúncios</Text>
          <Text style={styles.secaoSubtitulo}>
            Confira os comunicados mais recentes da instituição.
          </Text>

          {carregandoPublicacoes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#2da6d6" />
              <Text style={styles.loadingText}>Carregando anúncios...</Text>
            </View>
          ) : publicacoes.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>Nenhum anúncio disponível</Text>
              <Text style={styles.cardDescricao}>
                Ainda não há publicações para exibir no momento.
              </Text>
            </View>
          ) : (
            publicacoes.map((item, index) => {
              const titulo =
                item?.titulo ?? item?.title ?? item?.nome ?? "Anúncio";
              const descricao =
                item?.descricao ??
                item?.description ??
                item?.conteudo ??
                item?.texto ??
                "";
              const data =
                item?.data ??
                item?.createdAt ??
                item?.dataPublicacao ??
                item?.created_at ??
                "";

              const key = item?.id ?? `${titulo}-${index}`;

              const resolveImage = (it) => {
                if (!it) return null;

                const candidates = [
                  it?.imagem,
                  it?.imagemUrl,
                  it?.image,
                  it?.foto,
                  it?.thumbnail,
                  it?.thumb,
                  it?.url,
                  it?.urlImagem,
                  it?.picture,
                  it?.arquivo,
                  it?.fileName,
                  it?.file,
                  it?.anexo?.url,
                  it?.anexo?.fileName,
                  Array.isArray(it?.arquivos) && it?.arquivos?.[0]?.url,
                  Array.isArray(it?.files) && it?.files?.[0]?.path,
                ]
                  .flat()
                  .filter(Boolean);

                let val = candidates.length ? candidates[0] : null;
                if (!val) return null;

                // If it's an object with url/path
                if (typeof val === "object") {
                  val = val.url || val.path || val.fileName || val.file || null;
                }

                if (!val) return null;

                const s = String(val);
                // base64/data URI
                if (s.startsWith("data:")) return s;
                // absolute URL
                if (s.startsWith("http://") || s.startsWith("https://"))
                  return s;
                // relative path -> prefix with API base
                if (s.startsWith("/")) return `${API_BASE}${s}`;
                return `${API_BASE}/${s}`;
              };

              const imageUrl = resolveImage(item);

              return (
                <View key={key} style={styles.card}>
                  {imageUrl && !failedImages[key] ? (
                    <Image
                      source={{ uri: String(imageUrl) }}
                      style={styles.cardImage}
                      resizeMode="cover"
                      onError={() =>
                        setFailedImages((p) => ({ ...p, [key]: true }))
                      }
                    />
                  ) : (
                    <View style={styles.cardImagePlaceholder} />
                  )}

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitulo}>{titulo}</Text>
                    <Text
                      style={styles.cardDescricao}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      {descricao || "Sem descrição disponível."}
                    </Text>

                    <View style={styles.cardMetaRow}>
                      {data ? (
                        <Text style={styles.cardData}>{String(data)}</Text>
                      ) : null}
                    </View>
                  </View>
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
              Tem certeza que deseja sair da conta de{" "}
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
