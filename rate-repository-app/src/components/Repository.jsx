import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground || "#e1e4e8",
  },
});

const Repository = () => {
  const { repositoryId } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  });

  if (!data?.repository) {
    return null;
  }

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <RepositoryItem item={data.repository} showGitHubButton />
      }
    />
  );
};

export default Repository;
