import { Platform, StyleSheet } from 'react-native';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const COLORS = {
  background:       '#F7F8FA',
  surface:          '#FFFFFF',
  surfaceAlt:       '#F0F2F5',
  primary:          '#1A1A2E',
  accent:           '#4361EE',
  accentLight:      '#EEF1FD',
  accentMid:        '#C7D2FE',
  accentDark:       '#3451D1',
  textPrimary:      '#1A1A2E',
  textSecondary:    '#6B7280',
  textMuted:        '#9CA3AF',
  border:           '#E5E7EB',
  borderLight:      '#F3F4F6',
  danger:           '#EF4444',
  dangerLight:      '#FEF2F2',
  dangerMid:        '#FECACA',
  white:            '#FFFFFF',
  tabBar:           '#FFFFFF',
  tabActive:        '#4361EE',
  tabInactive:      '#9CA3AF',
  tabActiveBg:      '#EEF1FD',
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
  full: 999,
};

const shadow = (color = '#000', opacity = 0.06, radius = 10, elevation = 3) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
  });

// ─── Estilos ──────────────────────────────────────────────────────────────────
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

  /* ── Cabeçalho da tela ───────────────────────────────────────── */
  screenHeader: {
    marginBottom: SPACING.lg,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },

  /* ── Títulos de seção ────────────────────────────────────────── */
  secaoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  secaoTituloSpacing: {
    marginTop: SPACING.lg,
  },

  /* ── Card genérico ───────────────────────────────────────────── */
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...shadow('#000', 0.05, 10, 3),
  },

  /* ── Separator ───────────────────────────────────────────────── */
  separatorThin: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.md,
  },

  /* ══ PERFIL ══════════════════════════════════════════════════ */
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
    width: 52,
    height: 52,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...shadow(COLORS.accent, 0.28, 10, 5),
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '800',
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
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  perfilMembro: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  chevronText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    paddingLeft: SPACING.sm,
  },

  /* Perfil expandido */
  perfilDetalhe: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.xs,
    paddingVertical: SPACING.xs,
    ...shadow('#000', 0.04, 8, 2),
  },
  perfilDetalheRow: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  perfilDetalheLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  perfilDetalheValor: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  editarPerfilButton: {
    margin: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  editarPerfilText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 0.3,
  },

  /* ══ NOTIFICACOES ═══════════════════════════════════════════ */
  notifHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  notifHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notifHeaderRight: {
    marginLeft: SPACING.sm,
  },
  notifIconBox: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  notifIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.accent,
  },
  notifTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  notifSubtitulo: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  notifExpandToggle: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  notifExpandText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
  },
  notifPreferencias: {
    paddingBottom: SPACING.xs,
  },
  notifOpcaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  notifOpcaoInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  notifOpcaoTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  notifOpcaoDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },

  /* ══ SAIR ═══════════════════════════════════════════════════ */
  sairRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  sairLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sairIconBox: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  sairIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.danger,
  },
  sairTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.danger,
    marginBottom: 2,
  },
  sairSubtitulo: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sairSeta: {
    fontSize: 24,
    color: COLORS.danger,
    marginLeft: SPACING.sm,
    opacity: 0.6,
  },

  /* ── Aviso de sessão ────────────────────────────────────────── */
  sessaoAviso: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  sessaoAvisoTexto: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  sessaoAvisoEmail: {
    fontWeight: '700',
    color: COLORS.textSecondary,
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