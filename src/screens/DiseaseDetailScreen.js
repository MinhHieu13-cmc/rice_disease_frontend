import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const DiseaseDetailScreen = ({ route, navigation }) => {
  const { result, diseaseData, imageUri } = route.params || {};
  const data = result || diseaseData;

  // Nếu không có dữ liệu, hiển thị thông báo lỗi
  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Không có dữ liệu để hiển thị.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const hasConfidence = typeof data.confidence !== 'undefined';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* ✅ Hiển thị ảnh nếu có */}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        )}

        {/* ✅ Tên bệnh */}
        <Text style={styles.title}>{data.label || data.ten_benh || 'Không rõ'}</Text>

        {/* ✅ Mức độ tin cậy nếu có */}
        {hasConfidence && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mức độ tin cậy:</Text>
            <Text style={styles.sectionContent}>
              {(data.confidence * 100).toFixed(2)}%
            </Text>
          </View>
        )}

        {/* ✅ Mô tả bệnh */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả bệnh:</Text>
          <Text style={styles.sectionContent}>{data.mo_ta || 'Không có mô tả.'}</Text>
        </View>

        {/* ✅ Giải pháp */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giải pháp:</Text>
          <Text style={styles.sectionContent}>{data.giai_phap || 'Không có giải pháp.'}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DiseaseDetailScreen;
