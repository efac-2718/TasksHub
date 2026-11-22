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

// Shape of one task, as saved by add-task.tsx
type Task = {
  id: string;
  taskName: string;
  taskDescription: string;
};

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

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

  // useFocusEffect runs every time the screen comes into focus
  // (declared after loadTasks, because it calls loadTasks)
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    // Code the UI between the <ImageBackground> tag.
    <ImageBackground
      source="https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80"
      style={styles.imageStyle}
      contentFit="cover"
    >
      <View style={styles.container}>
        {/* ScrollView component is used to display a scrollable pane. */}
        <ScrollView style={styles.list}>
          <Text style={styles.title}>Your Tasks</Text>
          {tasks.length === 0 ? (
            <Text style={styles.empty}>No tasks saved yet. Add one!</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.taskName}>{task.taskName}</Text>
                <Text style={styles.taskDescription}>{task.taskDescription}</Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* Create a '+ Add New Task' button to open the 'add-task' UI. */}
        <TouchableOpacity
          onPress={() => router.push('/add-task')}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+ Add New Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginVertical: 20,
  },
  empty: {
    color: 'gray',
    fontStyle: 'italic',
  },
  taskCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 12,
    marginBottom: 10,
  },
  taskName: {
    color: 'blue',
    fontWeight: '700',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#333',
  },
  button: {
    backgroundColor: '#269e0e',
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 20,
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});
