# TasksHub

TasksHub is a simple task manager built with Expo and Expo Router. It uses a hybrid navigation setup: a bottom tab bar switches between the Dashboard and Profile screens, and a Stack opens the Add Task screen as a modal on top of the tabs. On the Dashboard, you can view saved tasks and add new ones. On the Profile screen, you can save your name and student ID and pick a profile photo from the device gallery using `expo-image-picker`.

All data is stored on the device with AsyncStorage, so tasks and profile details are still there after the app is closed and reopened. Because AsyncStorage only stores strings, the task list and profile are saved with `JSON.stringify()` and read back with `JSON.parse()`, and `useFocusEffect` reloads the task list each time you return to the Dashboard. When a task is saved, the app triggers a local notification with `expo-notifications`, and the Clear All Tasks button wipes all stored data.
