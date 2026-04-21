import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function BenefitElectionsDetail({ data }: { data: any }) {
  const [housing, setHousing] = useState(data.housing);
  const [schooling, setSchooling] = useState(data.schooling);
  const [healthInsurance, setHealthInsurance] = useState(data.healthInsurance);
  const [flights, setFlights] = useState(data.homeFlights);
  const [vehicle, setVehicle] = useState(data.vehicle);

  return (
    <View className="gap-4">
      
      {/* Housing */}
      <View className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100">
        <View className="flex-row items-center mb-4">
           <View className="w-10 h-10 rounded-full bg-cyan-50 items-center justify-center mr-3">
             <Ionicons name="home-outline" size={20} color="#0891B2" />
           </View>
           <View>
             <Text className="text-black text-base font-bold">Housing</Text>
             <Text className="text-gray-400 text-xs">Choose what you need for your move.</Text>
           </View>
        </View>

        <View className="flex-row justify-between pt-2">
           <TouchableOpacity 
             className="flex-1 mr-2 flex-row items-center justify-between"
             onPress={() => setHousing('Housing allowance')}
           >
              <View>
                <Text className={`text-sm ${housing === 'Housing allowance' ? 'text-black font-bold' : 'text-gray-500'}`}>Housing allowance</Text>
                <Text className="text-gray-400 text-xs">Monthly stipend</Text>
              </View>
              <View className={`w-5 h-5 rounded-full border ${housing === 'Housing allowance' ? 'border-[#0891B2] bg-[#0891B2] items-center justify-center' : 'border-gray-300'}`}>
                {housing === 'Housing allowance' && <Ionicons name="checkmark" size={14} color="white" />}
              </View>
           </TouchableOpacity>

           <TouchableOpacity 
             className="flex-1 ml-2 flex-row items-center justify-between"
             onPress={() => setHousing('Provided housing')}
           >
             <View>
              <Text className={`text-sm ${housing === 'Provided housing' ? 'text-black font-bold' : 'text-gray-500'}`}>Provided housing</Text>
              <Text className="text-gray-400 text-xs">Company-arranged</Text>
             </View>
             <View className={`w-5 h-5 rounded-full border ${housing === 'Provided housing' ? 'border-[#0891B2] bg-[#0891B2] items-center justify-center' : 'border-gray-300'}`}>
               {housing === 'Provided housing' && <Ionicons name="checkmark" size={14} color="white" />}
             </View>
           </TouchableOpacity>
        </View>

        {housing === 'Housing allowance' && (
           <View className="mt-4 pt-4 border-t border-gray-100 flex-row justify-between items-center">
             <Text className="text-gray-400 text-xs">Monthly allowance</Text>
             <View className="w-1/2 h-1.5 bg-[#E5FAFA] rounded-full mx-2">
               <View className="h-full bg-[#0891B2] rounded-full w-full" />
             </View>
             <Text className="text-black text-sm font-bold">$2,500</Text>
           </View>
        )}
      </View>

      {/* Schooling */}
      <View className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 flex-row items-center justify-between">
         <View className="flex-row items-center">
           <View className="w-10 h-10 rounded-full bg-purple-50 items-center justify-center mr-3">
             <Ionicons name="school-outline" size={20} color="#9333EA" />
           </View>
           <View>
             <Text className="text-black text-base font-bold">Schooling for children</Text>
             <Text className="text-gray-400 text-xs">Education support for dependents.</Text>
           </View>
         </View>
         <View className="items-end">
           <Switch value={schooling} onValueChange={setSchooling} trackColor={{ false: '#f3f4f6', true: '#0891b2' }} />
           <Text className={`text-xs mt-1 ${schooling ? 'text-[#0891B2]' : 'text-gray-400'}`}>{schooling ? 'Included' : 'Not needed'}</Text>
         </View>
      </View>

      {/* Health */}
      <View className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 flex-row items-center justify-between">
         <View className="flex-row items-center">
           <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-3">
             <Ionicons name="heart-outline" size={20} color="#EF4444" />
           </View>
           <View>
             <Text className="text-black text-base font-bold">Health insurance</Text>
             <Text className="text-gray-400 text-xs">International medical coverage.</Text>
           </View>
         </View>
         <View className="items-end">
           <Switch value={healthInsurance} onValueChange={setHealthInsurance} trackColor={{ false: '#f3f4f6', true: '#0891b2' }} />
           <Text className={`text-xs mt-1 ${healthInsurance ? 'text-[#0891B2]' : 'text-gray-400'}`}>{healthInsurance ? 'Included' : 'Not needed'}</Text>
         </View>
      </View>

      {/* Flights */}
      <View className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 flex-row items-center justify-between">
         <View className="flex-row items-center">
           <View className="w-10 h-10 rounded-full bg-orange-50 items-center justify-center mr-3">
             <Ionicons name="airplane-outline" size={20} color="#B45309" />
           </View>
           <View>
             <Text className="text-black text-base font-bold">Home flights</Text>
             <Text className="text-gray-400 text-xs">Annual return flights for you and family.</Text>
           </View>
         </View>
         <View className="items-end">
           <Switch value={flights} onValueChange={setFlights} trackColor={{ false: '#f3f4f6', true: '#0891b2' }} />
           <Text className={`text-xs mt-1 ${flights ? 'text-[#0891B2]' : 'text-gray-400'}`}>{flights ? 'Included' : 'Not needed'}</Text>
         </View>
      </View>

      {/* Vehicle */}
      <View className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 flex-row items-center justify-between">
         <View className="flex-row items-center">
           <View className="w-10 h-10 rounded-full bg-teal-50 items-center justify-center mr-3">
             <Ionicons name="car-outline" size={20} color="#14B8A6" />
           </View>
           <View>
             <Text className="text-black text-base font-bold">Vehicle / transport</Text>
             <Text className="text-gray-400 text-xs">Company car or transport stipend.</Text>
           </View>
         </View>
         <View className="items-end">
           <Switch value={vehicle} onValueChange={setVehicle} trackColor={{ false: '#f3f4f6', true: '#0891b2' }} />
           <Text className={`text-xs mt-1 ${vehicle ? 'text-[#0891B2]' : 'text-gray-400'}`}>{vehicle ? 'Included' : 'Not needed'}</Text>
         </View>
      </View>

      <TouchableOpacity className="mt-4 shadow-sm w-full h-14 rounded-full overflow-hidden">
        <LinearGradient 
           colors={['#0891B2', '#9333EA']} 
           start={{x: 0, y: 0}} end={{x: 1, y: 0}}
           className="w-full h-full justify-center items-center"
        >
          <Text className="text-white text-base font-bold">Save Elections</Text>
        </LinearGradient>
      </TouchableOpacity>
      
    </View>
  );
}
