import { View, Image, StyleSheet, Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  fullName: {
    fontWeight: theme.fontWeights.bold,
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  languageBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  languageText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryHeader = ({ fullName, description, language, ownerAvatarUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.languageBadge}>
          <Text style={styles.languageText}>{language}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryHeader;