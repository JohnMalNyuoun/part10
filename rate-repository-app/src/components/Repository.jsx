import { View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
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

  return (
    <View style={styles.container}>
      <RepositoryItem item={data.repository} showGitHubButton />
    </View>
  );
};

export default Repository;
