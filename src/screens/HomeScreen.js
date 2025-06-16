import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { checkBackendConnection, getDiseaseInfo } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [diseaseName, setDiseaseName] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // Check backend connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await checkBackendConnection();
        console.log('Backend response:', response);
        setIsConnected(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to connect to backend:', error);
        setIsConnected(false);
        setIsLoading(false);
        Alert.alert(
          'Lỗi Kết Nối',
          'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và cài đặt máy chủ.',
          [{ text: 'OK' }]
        );
      }
    };

    checkConnection();
  }, []);

  const handleSearch = async () => {
    if (!diseaseName.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên bệnh lúa');
      return;
    }

    setSearchLoading(true);
    try {
      const diseaseData = await getDiseaseInfo(diseaseName);
      setSearchLoading(false);
      navigation.navigate('DiseaseDetail', { diseaseData });
    } catch (error) {
      setSearchLoading(false);
      if (error.response && error.response.status === 404) {
        Alert.alert('Không tìm thấy', 'Không tìm thấy thông tin về bệnh lúa này');
      } else {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tìm kiếm thông tin bệnh');
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Đang kết nối đến máy chủ...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Trạng thái máy chủ: {isConnected ? 
            <Text style={styles.connectedText}>Đã kết nối</Text> : 
            <Text style={styles.disconnectedText}>Chưa kết nối</Text>}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.title}>Tra cứu thông tin bệnh lúa</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên bệnh lúa..."
          value={diseaseName}
          onChangeText={setDiseaseName}
        />
        <TouchableOpacity 
          style={[styles.button, !isConnected && styles.disabledButton]} 
          onPress={handleSearch}
          disabled={!isConnected || searchLoading}
        >
          {searchLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Tìm kiếm</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Hướng dẫn sử dụng:</Text>
        <Text style={styles.infoText}>
          1. Nhập tên bệnh lúa cần tra cứu vào ô tìm kiếm{'\n'}
          2. Nhấn nút "Tìm kiếm" để xem thông tin chi tiết về bệnh{'\n'}
          3. Hệ thống sẽ hiển thị thông tin về mô tả và giải pháp cho bệnh lúa
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  statusContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  statusText: {
    fontSize: 16,
  },
  connectedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  disconnectedText: {
    color: 'red',
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
});

export default HomeScreen;