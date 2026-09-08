import { View, StyleSheet } from 'react-native';
import RepositoryHeader from './RepositoryHeader';
import RepositoryStats from './RepositoryStats';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryHeader
        fullName={item.fullName}
        description={item.description}
        language={item.language}
        ownerAvatarUrl={item.ownerAvatarUrl}
      />
      <RepositoryStats
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;