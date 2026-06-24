import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from './Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.textDark,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: FONTS.bold,
    color: COLORS.textDark,
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  // Form Styles
  addSection: {
    backgroundColor: COLORS.border,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.xl,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    fontSize: FONTS.standard,
  },
  addBtn: {
    backgroundColor: COLORS.textDark,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  addBtnText: {
    color: COLORS.background,
    fontWeight: FONTS.bold,
  },
  // List Styles
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: FONTS.standard,
    fontWeight: FONTS.bold,
    color: COLORS.textDark,
  },
  productDesc: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
  },
  productPrice: {
    fontSize: FONTS.standard,
    fontWeight: FONTS.bold,
    color: COLORS.primary,
    marginTop: 4,
  },
  deleteBtn: {
    padding: SPACING.sm,
  }
});