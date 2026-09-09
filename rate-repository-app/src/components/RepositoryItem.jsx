import { View, StyleSheet, Button } from "react-native";
import * as Linking from "expo-linking";
import RepositoryHeader from "./RepositoryHeader";
import RepositoryStats from "./RepositoryStats";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  button: {
    marginTop: 15,
  },
});

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  const openRepository = () => Linking.openURL(item.url);

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
      {showGitHubButton && (
        <View style={styles.button}>
          <Button title="Open in GitHub" onPress={openRepository} />
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
