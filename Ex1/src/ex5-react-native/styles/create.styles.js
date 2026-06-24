import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from './Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 50, // Extra padding at the bottom for scroll clearance
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.textDark,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTS.small,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
    fontWeight: FONTS.semiBold,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONTS.standard,
    backgroundColor: COLORS.cardBg,
    color: COLORS.textDark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitBtn: {
    backgroundColor: COLORS.textDark, // Black button just like in your original CSS
    padding: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  submitBtnText: {
    color: COLORS.background,
    fontSize: FONTS.standard,
    fontWeight: FONTS.bold,
  }
});