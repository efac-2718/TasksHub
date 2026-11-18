import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function DashboardScreen() {
  const [tasks, setTasks] = useState([]);

  // useFocusEffect runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');

      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  return (
    // Code the UI between the <ImageBackground> tag.
    // ScrollView component is used to display a scrollable pane.
    <ScrollView style={styles.list}>
      {tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks saved yet. Add one!</Text>
      ) : (
        tasks.map((task: any) => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.moduleText}>{task.moduleCode}</Text>
            <Text>{task.taskName}</Text>
          </View>
        ))
      )}
    </ScrollView>

    // Create a '+Add New Task' button to open the 'add-task' UI
    </View>
    </ImageBackground>
  );
}