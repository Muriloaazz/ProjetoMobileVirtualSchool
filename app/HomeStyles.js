import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

// ─── Tokens ─────────────────────────────────────────────────────────────────
const COLORS = {
  background:      '#F7F8FA',
  surface:         '#FFFFFF',
  surfaceAlt:      '#F0F2F5',
  primary:         '#1A1A2E',
  accent:          '#4361EE',
  accentLight:     '#EEF1FD',
  accentDark:      '#3451D1',
  textPrimary:     '#1A1A2E',
  textSecondary:   '#6B7280',
  textMuted:       '#9CA3AF',
  border:          '#E5E7EB',
  borderLight:     '#F3F4F6',
  naoLidoBg:       '#F5F7FF',
  naoLidoBorder:   '#C7D2FE',
  indicador:       '#4361EE',
  badge:           '#EF4444',
  badgeText:       '#FFFFFF',
  tagBg:           '#DBEAFE',
  tagText:         '#1D4ED8',
  white:           '#FFFFFF',
  tabBar:          '#FFFFFF',
  tabActive:       '#4361EE',
  tabInactive:     '#9CA3AF',
  tabActiveBg:     '#EEF1FD',
};

const SPACING = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

const RADIUS = {
  sm:   6,
  md:   12,
  lg:   16,
  xl:   20,
  full: 999,
};

const shadow = (color = '#000', opacity = 0.06, radius = 8, elevation = 3) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
  });

// ─── Estilos ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  /* ── Layout base ─────────────────────────────────────────────── */
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  bottomSpacer: {
    height: SPACING.xl,
  },

  /* ── Cabeçalho de seção ──────────────────────────────────────── */
  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  secaoTituloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  secaoTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },

  /* ── PERFIL ──────────────────────────────────────────────────── */
  perfilCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...shadow('#000', 0.06, 10, 3),
  },
  perfilLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...shadow(COLORS.accent, 0.25, 8, 4),
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  perfilInfo: {
    flex: 1,
  },
  avatarButton: {
    marginRight: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  perfilNome: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  perfilEmail: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },

  /* Perfil expandido */
  perfilDetalhe: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.xs,
    ...shadow('#000', 0.04, 8, 2),
  },
  perfilDetalheRow: {
    paddingVertical: SPACING.sm,
  },
  perfilDetalheLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  perfilDetalheValor: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  separatorThin: {
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
  editarPerfilButton: {
    marginTop: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  editarPerfilText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.accent,
  },

  /* ── BARRA DE PESQUISA ───────────────────────────────────────── */
  searchWrapper: {
    marginBottom: SPACING.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...shadow('#000', 0.04, 6, 2),
  },
  searchIcon: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accent,
    marginRight: SPACING.sm,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    paddingLeft: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  clearText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },

  /* Resultados */
  resultadosBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
    ...shadow('#000', 0.04, 6, 2),
  },
  resultadoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  resultadoLeft: {
    flex: 1,
  },
  resultadoCategoria: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  resultadoTitulo: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  resultadoSeta: {
    fontSize: 22,
    color: COLORS.textMuted,
    marginLeft: SPACING.sm,
  },
  semResultado: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  semResultadoTexto: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  /* ── AVISOS ──────────────────────────────────────────────────── */
  badge: {
    backgroundColor: COLORS.badge,
    borderRadius: RADIUS.full,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.badgeText,
  },
  marcarTodosText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
  },
  avisosContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...shadow('#000', 0.05, 10, 3),
  },
  avisoCard: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    backgroundColor: COLORS.surface,
  },
  avisoCardNaoLido: {
    backgroundColor: COLORS.naoLidoBg,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.indicador,
  },
  avisoCardUltimo: {
    borderBottomWidth: 0,
  },
  avisoLeft: {
    width: 6,
    alignItems: 'center',
    paddingTop: 6,
    marginRight: SPACING.sm,
  },
  avisoIndicador: {
    width: 6,
    height: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.indicador,
  },
  avisoConteudo: {
    flex: 1,
  },
  avisoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  avisoTitulo: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  avisoTituloNaoLido: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  avisoData: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '400',
    flexShrink: 0,
  },
  avisoDescricao: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  avisoNaoLidoTag: {
    marginTop: SPACING.xs,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.tagBg,
    color: COLORS.tagText,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },

  /* ── RODAPÉ / TAB BAR ─────────────────────────────────────────── */
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.tabBar,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 24 : SPACING.sm,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: { elevation: 10 },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconBox: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginBottom: 3,
  },
  tabIconBoxActive: {
    backgroundColor: COLORS.tabActiveBg,
  },
  tabIconText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.tabInactive,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabIconTextActive: {
    color: COLORS.tabActive,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.tabInactive,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: COLORS.tabActive,
  },
});

export default styles;