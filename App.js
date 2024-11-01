import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CountryInfo = () => {
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCountryInfo = async () => {
    setLoading(true);
    setError('');
    setCountryData(null);

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      setCountryData(response.data[0]);
    } catch (err) {
      setError('País não encontrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do país"
        value={countryName}
        onChangeText={setCountryName}
      />
      <TouchableOpacity style={styles.button} onPress={fetchCountryInfo}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        countryData && (
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{countryData.name.common}</Text>
            <Text style={styles.infoText}>Capital: {countryData.capital}</Text>
            <Text style={styles.infoText}>População: {countryData.population}</Text>
            <Text style={styles.infoText}>Região: {countryData.region}</Text>
            <Text style={styles.infoText}>Sub-região: {countryData.subregion}</Text>
            <Text style={styles.infoText}>Línguas: {Object.values(countryData.languages).join(', ')}</Text>
            <Text style={styles.infoText}>Moeda: {Object.values(countryData.currencies).map(currency => currency.name).join(', ')}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#6200ea',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  error: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CountryInfo;
