import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
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
    if (!moduleCode || !taskName) {
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
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Saved Successfully! 📋',
          body: `Don't forget to complete your ${moduleCode}.`,
        },
        trigger: null, // trigger immediately
      });

      // 5. Navigate back to dashboard
      router.back();

    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    // Use ImageBackground to display an image in the background of the UI.
    <View style={styles.container}>
      {/* Insert an image to display as a banner. */}

      <Text style={styles.label}>Task Name</Text>
      {/* Use TextInput to input the task name from the user. */}

      <Text style={styles.label}>Task Description</Text>
      {/* Use TextInput to input the task description from the user.
          Use multiline={true} numberOfLines={4} to add multiple lines for the textbox. */}

      {/* Create a 'Save Task' button using TouchableOpacity.
          (Style it based on the UI) */}
    </View>
  );
}