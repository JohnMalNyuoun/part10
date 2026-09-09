import { FlatList, View } from "react-native";
import { useQuery } from "@apollo/client";

import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { ME } from "../graphql/queries";

const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading && !data) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default MyReviews;
