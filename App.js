
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  SectionList,
  FlatList,
  TextInput,
  Image,
  Alert,
} from 'react-native';

const Seperator = () => <View style = {styles.Seperator}/>


function HomeScreen({navigation}) {
  const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    success: '#358138',
    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
  }
  return (
    <View>
      <View style={{
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: COLORS.success,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        alignItem: 'center'
      }}>
      <Text style={{color:'white'}}>BOOKS</Text>
      </View>
      <FlatList
        data={bookdata}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
       
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard', item.key==0 ? RNDATA:FDATA)}>

              <View style={{ backgroundColor: '#fff', height: 220, width: 150, elevation: 10, margin: 10, borderRadius: 10 }}>
                <View style={{ flex: 50 }}>
                  <Image source={item.image} style={{ height: 120, width: 150 }} />
                </View>
                <View style={{ flex: 40 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>{item.title}</Text>
                  </View>
                </View>
              </View>

            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

function Dashboard({navigation, route}) {
  const data = route.params;
  console.log(data);
  const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    success: '#358138',
    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
  }
  return ( 
    <ScrollView>

    <View>
      <View style={{
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: COLORS.success,
        alignItems: 'center',
        justifyContent: 'center', // center, space-around
        paddingLeft: 10,
        paddingRight: 10,
        alignItem: 'center'
      }}>
        <Text style={{ color: 'white' }}>BOOKS</Text>
      </View>
      <TextInput style = {{backgroundColor:'lightgrey', marginTop:10, marginBottom:10,borderRadius:20}} placeholder='Search'>

      </TextInput>
  <SectionList
        sections={data}
        renderSectionHeader={({section}) => (
          <View
            style={{
              backgroundColor: 'grey',
              padding: 5,
              marginBottom: 5,
              height: 40,
              width: 400,
            }}>
            <Text> {section.title} </Text>
          </View>
        )}

        renderItem={({ item, section }) =>

          <TouchableOpacity
            style={{
              padding: 15,
              marginBottom: 5,
              height: 80,
            }}
            onPress={()=> navigation.navigate('Grocery')}
            >
            <Text> {item.title} </Text>
          </TouchableOpacity>
        }/>
    </View>
    </ScrollView>
  );
}

function Grocery({navigation}){

  

  const submitPost = (item) => {
    

    firestore()
    .collection('sale')
    .add({
      fruitname:'Apple',
      price:'30',
      quantity:'2'
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  };
  
    const data = [
      { src:require('./android/app/src/main/assets/p9.jpg'),title: "Mango",  body: '100 % Gurantee of Quality Delivery Service is available contact us',price: 250,city:"Lahore",quantity:2, key: '1' },
      {src:require('./android/app/src/main/assets/p8.jpg'),title: "Lemon",  body: '100 % Gurantee of Quality Delivery Service is available contact us',price: 250,city:"Lahore",quantity:2, key: '2' },
      { src:require('./android/app/src/main/assets/p10.jpg'),title: "Apple",  body: '100 % Gurantee of Quality Delivery Service is available contact us',price: 250,city:"Lahore",quantity:2, key: '3' },
      {src:require('./android/app/src/main/assets/p11.jpg'),title: "Tomato",  body: '100 % Gurantee of Quality Delivery Service is available contact us',price: 250,city:"Lahore",quantity:2, key: '4' },
     
      ];
   return (
       <View style={styles.container} >
         <View style={{flex:0.85,backgroundColor:'white'}}>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={{color:"black",fontSize:30,fontWeight:"bold",margin:5}}>←</Text>
        </TouchableOpacity>
        <TextInput
        style={{width:250,marginLeft:20,backgroundColor:"#C5C5C5",borderRadius:8,margin:8}}
      placeholder="Search Groceries or Products"
      onChangeText={(e) => setSearch(e)}
    />
         <Image source={require('./android/app/src/main/assets/p1.png')} style={styles.tinyLogo} />
       </View>

       
      </View>
      <Seperator/>
      <View style={{flex:0.9,flexDirection:"row"}}>
        <Text style={{color:"black",fontWeight:"bold",fontSize:25,paddingRight:20,marginRight:80}}>Fruits & Vegetables</Text>
       <Image source={require('./android/app/src/main/assets/p5.png')} style={{height:30,width:30}} />
       <Image source={require('./android/app/src/main/assets/p4.png')} style={{height:30,width:30,marginLeft:8}} />
      
       </View>

       <View style={{flex:9}}>
          <FlatList 
          data={data}
          
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          renderItem={({item}) => (
             <View > 
                
                
      <View style={{backgroundColor:'#fff',height:250,width:180, elevation:10, margin:10,borderRadius:10}}>
        <View style={{flex:50}}>
              <Image source={item.src}  style={{resizeMode: 'contain',height:140,width:170}}/>
        </View>
<View style={{flex:30}}>
  <View style={{flex:60,flexDirection:"row"}}>
    <View style={{flex:50}}>
          <Text style={{fontWeight:'bold',color:'black',fontSize:16,marginLeft:10}}>{item.title}</Text>
   </View>
   <View style={{flex:50}}>
   <Text style={{fontWeight:'bold',color:'grey',fontSize:14,marginLeft:10,marginTop:5}}>₹{item.price}</Text>
   </View>
         
  </View> 
  <View style={{flex:40,flexDirection:"row"}}>
<View style={{flex:15,margin:5}}>
<TouchableOpacity style={{backgroundColor:"#FAD5A5",marginLeft:"20%",borderRadius:20,width:40,height:20}}>
  <Text style={{color:"red",fontSize:20,fontWeight:"bold",marginLeft:"40%",marginTop:"-15%"}}>-</Text>
</TouchableOpacity>
</View>
<View style={{flex:10}}>
<Text style={{fontWeight:'bold',color:'black',fontSize:17,marginLeft:10}}>2</Text>
</View>
<View style={{flex:15,margin:5}}>
<TouchableOpacity style={{backgroundColor:"#FAD5A5",borderRadius:20,width:40,height:20}}>
  <Text style={{color:"red",fontSize:20,fontWeight:"500",marginLeft:"40%",marginTop:"-15%"}}>+</Text>
</TouchableOpacity>
</View>

  
       </View>
       <View style={{backgroundColor:'#FAD5A5',marginTop:28}}>
  <TouchableOpacity onPress={() => submitPost(item.key)}>
  <Text style={{color:"red",fontSize:16,fontWeight:"500",textAlign:'center',marginTop:"-15%",}}>Add to cart</Text>
  </TouchableOpacity>
</View>
       </View>
  
       </View>
     
            </View>
           

          )}/>
      </View> 
   </View>
  );
}
const bookdata = [{key:0, title: 'React Native for Beginners', image: require('./android/app/src/main/assets/rnbook.jpg'), book: 'RNDATA'}, {key:1, title: 'Flutter for Beginners', image: require('./android/app/src/main/assets/flutter.png'), book:'FDATA'},];
const RNDATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Chapter 1 - What is React Native',
    key: 0,
    data: [{ key: 0, title: 'React Native is a cross platform framework for building Mobile Apps. React Native is a cross platform framework for building Mobile Apps' }, ],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 2 - Why React Native is best',
    key: 1,
    data: [{key: 0, title: 'React Native is a cross platform framework for building Mobile Apps. React Native is a cross platform framework for building Mobile Apps'}, ],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 3 - Wat is JSX',
    key: 2,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 4 - What is State',
    key: 3,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 5 - What are Props',
    key: 4,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
];


const FDATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Chapter 1 - What is Flutter',
    key: 0,
    data: [{ key: 0, title: 'Flutter is a cross platform framework for building Mobile Apps. Flutter is a cross platform framework for building Mobile Apps' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 2 - Why Flutter is best',
    key: 1,
    data: [{ key: 0, title: 'Flutter is a cross platform framework for building Mobile Apps. Flutter is a cross platform framework for building Mobile Apps' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 3 - Wat is DART',
    key: 1,
    data: [{ key: 0, title: 'Flutter is based on DART' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 4 - What is State',
    key: 1,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 5 - What are components in Flutter',
    key: 1,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
];

const Stack = createNativeStackNavigator();


function App() {
  var RNFS = require('react-native-fs');

  var path0 = 'Books.rtf';

  RNFS.readFileAssets(path0).then(contents => {
    var contentstring = contents.toString();
    var topic=[];
    var question=[];
    var answer=[];
    for(var i = 0;i<contentstring.length; i++){
      var firstindex=contentstring.indexOf('@', i);
      var secondindex = contentstring.indexOf('@', firstindex+i);
      if (secondindex == -1 || firstindex == -1){
        break;
      }
      var tempstring = contentstring.slice(firstindex+1, secondindex-1);
      topic.push(tempstring);
    }
    for (var i = 0; i < contentstring.length; i++) {
      var firstindex = contentstring.indexOf('&', i);
      var secondindex = contentstring.indexOf('&', firstindex + i);
      if (secondindex == -1 || firstindex == -1) {
        break;
      }
      var tempstring = contentstring.slice(firstindex + 1, secondindex - 1);
      question.push(tempstring);
    }

    for (var i = 0; i < contentstring.length; i++) {
      var firstindex = contentstring.indexOf('$', i);
      var secondindex = contentstring.indexOf('$', firstindex + i);
      if (secondindex == -1 || firstindex == -1) {
        break;
      }
      var tempstring = contentstring.slice(firstindex + 1, secondindex - 1);
      answer.push(tempstring);
    }
    
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
        <Stack.Screen name="Grocery" component={Grocery} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  Seperator:{
   marginVertical:6,
   borderBottomColor:"#F2F3F4",
   borderBottomWidth:5
},
headline: {
 color: 'black', 
 textAlign: 'center', 
 fontWeight: 'bold',
margin:10,
 fontSize: 40,
},
    tinyLogo: {
     marginLeft:30,
     width: 100,
     height:100,
},
TextInput: {
 height: 50,
 width:300,
 height: 40,
 borderColor:'black',
 borderWidth:2,
 margin:16,
 borderRadius:8
},
tinyLogo: {
 width: 40,
 height: 40,
 marginTop:8,
 marginLeft:20
},
signIn: {
 width: '50%',
 height: 50,
 justifyContent: 'center',
 alignItems: 'center',
 borderRadius: 10
 
},
image: {
flex: 1,
justifyContent: "center"
},
textSign: {
fontSize: 18,
fontWeight: 'bold'
},

actionButtonIcon: {
 fontSize: 20,
 height: 22,
 color: 'white',
},

});
export default App;