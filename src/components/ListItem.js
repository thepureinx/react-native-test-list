import React from 'react';
import { View } from 'react-native';

const ListItem = ({ rowData }) => {
  return (
    <View style={{paddingVertical: 8, paddingHorizontal: 30, backgroundColor: backgroundColor ? backgroundColor : '#0093dd', borderRadius: 4}}>
       <Text>{rowData.title}</Text>
    </View>
  );
};
export { ListItem };