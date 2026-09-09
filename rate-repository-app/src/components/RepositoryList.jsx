import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({
  repositories,
  onRepositoryPress,
}) => {
  // Extract nodes from GraphQL edges structure safely
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const repositoryItem = <RepositoryItem item={item} />;

        return onRepositoryPress ? (
          <Pressable onPress={() => onRepositoryPress(item.id)}>
            {repositoryItem}
          </Pressable>
        ) : (
          repositoryItem
        );
      }}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={(repositoryId) =>
        navigate(`/repositories/${repositoryId}`)
      }
    />
  );
};

export default RepositoryList;
