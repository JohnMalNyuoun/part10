
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import Text from './Text';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const currentUser = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <Pressable style={styles.tab}>
          <Link to="/">
            <Text style={styles.tabText}>Repositories</Text>
          </Link>
        </Pressable>
        {currentUser ? (
          <>
            <Pressable style={styles.tab}>
              <Link to="/create-review">
                <Text style={styles.tabText}>Create a review</Text>
              </Link>
            </Pressable>
            <Pressable style={styles.tab} onPress={handleSignOut}>
              <Text style={styles.tabText}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.tab}>
            <Link to="/signin">
              <Text style={styles.tabText}>Sign in</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;