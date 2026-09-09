import { Alert, FlatList, Platform, View } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-native";

import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const confirmDelete = async (reviewId) => {
    await deleteReview({ variables: { id: reviewId } });
    await refetch();
  };

  const handleDelete = (reviewId) => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this review?")) {
        confirmDelete(reviewId).catch((error) =>
          console.error("Delete review error:", error),
        );
      }
      return;
    }

    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => confirmDelete(reviewId),
        },
      ],
    );
  };

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
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={() => navigate(`/repository/${item.repository.id}`)}
          onDelete={() => handleDelete(item.id)}
        />
      )}
    />
  );
};

export default MyReviews;
