import { useState } from 'react';
import { Alert, Clipboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'https://ay2vcnkkpl.execute-api.eu-north-1.amazonaws.com';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!url) {
      Alert.alert('Enter a URL first');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortUrl(`${API_URL}/${data.short_code}`);
    } catch (error) {
      Alert.alert('Error', 'Could not shorten URL');
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(shortUrl);
    Alert.alert('Copied!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maacah's URL Shortener</Text>
      

      <TextInput
        style={styles.input}
        placeholder="Paste a long URL and get a short one"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={shortenUrl} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Shortening...' : 'Shorten'}</Text>
      </TouchableOpacity>

      {shortUrl ? (
        <TouchableOpacity style={styles.resultBox} onPress={copyToClipboard}>
          <Text style={styles.resultText}>{shortUrl}</Text>
          <Text style={styles.tapHint}>Tap to copy</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={{ textAlign: 'center', marginTop: 20 }}>
        Do have a beautiful day!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultBox: { marginTop: 25, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, width: '100%' },
  resultText: { fontSize: 16, color: '#007AFF', textAlign: 'center' },
  tapHint: { fontSize: 12, color: '#888', textAlign: 'center', marginTop: 5 },
});