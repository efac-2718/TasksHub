import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function DashboardScreen() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

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
    
    <View style={styles.container}>
      <ImageBackground>
        // ScrollView component is used to display a scrollable pane.
        <ScrollView style={styles.list}>
          <Text style={styles.title}>Your Tasks</Text>
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
        <TouchableOpacity onPress={()=> router.push('/add-task')} activeOpacity={0.8} style={styles.button}>
          <Text style={styles.buttonText}>
            + Add New Task
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  list: {

  },
  empty: {
    marginVertical: 20,
    color: 'gray',
    fontStyle: 'italic'
  },
  taskCard: {

  },
  moduleText: {

  },
  button: {
    backgroundColor: '#269e0e',
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 100,
    paddingVertical: 20,
    marginBottom: 25,

  },
  title: {
    fontSize: 28,
    fontWeight: 900,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 800,
    fontSize: 16,
  }
})