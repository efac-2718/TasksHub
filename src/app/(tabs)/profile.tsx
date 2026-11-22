import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ProfileScreen() {
  // Create variables to store Student Name, Student ID and Profile Image.
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('studentProfile');

      if (storedProfile) {
        const parsedData = JSON.parse(storedProfile);
        setStudentName(parsedData.name || '');
        setStudentId(parsedData.id || '');
        setProfileImage(parsedData.imageUri || null); // Load saved image
      }
    } catch (error) {
      console.error('Failed to load profile data', error);
    }
  };

  // <-- 3. Function to pick an image from the gallery
  const pickImage = async () => {
    // Request permission (optional but good practice)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You've refused to allow this app to access your photos!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allows cropping
      aspect: [1, 1], // Forces a square crop perfect for avatars
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfileData = async () => {
    if (!studentName || !studentId) {
      Alert.alert('Error', 'Please enter both Name and Student ID.');
      return;
    }

    try {
      const profileData = {
        name: studentName,
        id: studentId,
        imageUri: profileImage // <-- Save the image URI
      };

      await AsyncStorage.setItem(
        'studentProfile',
        JSON.stringify(profileData)
      );

      Alert.alert('Success', 'Profile details saved successfully!');
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  // This function is used to clear the data in the storage.
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      setStudentName('');
      setStudentId('');
      setProfileImage(null); // Clear image state
      Alert.alert('Success', 'All local data has been wiped.');
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Wrap image in a TouchableOpacity to trigger the picker */}
      <TouchableOpacity
        onPress={pickImage}
        style={styles.imageContainer}
      >
        <Image
          source={{
            uri: profileImage
              ? profileImage
              : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
          }}
          style={styles.avatar}
        />
        <View style={styles.editBadge}>
          <Text style={styles.editBadgeText}>✎</Text>
        </View>
      </TouchableOpacity>

      {/* Add UI elements to show 'Student Profile' text,
          get the username and Student ID.
          Add placeholders to display text inside the textbox. */}
          <Text style={styles.ProfileText}>Student Profile</Text>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Name</Text>
            <TextInput placeholder='John Doe' style={styles.input}/>
            <Text style={styles.label}>Student ID</Text>
            <TextInput placeholder='CS/2020/001' style={styles.input}/>
          </View>

      {/* Create two different buttons to save the user details
          and clear the database. Call the functions inside the button. */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  ProfileText: {

  },
  input: {
    
  },
  imageContainer: {

  },
  avatar: {

  },
  editBadge: {

  },
  editBadgeText: {

  },
  inputSection: {

  },
  label: {

  },
});