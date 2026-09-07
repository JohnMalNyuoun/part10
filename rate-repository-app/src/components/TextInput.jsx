import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#aab8c2',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
});

const TextInput = ({ style, error, ...props }) => {
  const inputStyle = [styles.input, style, error && styles.errorInput];

  return <NativeTextInput style={inputStyle} placeholderTextColor="#aab8c2" {...props} />;
};

export default TextInput;