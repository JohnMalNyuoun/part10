import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import useRepositories from "../hooks/useRepositories";

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  sortContainer: {
    backgroundColor: "white",
    padding: 15,
  },
  sortLabel: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: "#0366d6",
    borderColor: "#0366d6",
  },
  optionText: {
    color: "#24292e",
  },
  selectedOptionText: {
    color: "white",
    fontWeight: "bold",
  },
});

export const RepositoryListContainer = ({
  repositories,
  onRepositoryPress,
  orderBy,
  orderDirection,
  onOrderChange,
}) => {
  // Extract nodes from GraphQL edges structure safely
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        onOrderChange ? (
          <View style={styles.sortContainer}>
            <View>
              <Text style={styles.sortLabel}>Order repositories by</Text>
              {[
                ["Latest repositories", "CREATED_AT", "DESC"],
                ["Highest rated repositories", "RATING_AVERAGE", "DESC"],
                ["Lowest rated repositories", "RATING_AVERAGE", "ASC"],
              ].map(([label, nextOrderBy, nextOrderDirection]) => {
                const selected =
                  orderBy === nextOrderBy &&
                  orderDirection === nextOrderDirection;

                return (
                  <Pressable
                    key={label}
                    style={[styles.option, selected && styles.selectedOption]}
                    onPress={() =>
                      onOrderChange({
                        orderBy: nextOrderBy,
                        orderDirection: nextOrderDirection,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.selectedOptionText,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null
      }
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
  const [order, setOrder] = React.useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });
  const { repositories } = useRepositories(order);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={order.orderBy}
      orderDirection={order.orderDirection}
      onOrderChange={setOrder}
      onRepositoryPress={(repositoryId) =>
        navigate(`/repository/${repositoryId}`)
      }
    />
  );
};

export default RepositoryList;
