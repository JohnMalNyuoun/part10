import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 15,
    paddingLeft: 15,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;