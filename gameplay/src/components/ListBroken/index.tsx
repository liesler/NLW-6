import React from "react";
import { View, TextInput, Text} from 'react-native';
import { styles } from './styles';

type Props={
    title: string,
    subtitle: string;
}
export function ListBroken ({title, subtitle} : Props){
    return(
        <View style={styles.container}>
           <Text style={styles.title}>
               {title}
           </Text>

           <Text style={styles.subtitle}>
               {subtitle}
           </Text>
        </View>
    );
}