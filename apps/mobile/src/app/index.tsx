import { Button } from 'heroui-native';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

/** Temporary entry until sign-in exists in M2. Role then comes from the server, not this choice. */
export default function ModeChooserScreen() {
  return (
    <View className="flex-1 justify-center gap-4 bg-background p-6">
      <Text accessibilityRole="header" className="font-manrope-bold text-3xl text-foreground">
        Asta Insite
      </Text>
      <Text className="font-manrope text-base text-foreground">
        Find trusted professionals for your home, or grow your business with new projects.
      </Text>
      <Button onPress={() => router.push('/customer/home')}>I need a professional</Button>
      <Button variant="secondary" onPress={() => router.push('/provider/dashboard')}>
        I am a professional
      </Button>
    </View>
  );
}
