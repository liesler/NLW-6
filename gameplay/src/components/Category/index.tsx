import React from "react";
import { ScrollView } from 'react-native';
import { categories } from '../../utils/category';
import { Categorys } from "../Categorys";
import { styles } from './styles';

type Props={
    categorySelected:string;
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean;
}

export function Category({ categorySelected, hasCheckBox = false , setCategory} : Props){
    return(
        <ScrollView style={styles.container}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40 }}
        >
            {
                categories.map( category =>(
                    <Categorys key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected} 
                        onPress={()=>setCategory(category.id)}
                        hasCheckBox={hasCheckBox} />
                ))
            }
        </ScrollView>
    );
}