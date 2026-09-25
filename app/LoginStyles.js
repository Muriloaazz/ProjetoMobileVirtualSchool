import { Platform, StyleSheet } from 'react-native';

const COLORS = {
  background:    '#0d1b2a', // dark navy provided by user
  surface:       '#10232f',
  primary:       '#E6F0F5',
  accent:        '#2da6d6',
  accentHover:   '#2b9bd0',
  textPrimary:   '#E6F0F5',
  textSecondary: '#9AB0BA',
  placeholder:   '#7F8B93',
  border:        'rgba(45,166,214,0.18)',
  borderFocus:   '#2da6d6',
  divider:       '#FFFFFF',
  error:         '#ff6b6b',
  errorBg:       '#3b1b1b',
  white:         '#FFFFFF',
  disabled:      '#284651',
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
    position: 'relative',
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },

  /* ──────────────────────────── Header ──────────────────────────── */
  headerSection: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  logoText: {
    ...FONT.title,
    fontSize: 34,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  logoPlaceholder: {
    width: '100%',
    maxWidth: 500,
    aspectRatio: 500 / 230,
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
    width: '100%',
    maxWidth: 480,
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
    backgroundColor: COLORS.surface,
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
    backgroundColor: 'rgba(45,166,214,0.12)',
    borderWidth: 1,
    borderColor: COLORS.accent,
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
    color: COLORS.textPrimary,
  },

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
    backgroundColor: 'rgba(45,166,214,0.35)',
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

