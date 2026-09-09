// src/components/SingleRepository.jsx
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet } from "react-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const REVIEWS_PAGE_SIZE = 5;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id, first: REVIEWS_PAGE_SIZE },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const repository = data.repository;
  if (!repository) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Repository not found.</Text>
      </View>
    );
  }
  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  const hasNextPage = repository.reviews?.pageInfo?.hasNextPage;

  const loadMoreReviews = () => {
    if (!hasNextPage || loading) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId: id,
        first: REVIEWS_PAGE_SIZE,
        after: repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={loadMoreReviews}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={repository} showGitHubButton={true} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepository;
