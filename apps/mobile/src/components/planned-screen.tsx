import { Card } from 'heroui-native';
import { Text, View } from 'react-native';

type PlannedScreenProps = { title: string; milestone: string; summary: string };

/** Navigation skeleton only. Replace with the real screen in the named milestone. */
export function PlannedScreen({ title, milestone, summary }: PlannedScreenProps) {
  return (
    <View className="flex-1 justify-center bg-background p-6">
      <Card>
        <Card.Body className="gap-2">
          <Text accessibilityRole="header" className="font-manrope-bold text-2xl text-foreground">
            {title}
          </Text>
          <Text className="font-manrope text-base text-foreground">{summary}</Text>
          <Text className="font-manrope-medium text-sm text-muted">Planned for {milestone}</Text>
        </Card.Body>
      </Card>
    </View>
  );
}
