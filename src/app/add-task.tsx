import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ImageBackground } from 'expo-image';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function AddTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setDescription] = useState('');

  const saveTask = async () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // 1. Fetch existing tasks
      const existingTasks = await AsyncStorage.getItem('tasks');
      let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

      // 2. Add the new task
      const newTask = {
        id: Date.now().toString(),
        taskName,
        taskDescription
      };
      tasksArray.push(newTask);

      // 3. Save back to storage using JSON.stringify
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));

      // 4. Trigger a local notification
      // (Android 13+ and iOS need the user's permission before showing one.
      //  Its own try/catch means a notification problem never stops the task being saved.)
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Task Saved Successfully! 📋',
              body: `Don't forget to complete your ${taskName}.`,
            },
            trigger: null, // trigger immediately
          });
        }
      } catch (notificationError) {
        console.warn('Could not show notification', notificationError);
      }

      // 5. Navigate back to dashboard
      router.back();

    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    // Use ImageBackground to display an image in the background of the UI.
    <ImageBackground
      source="https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80"
      style={styles.background}
      imageStyle={styles.backgroundImage}
      contentFit="cover"
    >
      <View style={styles.container}>
        {/* Insert an image to display as a banner. */}
        <Image
          source="https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg"
          style={styles.banner}
          contentFit="cover"
          transition={500}
        />

        <Text style={styles.label}>Task Name</Text>
        {/* Use TextInput to input the task name from the user. */}
        <TextInput
          style={styles.textInput}
          placeholder="Enter the task"
          value={taskName}
          onChangeText={setTaskName}
        />

        <Text style={styles.label}>Task Description</Text>
        {/* Use TextInput to input the task description from the user.
            Use multiline={true} numberOfLines={4} to add multiple lines for the textbox. */}
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Enter the task description"
          value={taskDescription}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Create a 'Save Task' button using TouchableOpacity.
            (Style it based on the UI) */}
        <TouchableOpacity
          style={styles.button}
          onPress={saveTask}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    opacity: 0.3, // faded, so the form stays easy to read
  },
  container: {
    flex: 1,
    padding: 16,
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c7c7f0',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: '#269e0e',
    borderRadius: 5,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto', // pushes the button to the bottom of the screen
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});
