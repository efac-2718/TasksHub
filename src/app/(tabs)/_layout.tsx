import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name = 'index' // In here, give the relevant tab name, for example, index or profile.
        options={{
          title : 'Dashboard', // Give a title as ‘Dashboard’.
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color={typeof color === 'string' ? color : 'blue'}
            />
          ),
        }}
      />
      {/* Create the second tab for the profile.tsx and name it as ‘Profile’. */}
      <Tabs.Screen
        name = 'profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" size={24} color="black" />
          )
        }}/>
    </Tabs>
  );
}