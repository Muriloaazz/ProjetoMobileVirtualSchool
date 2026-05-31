/**
 * HomeStyles.css → HomeStyles.js
 *
 * ATENÇÃO: React Native não usa CSS puro.
 * Este arquivo usa StyleSheet.create() do React Native.
 * Renomeie para HomeStyles.js e importe normalmente:
 *   import styles from './HomeStyles';
 *
 * Paleta:
 *   Fundo principal  : #F4F6FB
 *   Header gradiente : #1A1F36 → #2D3561
 *   Destaque         : #5B6CF9
 *   Texto principal  : #1A1F36
 *   Texto secundário : #7A809E
 */

import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  bgPrimary:    '#F4F6FB',
  headerStart:  '#2b6cb2',
  headerEnd:    '#2b6cb2',
  accent:       '#2b6cb2',
  accentLight:  '#EEF0FE',
  textDark:     '#2b6cb2',
  textMid:      '#2b6cb2',
  textLight:    '##2b6cb2',
  white:        '#FFFFFF',
  cardBg:       '#FFFFFF',
  border:       '#E8EAF2',
  danger:       '#ff0000',
  dangerLight:  '#FEF2F2',
  online:       '#22C55E',
};

const styles = StyleSheet.create({

  // ── Tela ──────────────────────────────────────────────────────────────────

  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scroll: {
    flex: 1,
  },
  scrollConteudo: {
    paddingBottom: 32,
    flexGrow: 1,
  },

  espacoAnuncio: {
    width: '100%',
    maxWidth: 720,
    height: 140,
  },

  // ── Cabeçalho ─────────────────────────────────────────────────────────────

  cabecalho: {
    backgroundColor: COLORS.headerStart,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  cabecalhoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  /* Avatar */
  avatarContainer: {
    position: 'relative',
  },
  avatarImagem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: COLORS.accent,
  },
  avatarLetra: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  avatarTexto: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 1,
  },
  avatarOnline: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.headerStart,
  },

  /* Texto do cabeçalho */
  cabecalhoTexto: {
    flex: 1,
  },
  saudacao: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  nomeUsuario: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  badgeCargo: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(91,108,249,0.35)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(91,108,249,0.5)',
  },
  badgeCargoTexto: {
    fontSize: 11,
    color: '#C5CAFF',
    fontWeight: '600',
    letterSpacing: 0.4,
  },

  /* Elemento decorativo de fundo */
  cabecalhoDecoracao: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(91,108,249,0.12)',
    right: -40,
    top: -60,
  },

  // ── Seção de Anúncios ─────────────────────────────────────────────────────

  secao: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  secaoTituloCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: 0.1,
  },
  secaoSubtitulo: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 16,
  },

  /* Badge de contagem de não lidos */
  badgeContagem: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeContagemTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },

  // ── Card de Anúncio ───────────────────────────────────────────────────────

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#1A1F36',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  cardNaoLido: {
    borderColor: '#C7CBFF',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  cardIndicadorNaoLido: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardCategoriaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cardCategoriaTexto: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardData: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
    lineHeight: 22,
  },
  cardDescricao: {
    fontSize: 13,
    color: COLORS.textMid,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardBotaoLerMais: {
    alignSelf: 'flex-start',
  },
  cardBotaoLerMaisTexto: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Modal de Detalhe do Anúncio ───────────────────────────────────────────

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26,31,54,0.55)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingBottom: 36,
  },
  modalCategoria: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
  },
  modalTitulo: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
    lineHeight: 26,
  },
  modalData: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
    marginBottom: 14,
  },
  modalDescricao: {
    fontSize: 14,
    color: COLORS.textMid,
    lineHeight: 22,
    marginBottom: 24,
  },
  modalBotaoFechar: {
    backgroundColor: COLORS.accentLight,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalBotaoFecharTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.accent,
  },

  // ── Rodapé ────────────────────────────────────────────────────────────────

  rodape: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  rodapeLinha: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
  },
  rodapeConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rodapeAppNome: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: 0.5,
  },
  rodapeVersao: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },

  /* Botão de sair */
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.dangerLight,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ff0000',
  },
  botaoSairIcone: {
    fontSize: 16,
    color: COLORS.danger,
  },
  botaoSairTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.danger,
    letterSpacing: 0.3,
  },

  // ── Modal de Saída ────────────────────────────────────────────────────────

  modalSairContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalSairIcone: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalSairTitulo: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSairMensagem: {
    fontSize: 14,
    color: COLORS.textMid,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  modalSairNome: {
    fontWeight: '700',
    color: COLORS.textDark,
  },
  modalSairBotoes: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalSairBotao: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalSairBotaoCancelar: {
    backgroundColor: COLORS.accentLight,
    borderWidth: 1,
    borderColor: '#C7CBFF',
  },
  modalSairBotaoCancelarTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.accent,
  },
  modalSairBotaoConfirmar: {
    backgroundColor: COLORS.danger,
  },
  modalSairBotaoConfirmarTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default styles;