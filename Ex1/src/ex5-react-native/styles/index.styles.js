import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from './Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.border,
    margin: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderRadius: 10,
    height: FONTS.inputHeight,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTS.standard,
    textAlign: 'left', 
  },
  sectionTitle: {
    fontSize: FONTS.title,
    fontWeight: FONTS.bold,
    marginHorizontal: SPACING.lg,
    marginBottom: 10,
    color: COLORS.textDark,
    textAlign: 'left',
  },
  categoriesContainer: {
    paddingLeft: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: SPACING.lg,
    opacity: 0.7,
  },
  categoryItemActive: {
    opacity: 1,
  },
  categoryImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: FONTS.small,
    fontWeight: FONTS.semiBold,
  },
  restaurantsGrid: {
    paddingHorizontal: SPACING.lg,
  },
  restaurantCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantImg: {
    width: '100%',
    height: 150,
  },
  restaurantInfo: {
    padding: SPACING.md,
  },
  restaurantName: {
    fontSize: FONTS.large,
    fontWeight: FONTS.bold,
    marginBottom: SPACING.xs,
    textAlign: 'left',
  },
  restaurantDesc: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
    marginBottom: SPACING.sm,
    textAlign: 'left',
  },
  restaurantFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ratingText: {
    fontSize: FONTS.small,
    fontWeight: FONTS.bold,
    color: COLORS.textDark,
  },
  noResultsText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: SPACING.xl,
  },
  loader: {
    marginTop: 50,
  },
  bottomSpacer: {
    height: 40,
  }
});