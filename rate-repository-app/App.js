import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

export default function App() {
  return (
    <>
      <NativeRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}