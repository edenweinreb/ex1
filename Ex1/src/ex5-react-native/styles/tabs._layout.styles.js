import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from './Theme';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
  },
  headerContent: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
  },
  logoText: {
    color: COLORS.background,
    fontSize: FONTS.logo,
    fontWeight: FONTS.bold,
  },
});