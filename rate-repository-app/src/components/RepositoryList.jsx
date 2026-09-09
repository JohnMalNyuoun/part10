// src/components/RepositoryList.jsx
import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
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
  searchContainer: {
    padding: 15,
    backgroundColor: "white",
  },
  searchInput: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d0d7de",
  },
  sortContainer: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingBottom: 15,
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
  searchKeyword,
  setSearchKeyword,
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
        <View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search repositories..."
              value={searchKeyword}
              onChangeText={setSearchKeyword}
            />
          </View>
          {onOrderChange ? (
            <View style={styles.sortContainer}>
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
          ) : null}
        </View>
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
  const [order, setOrder] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    ...order,
    searchKeyword: debouncedSearchKeyword,
  });
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={order.orderBy}
      orderDirection={order.orderDirection}
      onOrderChange={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onRepositoryPress={(repositoryId) =>
        navigate(`/repository/${repositoryId}`)
      }
    />
  );
};

export default RepositoryList;