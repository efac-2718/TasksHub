# TasksHub

Mobile Application Development, Practical Tutorial 07: **Persistent Storage & Local Notifications**.

TasksHub is a small task manager built with Expo and Expo Router. You can add tasks, see them on a dashboard, and keep a student profile with a photo. Tasks and profile details are saved on the device, so they are still there after you close and reopen the app.

## What we built

| Screen | File | What it does |
|---|---|---|
| Root layout | `src/app/_layout.tsx` | Sets up the notification handler so alerts show while the app is open, and defines a **Stack** with the `(tabs)` group as the main screen and `add-task` as a modal on top. |
| Tabs layout | `src/app/(tabs)/_layout.tsx` | Bottom tab bar with two tabs, **Dashboard** and **Profile**, using vector icons. |
| Dashboard | `src/app/(tabs)/index.tsx` | Reads the saved tasks from AsyncStorage and lists them over a background image. `useFocusEffect` reloads the list every time you come back to this tab. The **+ Add New Task** button opens the Add Task screen. |
| Add Task | `src/app/add-task.tsx` | Form for a task name and a multi-line description. **Save Task** adds the task to the saved array, shows a local notification, and goes back to the Dashboard. |
| Profile | `src/app/(tabs)/profile.tsx` | Student name, student ID and a profile photo chosen from the gallery with the Image Picker. **Save Details** stores the profile; **Clear All Tasks** wipes all saved data. |

## Concepts covered

- **Component state vs persistent storage:** `useState` only lasts while the screen is open. AsyncStorage keeps data after the app is closed.
- **AsyncStorage:** stores strings only, so the task array and profile object are saved with `JSON.stringify()` and read back with `JSON.parse()`.
- **Hybrid navigation (Tabs + Stack):** the tabs switch between Dashboard and Profile. The Stack puts Add Task on top of the tabs, so the back arrow returns to the Dashboard.
- **Local notifications (`expo-notifications`):** a notification is triggered by the app itself, right after a task is saved, with no server involved.
- **Image Picker (`expo-image-picker`):** asks for photo-library permission, then opens the gallery with a square crop for the avatar. The chosen image's URI is saved with the profile.

## Project structure

```
src/app/
├── _layout.tsx        Root Stack + notification handler
├── add-task.tsx       Add Task screen (modal)
└── (tabs)/
    ├── _layout.tsx    Bottom tabs
    ├── index.tsx      Dashboard
    └── profile.tsx    Profile
```

## Running the app

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone.

## Output screens

Screenshots of the running app, including proof of the image picker, are in the [`Output_Screens`](Output_Screens) folder.
