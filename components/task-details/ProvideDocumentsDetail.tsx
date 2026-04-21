import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export function ProvideDocumentsDetail({ data }: { data: any[] }) {
  const [documents, setDocuments] = useState([...data]);

  const handleUpload = async (index: number) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newDocs = [...documents];
        newDocs[index] = { ...newDocs[index], status: 'UPLOADED' };
        setDocuments(newDocs);
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  return (
    <View className="gap-4">
      <View className="mb-2">
        <Text className="text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-md text-xs font-medium border border-yellow-200">
          Tip: Use clear photos in good light. PDFs and JPGs up to 10MB.
        </Text>
      </View>

      {documents.map((doc, index) => (
        <View key={doc.id || index} className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 mb-2">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-row flex-1">
               <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${doc.iconColor}`}>
                 <Ionicons name={doc.icon as any} size={20} />
               </View>
               <View className="flex-1 pr-2">
                 <View className="flex-row items-center mb-1 flex-wrap">
                   <Text className="text-black text-base font-bold mr-2">{doc.name}</Text>
                   {doc.required && (
                     <Text className="text-red-500 text-[10px] font-bold uppercase">REQUIRED</Text>
                   )}
                 </View>
                 <Text className="text-gray-400 text-xs">{doc.desc}</Text>
               </View>
            </View>
            <View>
               <Text className={`text-[10px] font-bold uppercase ${doc.status === 'UPLOADED' ? 'text-teal-500' : 'text-gray-400'}`}>
                 {doc.status}
               </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={() => handleUpload(index)}
            className={`w-full h-12 rounded-full items-center justify-center flex-row ${doc.status === 'UPLOADED' ? 'bg-gray-100' : 'bg-black'}`}
          >
            <Ionicons name="cloud-upload-outline" size={18} color={doc.status === 'UPLOADED' ? 'black' : 'white'} />
            <Text className={`font-bold ml-2 ${doc.status === 'UPLOADED' ? 'text-black' : 'text-white'}`}>
              {doc.status === 'UPLOADED' ? 'Replace file' : 'Upload file'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

