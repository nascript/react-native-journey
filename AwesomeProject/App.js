import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View, ListItem, ScrollView} from 'react-native';
import tw from 'twrnc';

const App = () => {
  const [dataSurah, setDataSurah] = useState([]);
  const [dataAyah, setDataAyah] = useState([]);

  useEffect(() => {
    getSurahQuran();
    getAyahQuran();
  }, []);

  // const getSurahQuran = async () => {
  //   const data = await  fetch('http://api.alquran.cloud/v1/surah').then(response => response.json()).then(json => setDataSurah(json))

  //   return data
  // }
  const getAyahQuran = async () => {
    const data = await fetch('https://equran.id/api/surat/1').then(response =>
      response.json(),
    );

    setDataAyah(data);
    return data;
  };

  const getSurahQuran = async () => {
    const data = await fetch('https://equran.id/api/surat').then(response =>
      response.json(),
    );

    setDataSurah(data);
    return data;
  };

  return (
    <ScrollView>
      <AyahList data={dataAyah} />
      <SurahList data={dataSurah} />
    </ScrollView>
  );
};

const SurahList = ({data}) => {
  const list = () => {
    return data?.map(element => {
      return (
        <>
          <View
            key={element.key}
            style={{
              margin: 10,
              backgroundColor: '#B52F72',
              padding: 10,
            }}>
            <View
              key={element.key}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* <Text>{element.nama}</Text> */}
              <Text style={{marginRight: 3, fontSize: 16, color: 'white'}}>
                {element.nama_latin} {element.jumlah_ayat}
              </Text>
              <Text style={{marginRight: 3, fontSize: 15, color: 'white'}}>
                {element.nama}
              </Text>
            </View>
            <Text style={{marginRight: 3, fontSize: 15, color: 'white'}}>
              {element.tempat_turun}
            </Text>
          </View>
        </>
      );
    });
  };

  return <View>{list()}</View>;
};
const AyahList = ({data}) => {
  const dataQuran = data?.ayat;

  const list = () => {
    return (
      <>
        <View
          style={{
            margin: 10,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#B52F72',
            padding: 10,
          }}>
          <Text style={{marginRight: 3, fontSize: 30, color: 'white'}}>
            {data?.nama_latin}
          </Text>
          <Text
            style={{
              marginRight: 3,
              fontSize: 20,
              color: 'black',
              backgroundColor: 'white',
              height: 20,
              width: 20,
              borderRadius: 100,
              textAlign: 'center',
            }}>
            {data?.jumlah_ayat}
          </Text>
        </View>
        <View style={{margin: 10}}>
          {dataQuran?.map(element => {
            return (
              <View key={element.key} style={{margin: 10, display: 'flex'}}>
                <Text>{element.ar}</Text>
                <Text>{element.idn}</Text>
              </View>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <>
      <View>{list()}</View>
    </>
  );
};

export default App;
