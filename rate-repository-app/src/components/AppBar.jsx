import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 15,
    backgroundColor: theme.colors.appBarBackground || '#24292e',
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    color: theme.colors.white || '#ffffff',
    fontWeight: theme.fontWeights.bold,
    fontSize: 16,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Link to="/" style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin" style={styles.tab}>
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;