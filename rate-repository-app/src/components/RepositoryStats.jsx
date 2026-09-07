import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryStats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{formatCount(stargazersCount)}</Text>
        <Text style={styles.statLabel}>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{formatCount(forksCount)}</Text>
        <Text style={styles.statLabel}>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{formatCount(reviewCount)}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{formatCount(ratingAverage)}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;