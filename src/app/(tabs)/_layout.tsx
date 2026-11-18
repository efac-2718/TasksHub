// Import ‘MaterialCommunityIcons’ here.
// Import ‘tabs’ navigation here.

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
        // In here, give the relevant tab name, for example, index or profile.
        options={{
          // Give a title as ‘Dashboard’.
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
      <Tabs />
    </Tabs>
  );
}