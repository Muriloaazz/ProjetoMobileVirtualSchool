import { Platform, StyleSheet } from 'react-native';

const COLORS = {
  background:    '#F7F8FA',
  surface:       '#FFFFFF',
  primary:       '#1A1A2E',
  accent:        '#2b6cb2',
  accentHover:   '#2b6cb2',
  textPrimary:   '#1A1A2E',
  textSecondary: '#6B7280',
  placeholder:   '#AAAAAA',
  border:        '#E5E7EB',
  borderFocus:   '#2b6cb2',
  error:         '#ff0000',
  errorBg:       '#FEF2F2',
  divider:       '#D1D5DB',
  white:         '#FFFFFF',
  disabled:      '#2b6cb2',
};

const SPACING = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
};

const RADIUS = {
  sm:  6,
  md:  12,
  lg:  18,
  full: 999,
};

const FONT = {
  title:    { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, fontWeight: '400' },
  label:    { fontSize: 13, fontWeight: '600', letterSpacing: 0.3 },
  input:    { fontSize: 15, fontWeight: '400' },
  button:   { fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  link:     { fontSize: 14, fontWeight: '600' },
  small:    { fontSize: 12, fontWeight: '400' },
  eye:      { fontSize: 12, fontWeight: '600' },
  divider:  { fontSize: 13, fontWeight: '500' },
  footer:   { fontSize: 14, fontWeight: '400' },
};

const styles = StyleSheet.create({
  /* ──────────────────────────── Layout ──────────────────────────── */
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
  },

  /* ──────────────────────────── Header ──────────────────────────── */
  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  logoPlaceholder: {
    width: 500,
    height: 230,
    marginBottom: -SPACING.xs,
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: '#00000020',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  title: {
    ...FONT.title,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...FONT.subtitle,
    color: COLORS.textSecondary,
  },

  /* ──────────────────────────── Form ──────────────────────────── */
  formSection: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    ...FONT.label,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    height: 52,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorBg,
  },
  input: {
    flex: 1,
    ...FONT.input,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  inputPassword: {
    paddingRight: SPACING.sm,
  },
  eyeButton: {
    paddingLeft: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  eyeButtonText: {
    ...FONT.eye,
    color: COLORS.accent,
  },
  errorText: {
    ...FONT.small,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  feedbackBox: {
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  feedbackSuccess: {
    backgroundColor: '#ECFDF3',
    borderWidth: 1,
    borderColor: '#34D399',
  },
  feedbackError: {
    backgroundColor: COLORS.errorBg,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  feedbackText: {
    ...FONT.small,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* ──────────────────────── Recuperação de Senha ──────────────── */
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: -SPACING.xs,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  forgotPasswordText: {
    ...FONT.link,
    color: COLORS.accent,
  },

  /* ──────────────────────────── Botão ──────────────────────────── */
  loginButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  loginButtonText: {
    ...FONT.button,
    color: COLORS.white,
  },

  /* ──────────────────────────── Divisor ──────────────────────────── */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  dividerText: {
    ...FONT.divider,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.md,
  },

  /* ──────────────────────────── Rodapé ──────────────────────────── */
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  footerText: {
    ...FONT.footer,
    color: COLORS.textSecondary,
  },
  footerLink: {
    ...FONT.link,
    color: COLORS.accent,
  },
});

export default styles;