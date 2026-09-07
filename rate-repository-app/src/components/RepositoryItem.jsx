import { View, Text } from 'react-native';

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>{item.fullName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.language}</Text>
      <View>
        <View>
          <Text>{item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text>{item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View>
          <Text>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View>
          <Text>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;