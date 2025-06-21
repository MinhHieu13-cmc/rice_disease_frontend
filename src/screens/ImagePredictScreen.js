import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { predictDiseaseFromImage } from '../services/api';

const ImagePredictScreen = () => {
  const [image, setImage] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền sử dụng máy ảnh");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const predictDisease = async () => {
    if (!image) return;
    setPredicting(true);
    try {
      const data = await predictDiseaseFromImage(image);
      setResult(data);
      console.log("✅ Dữ liệu set vào result:", data);

      // ✅ Điều hướng và gửi kết quả + image URI
      navigation.navigate('DiseaseDetail', {
        result: data,
        imageUri: image,
      });
    } catch (err) {
      Alert.alert("Lỗi", "Không thể dự đoán ảnh");
    } finally {
      setPredicting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dự đoán bệnh từ ảnh lá</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Chụp ảnh</Text>
      </TouchableOpacity>

      {image && (
        <TouchableOpacity style={styles.predictButton} onPress={predictDisease}>
          {predicting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Dự đoán</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 300, height: 300, marginBottom: 20, borderRadius: 10 },
  button: {
    backgroundColor: '#8bc34a',
    padding: 12,
    marginVertical: 8,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center'
  },
  predictButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    marginTop: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ImagePredictScreen;
