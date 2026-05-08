import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passport: string | null;
}

export function PersonalDetailsDetail({
  data,
  onSave,
}: {
  data: PersonalDetailsData;
  onSave: (updatedData: PersonalDetailsData) => void;
}) {
  const [formData, setFormData] = useState(data);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFormData({ ...formData, passport: result.assets[0].name });
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const renderInput = (label: string, value: string, field: keyof PersonalDetailsData, keyboardType: any = 'default') => (
    <View className="mb-4">
      <Text className="text-gray-500 text-xs font-bold uppercase mb-2 ml-1">{label}</Text>
      <View className="bg-white rounded-[16px] border border-gray-100 px-4 h-14 justify-center shadow-sm">
        <TextInput
          value={value}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          placeholder={`Enter your ${label.toLowerCase()}`}
          placeholderTextColor="#9CA3AF"
          className="text-black text-base"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  const handleSaveDetails = () => {
    onSave(formData);
  };

  return (
    <View className="gap-2">
      <View className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 mb-6">
        <Text className="text-lg font-bold mb-4">Contact Information</Text>
        
        {renderInput('First Name', formData.firstName, 'firstName')}
        {renderInput('Last Name', formData.lastName, 'lastName')}
        {renderInput('Email Address', formData.email, 'email', 'email-address')}
        {renderInput('Phone Number', formData.phone, 'phone', 'phone-pad')}
      </View>

      <View className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
        <Text className="text-lg font-bold mb-1">Passport Copy</Text>
        <Text className="text-gray-400 text-xs mb-4">Upload a clear photo of your passport photo page.</Text>
        
        <TouchableOpacity 
          onPress={handleUpload}
          className={`w-full h-16 rounded-[16px] border-2 border-dashed items-center justify-center flex-row ${formData.passport ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50'}`}
        >
          <Ionicons 
            name={formData.passport ? "checkmark-circle" : "cloud-upload-outline"} 
            size={24} 
            color={formData.passport ? "#14B8A6" : "#9CA3AF"} 
          />
          <Text className={`font-bold ml-2 ${formData.passport ? 'text-teal-600' : 'text-gray-500'}`}>
            {formData.passport ? formData.passport : 'Tap to upload passport'}
          </Text>
        </TouchableOpacity>

        {formData.passport && (
           <TouchableOpacity 
             onPress={() => setFormData({ ...formData, passport: null })}
             className="mt-2 self-end"
           >
             <Text className="text-red-500 text-xs font-bold">Remove file</Text>
           </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSaveDetails}
        className="bg-black h-16 rounded-full items-center justify-center mt-6 shadow-lg shadow-black/20"
      >
        <Text className="text-white font-bold text-lg">Save Details</Text>
      </TouchableOpacity>
    </View>
  );
}
