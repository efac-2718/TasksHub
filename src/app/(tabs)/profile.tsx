import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ProfileScreen() {
  // Variables to store Student Name, Student ID and Profile Image.
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

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

  // Load the saved profile once, when the screen first opens
  // (declared after loadProfileData, because it calls loadProfileData)
  useEffect(() => {
    // The state updates in loadProfileData happen after `await`, not synchronously in the effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfileData();
  }, []);

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
      mediaTypes: ['images'], // newer form of ImagePicker.MediaTypeOptions.Images
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
        activeOpacity={0.8}
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
      <Text style={styles.profileText}>Student Profile</Text>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={studentName}
          onChangeText={setStudentName}
        />

        <Text style={styles.label}>Student ID</Text>
        <TextInput
          style={styles.input}
          placeholder="CS/2020/001"
          value={studentId}
          onChangeText={setStudentId}
          autoCapitalize="characters"
        />
      </View>

      {/* Create two different buttons to save the user details
          and clear the database. Call the functions inside the button. */}
      <Pressable
        style={({ pressed }) => [styles.button, styles.saveButton, pressed && styles.pressed]}
        onPress={saveProfileData}
      >
        <Text style={styles.buttonText}>Save Details</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.clearButton, pressed && styles.pressed]}
        onPress={clearAllData}
      >
        <Text style={styles.buttonText}>Clear All Tasks</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  imageContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // half the width makes it a circle
    backgroundColor: '#e6e6e6',
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadgeText: {
    color: 'white',
    fontSize: 14,
  },
  profileText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputSection: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#faf5f5',
    borderRadius: 6,
    width: '100%',
    borderColor: '#d8d5d5',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 6,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: 'red',
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
