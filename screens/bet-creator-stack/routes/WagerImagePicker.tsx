import { Ionicons } from '@expo/vector-icons';
import { Button } from 'components/ui/Button';
import { Screen } from 'components/ui/Screen';
import { baseImageUrl } from 'constants/baseUrl';
import { Colors } from 'constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { useNewWagerStore } from 'models/newWagerStore';
import { useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import { supabase } from 'utils/supabase';

export default function WagerImagePicker({ navigation }: any) {
  const [image, setImage] = useState<null | string>(null);

  const { setWagerThumbnail } = useNewWagerStore();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function uploadFile(file: any) {
    const res = await fetch(`${file}`);
    const blob = await res.arrayBuffer();
    const path = `${Date.now()}`;
    const { data, error } = await supabase.storage.from('thumbnails').upload(path, blob);
    if (error) {
      // Handle error
      console.error(error);
    } else {
      // Handle success
      const imageUrl = `${baseImageUrl}/${data.path}`;
      setWagerThumbnail(imageUrl);
      navigation.navigate('WagerPreview');
      console.log(data);
    }
  }

  return (
    <Screen style={styles.container}>
      <View
        style={{
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingBottom: 100,
        }}>
        <View>
          <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Wager thumbnail</Text>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            Please select an image for your wager
          </Text>
        </View>
        {!image && (
          <Pressable onPress={pickImage} style={styles.placeholder}>
            <Ionicons name="image-outline" size={100} color="white" />
            <Text style={{ color: 'white', fontSize: 18 }}>Tap to open camera roll</Text>
          </Pressable>
        )}
        {image && <Image resizeMode="cover" source={{ uri: image }} style={styles.thumbnail} />}
      </View>
      <Button title="Continue" onPress={() => uploadFile(image)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  thumbnail: {
    width: '100%',
    height: 280,
    borderRadius: 20,
  },
  placeholder: {
    width: '100%',
    height: 280,
    backgroundColor: Colors.lightBlack,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  button: {
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
