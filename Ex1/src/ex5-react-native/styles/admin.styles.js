import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from './Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.textDark,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  addBtnText: {
    color: COLORS.background,
    fontWeight: FONTS.bold,
    fontSize: FONTS.small,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: FONTS.large,
    fontWeight: FONTS.bold,
    color: COLORS.textDark,
    marginBottom: 4,
    textAlign: 'left',
  },
  restaurantDesc: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
    textAlign: 'left',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
    borderRadius: 6,
  },
  editBtn: {
    backgroundColor: '#f0f0f0', 
  },
  deleteBtn: {
    backgroundColor: '#ffebee', 
  },
  loader: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: SPACING.xl,
  }
});