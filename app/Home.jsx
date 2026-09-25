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
import BackgroundDots from "./BackgroundDots";
import { fetchFromApi } from "./api";
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
  const [erroPublicacoes, setErroPublicacoes] = useState("");
  const usuario = {
    nome: params?.userName ? String(params.userName) : "Usuário",
    avatar: null,
  };

  useEffect(() => {
    let ativo = true;

    const buscarPublicacoes = async () => {
      try {
        setCarregandoPublicacoes(true);
        setErroPublicacoes("");

        const response = await fetchFromApi("/api/v1/publicacoes");
        const data = await response.json();
        const lista = Array.isArray(data) ? data : data?.publicacoes;

        if (!Array.isArray(lista)) {
          throw new Error("A resposta da API não contém uma lista de publicações.");
        }

        if (ativo) setPublicacoes(lista);
      } catch (error) {
        console.error("Erro ao carregar publicações:", error);
        if (ativo) {
          setPublicacoes([]);
          setErroPublicacoes(
            "Não foi possível carregar as publicações. Verifique a conexão com o servidor e tente novamente.",
          );
        }
      } finally {
        if (ativo) setCarregandoPublicacoes(false);
      }
    };

    buscarPublicacoes();

    return () => {
      ativo = false;
    };
  }, []);

  const obterImagem = (imagem) => {
    if (!imagem) return null;

    if (typeof imagem === "string") {
      if (/^(https?:\/\/|data:image\/)/i.test(imagem)) return imagem;

      const tipo = imagem.startsWith("/9j/")
        ? "image/jpeg"
        : imagem.startsWith("iVBOR")
          ? "image/png"
          : imagem.startsWith("R0lGOD")
            ? "image/gif"
            : "image/jpeg";
      return `data:${tipo};base64,${imagem}`;
    }

    if (Array.isArray(imagem)) {
      const bytes = Uint8Array.from(imagem);
      let binario = "";
      bytes.forEach((byte) => {
        binario += String.fromCharCode(byte);
      });
      return `data:image/jpeg;base64,${btoa(binario)}`;
    }

    return null;
  };

  const formatarData = (valor) => {
    if (!valor) return "";

    // Datas sem horário representam um dia do calendário, não um instante UTC.
    const dataCivil = String(valor).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dataCivil) {
      return `${dataCivil[3]}/${dataCivil[2]}/${dataCivil[1]}`;
    }

    const data = new Date(valor);
    return Number.isNaN(data.getTime())
      ? String(valor)
      : data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

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
          ) : erroPublicacoes ? (
            <View style={styles.card}>
              <Text style={styles.cardDescricao}>{erroPublicacoes}</Text>
            </View>
          ) : publicacoes.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>Nenhum anúncio disponível</Text>
              <Text style={styles.cardDescricao}>
                Ainda não há publicações para exibir no momento.
              </Text>
            </View>
          ) : (
            publicacoes.map((item) => {
              const titulo = item.titulo || "Publicação";
              const imagem = obterImagem(item.imagem_url);

              return (
                <View key={item.id} style={styles.card}>
                  {imagem ? (
                    <Image
                      source={{ uri: imagem }}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.cardImagePlaceholder} />
                  )}

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitulo}>{titulo}</Text>
                    {item.subtitulo ? (
                      <Text style={styles.cardSubtitulo}>{item.subtitulo}</Text>
                    ) : null}
                    <Text
                      style={styles.cardDescricao}
                    >
                      {item.descricao}
                    </Text>

                    <View style={styles.cardMetaRow}>
                      <Text style={styles.cardData}>
                        {formatarData(item.data_publicacao)}
                      </Text>
                      <Text style={styles.cardData}>
                        {item.tipo_publicacao} · {item.status_publicacao}
                      </Text>
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
