import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from 'components/BackButton';
import { Button } from 'components/ui/Button';
import Input, { SearchInput } from 'components/ui/Input';
import { Screen } from 'components/ui/Screen';
import { Colors } from 'constants/colors';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View, Image } from 'react-native';
import { supabase } from 'utils/supabase';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNewWagerStore } from 'models/newWagerStore';
import NumberPad from 'components/NumberPad';
import WagerImagePicker from './routes/WagerImagePicker';
import WagerStats from 'screens/wagerscreen/components/WagerStats';
import { Ionicons } from '@expo/vector-icons';
import { StakeIndicator } from 'screens/wagerscreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getItem } from 'utils/storage';

const Stack = createStackNavigator();
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const wagerTypes = [
  { title: 'Live Stream' },
  { title: 'Game' },
  { title: 'Entertainment' },
  { title: 'World Event' },
  { title: 'Social' },
  { title: 'Other' },
];
const wagerCategories = [
  { title: 'Sports' },
  { title: 'Music' },
  { title: 'Movies' },
  { title: 'Social Media' },
  { title: 'Politics' },
  { title: 'Celebrities' },
  { title: 'Gaming' },
  { title: 'Other' },
];

const wagerExtraDetails = [
  { title: 'Private', value: 'private' },
  { title: 'Public', value: 'public' },
];

function CheckBoxItem({
  title,
  selected,
  handleSelect,
}: {
  title: string;
  selected: boolean;
  handleSelect: (title: string) => void;
}) {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: selected ? Colors.primary : 'transparent',
      transform: [{ scale: selected ? withTiming(1.1, { duration: 200 }) : 1 }],
    };
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightBlack,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
      }}>
      <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>
      <AnimatedPressable
        onPress={() => handleSelect(title)}
        style={[
          {
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 20,
            width: 30,
            height: 30,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
}

function OptionItem({
  title,
  selected,
  handleSelect,
}: {
  title: string;
  selected: boolean;
  handleSelect: (value: boolean) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightBlack,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
      }}>
      <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>
      <Switch
        thumbColor={'white'}
        trackColor={{ false: 'red', true: Colors.primary }}
        value={selected}
        onValueChange={(value) => handleSelect(value)}
      />
    </View>
  );
}

const WagerTitle = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = React.useState('');
  const [error, setError] = React.useState('');

  const { setWagerTitle } = useNewWagerStore();

  const handleSubmit = React.useCallback(async () => {
    if (!title) {
      setError('Wager title is required');
      return;
    }

    setWagerTitle(title);
    navigation.navigate('WagerDescription');
  }, [title, setError]);

  return (
    <Screen style={styles.container}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 30 }}>Wager Title</Text>
          <Text style={{ color: 'white', fontSize: 20 }}>Enter a title for your wager</Text>
        </View>
        <View style={{ gap: 10 }}>
          <Input
            onChangeText={setTitle}
            error={error}
            setError={setError}
            value={title}
            placeholder="Wager Title"
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <Text style={{ color: 'white', fontSize: 16 }}>Example: Snail Race</Text>
        </View>
      </View>
      <Button title="Next" onPress={handleSubmit} />
    </Screen>
  );
};

const WagerDescription = ({ navigation }: any) => {
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');

  const { setWagerDescription } = useNewWagerStore();

  const handleSubmit = React.useCallback(async () => {
    if (!description) {
      setError('Wager description is required');
      return;
    }

    setWagerDescription(description);

    navigation.navigate('WagerType');
  }, [description, setError]);

  return (
    <Screen style={styles.container}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 30 }}>Wager Description</Text>
          <Text style={{ color: 'white', fontSize: 20 }}>Enter a description for your wager</Text>
        </View>
        <View style={{ gap: 10 }}>
          <Input
            multiline
            numberOfLines={5}
            extraStyles={{ height: 200, textAlignVertical: 'top', paddingVertical: 10 }}
            onChangeText={setDescription}
            error={error}
            setError={setError}
            value={description}
            placeholder="Wager description"
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <Text style={{ color: 'white', fontSize: 16 }}>
            Example: Come watch me race 12 snails
          </Text>
        </View>
      </View>
      <Button title="Next" onPress={handleSubmit} />
    </Screen>
  );
};

const WagerType = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('');
  const [error, setError] = React.useState('');

  const { setWagerType } = useNewWagerStore();

  const handleSubmit = React.useCallback(async () => {
    if (!type) {
      setError('Wager type is required');
      return;
    }
    setWagerType(type);
    navigation.navigate('WagerCategory');
  }, [type, setError]);

  return (
    <Screen style={styles.container}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 30 }}>Wager Type</Text>
          <Text style={{ color: 'white', fontSize: 20 }}>Please select a wager type below</Text>
        </View>
        <View style={{ gap: 26 }}>
          <View>
            <SearchInput
              onChangeText={setTitle}
              error={error}
              setError={setError}
              value={title}
              placeholder="Search types"
            />
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
          </View>

          <View style={{ gap: 10 }}>
            {wagerTypes.map((item) => (
              <CheckBoxItem
                handleSelect={(item) => {
                  if (type === item) {
                    setType('');
                    return;
                  }
                  setType(item);
                }}
                selected={type === item.title}
                key={item.title}
                title={item.title}
              />
            ))}
          </View>
        </View>
      </View>
      <Button title="Next" onPress={handleSubmit} />
    </Screen>
  );
};

const WagerCategory = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [error, setError] = React.useState('');

  const { setWagerCategory } = useNewWagerStore();

  const handleSubmit = React.useCallback(async () => {
    if (!category) {
      setError('Wager category is required');
      return;
    }

    setWagerCategory(category);

    navigation.navigate('WagerPot');
  }, [category, setError]);

  return (
    <Screen style={styles.container}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 30 }}>Wager Category</Text>
          <Text style={{ color: 'white', fontSize: 20 }}>Please select a wager category below</Text>
        </View>
        <View>
          <SearchInput
            onChangeText={setTitle}
            error={error}
            setError={setError}
            value={title}
            placeholder="Search types"
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
      </View>
      <ScrollView contentContainerStyle={{ gap: 10, height: 400, paddingBottom: 50 }}>
        {wagerCategories.map((item) => (
          <CheckBoxItem
            handleSelect={(item) => {
              if (category === item) {
                setCategory('');
                return;
              }
              setCategory(item);
            }}
            selected={category === item.title}
            key={item.title}
            title={item.title}
          />
        ))}
      </ScrollView>
      <Button title="Next" onPress={handleSubmit} />
    </Screen>
  );
};

const WagerDate = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = React.useState('');
  const [error, setError] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    if (!title) {
      setError('Wager title is required');
      return;
    }

    const { data, error } = await supabase
      .from('wagers')
      .insert([{ title, stakers: [] }])
      .select();

    if (error) {
      console.error(error); // error
      return;
    }
    navigation.navigate('WagerDescription');
  }, [title, setError]);

  return (
    <Screen style={styles.container}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 30 }}>Wager Start Date</Text>
          <Text style={{ color: 'white', fontSize: 20 }}>Enter a date for your wager</Text>
        </View>
      </View>
      <Button title="Next" onPress={handleSubmit} />
    </Screen>
  );
};

const WagerPot = ({ navigation }: { navigation: any }) => {
  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState('');

  const { setWagerAmount } = useNewWagerStore();

  const handleSubmit = React.useCallback(async () => {
    if (!amount) {
      setError('Wager title is required');
      return;
    }

    setWagerAmount(amount);

    navigation.navigate('WagerExtraDetails');
  }, [amount, setError]);

  return (
    <Screen style={[styles.container, { justifyContent: 'center', paddingBottom: 80 }]}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Wager Pot</Text>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
            Enter the amount you want to wager
          </Text>
          <Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>
            ${amount ? amount : 0}
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <NumberPad amount={amount} setAmount={setAmount} handleDone={handleSubmit} />
          {error && <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>}
        </View>
      </View>
      {/* <Button title="Next" onPress={handleSubmit} /> */}
    </Screen>
  );
};

const WagerExtraDetails = ({ navigation }: { navigation: any }) => {
  const [extraDetails, setExtraDetails] = React.useState({
    private: false,
    public: false,
  });
  const [seats, setSeats] = React.useState('');
  const [error, setError] = React.useState('');

  const { setWagerSeats } = useNewWagerStore();

  const handleSubmit = React.useCallback(async () => {
    setWagerSeats(Number(seats));
    navigation.navigate('WagerThumbnail');
  }, [extraDetails, setError, seats]);

  return (
    <Screen
      style={{
        paddingTop: 10,
        gap: 20,
        paddingBottom: 30,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
      }}>
      <View style={{ gap: 20 }}>
        <View style={{ gap: 20 }}>
          <View>
            <Text style={{ color: 'white', fontSize: 30 }}>Few more details!</Text>
            <Text style={{ color: 'white', fontSize: 20 }}>
              Please select all options applicable
            </Text>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <View>
            <Text style={{ color: 'white', fontSize: 20 }}>Max Seats</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>
              Total number of people allowed to wager
            </Text>
          </View>
          <Input
            keyboardType="numeric"
            onChangeText={setSeats}
            error={error}
            setError={setError}
            value={seats}
            placeholder="Maximum seats"
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          {/* TODO display payout per seat number here */}
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>Wager Visibility</Text>
          {wagerExtraDetails.map((item) => (
            <OptionItem
              handleSelect={(value) => {
                setExtraDetails({ ...extraDetails, [item.value]: value });
              }}
              selected={extraDetails[item.value as keyof typeof extraDetails]}
              key={item.title}
              title={item.title}
            />
          ))}
        </View>
      </View>

      <Button title="Next" onPress={handleSubmit} />
    </Screen>
  );
};

const WagerPreview = ({ navigation }: { navigation: any }) => {
  const [extraDetails, setExtraDetails] = React.useState({
    private: false,
    public: false,
  });

  const [error, setError] = React.useState('');

  const { thumbnail, title, description, type, category, amount, deadline, seats } =
    useNewWagerStore();

  const handleSubmit = React.useCallback(async () => {
    const username = getItem('username');
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    console.log(user, userError);
    const creator = user?.[0]?.id;

    const { data, error } = await supabase
      .from('wagers')
      .insert([
        {
          title,
          description,
          type,
          category,
          pot: amount,
          seats,
          stakers: [],
          thumbnail,
          creator,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      setError("Wager couldn't be created");
      return;
    }

    navigation.navigate('App');
  }, [extraDetails, setError]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
      headerRight: () => (
        <Ionicons style={{ marginRight: 10 }} name="options-outline" size={24} color="white" />
      ),
      headerTitle: () => <StakeIndicator stake={amount} />,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerTransparent: false,
      headerStyle: {
        backgroundColor: 'black',
      },
    });
  }, []);

  return (
    <Screen
      style={{
        paddingTop: 10,
        gap: 20,
        paddingBottom: 30,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
      }}>
      <View>
        <Image resizeMode="cover" source={{ uri: thumbnail }} style={styles.thumbnail} />
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <WagerStats stake={Number(amount)} type={type} seats={seats} />
      </View>

      <Button title="Create" onPress={handleSubmit} />
    </Screen>
  );
};

const BetCreatorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerTitle"
        component={WagerTitle}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerDescription"
        component={WagerDescription}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerType"
        component={WagerType}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerCategory"
        component={WagerCategory}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerDate"
        component={WagerDate}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerPot"
        component={WagerPot}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerExtraDetails"
        component={WagerExtraDetails}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerPreview"
        component={WagerPreview}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.dark },
          headerTitleStyle: { color: 'white' },
          headerLeft: () => <BackButton onPress={() => {}} />,
          title: '',
          headerShadowVisible: false,
        }}
        name="WagerThumbnail"
        component={WagerImagePicker}
      />
    </Stack.Navigator>
  );
};

export default BetCreatorStack;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    gap: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: '100%',
    height: 280,
    borderRadius: 20,
  },

  detailsContainer: {
    gap: 10,
    paddingHorizontal: 10,
  },
  titleText: { fontSize: 20, fontWeight: '700', color: 'white' },
  descriptionText: { fontSize: 16, fontWeight: '400', color: 'white' },
});
