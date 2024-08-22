import { Text, View } from 'react-native'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <View className="bg-black/20 h-28 w-full flex-row items-end px-8 pb-4 border-b border-white/10">
      <Text className="flex-1 text-white font-medium text-lg text-center">
        {title}
      </Text>
    </View>
  )
}
