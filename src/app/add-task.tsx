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
    if (!taskName) {
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
          body: `Don't forget to complete your ${taskName}.`,
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
    <ImageBackground
      source="https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80"
      style={styles.container}
      imageStyle={styles.image}
      contentFit='cover'
      >
      <View style={styles.container}>
        {/* Insert an image to display as a banner. */}
        <Image
          source=""
          style={styles.image}
          contentFit='cover'
          transition={500}
        />
        <Text style={styles.label}>Task Name</Text>
        {/* Use TextInput to input the task name from the user. */}
        <TextInput placeholder='Enter the task' style={styles.textInput}/>
        <Text style={styles.label}>Task Description</Text>
        {/* Use TextInput to input the task description from the user.
            Use multiline={true} numberOfLines={4} to add multiple lines for the textbox. */}
        <TextInput style={styles.textInput}
          placeholder='Enter the task description'
          multiline={true}
          numberOfLines={4}
        />
        {/* Create a 'Save Task' button using TouchableOpacity.
            (Style it based on the UI) */}
          <TouchableOpacity style={styles.button}/>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    
  },
  image: {

  },
  label: {

  },
  textInput: {

  },
  button: {
    
  }

})