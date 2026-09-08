import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { useContext } from 'react';

import Text from './Text';
import theme from '../theme';
import { ME } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    padding: 20,
  },
  tabText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Pressable style={styles.tab}>
          <Link to="/">
            <Text style={styles.tabText}>Repositories</Text>
          </Link>
        </Pressable>

        {data?.me ? (
          <Pressable style={styles.tab} onPress={onSignOut}>
            <Text style={styles.tabText}>Sign out</Text>
          </Pressable>
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